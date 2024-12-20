package com.demo.player;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Player extends AbstractPlayer implements PlayerOperations {
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/playerdb";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "Admin@123";  // Update with your DB password

    public Player(String name, String skill, int exp, String country, double overall_score) {
        super(name, skill, exp, country, overall_score);
    }

    // JDBC connection
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
    }

    @Override
    public void addPlayer(Player player) {
        String sql = "INSERT INTO players (name, skill, exp, country, overall_score) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, player.getName());
            stmt.setString(2, player.getSkill());
            stmt.setInt(3, player.getExp());
            stmt.setString(4, player.getCountry());
            stmt.setDouble(5, player.getOverall_score());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Player> getAllPlayers() {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players";
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Player player = new Player(
                        rs.getString("name"),
                        rs.getString("skill"),
                        rs.getInt("exp"),
                        rs.getString("country"),
                        rs.getDouble("overall_score")
                );
                player.setId(rs.getInt("id"));
                players.add(player);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    @Override
    public Player getPlayerById(int id) {
        Player player = null;
        String sql = "SELECT * FROM players WHERE id = ?";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    player = new Player(
                            rs.getString("name"),
                            rs.getString("skill"),
                            rs.getInt("exp"),
                            rs.getString("country"),
                            rs.getDouble("overall_score")
                    );
                    player.setId(rs.getInt("id"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return player;
    }

    
    
    @Override
    public List<Player> getPlayersByCountry(String country) {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players WHERE country = ?";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, country);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Player player = new Player(
                            rs.getString("name"),
                            rs.getString("skill"),
                            rs.getInt("exp"),
                            rs.getString("country"),
                            rs.getDouble("overall_score")
                    );
                    player.setId(rs.getInt("id"));
                    players.add(player);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    @Override
    public List<Player> getPlayersByExperience() {
        List<Player> players = getAllPlayers();
        players.sort((p1, p2) -> Integer.compare(p2.getExp(), p1.getExp()));  // Sort descending by experience
        return players;
    }

    @Override
    public void updatePlayer(Player player) {
        String sql = "UPDATE players SET name = ?, skill = ?, exp = ?, country = ?, overall_score = ? WHERE id = ?";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, player.getName());
            stmt.setString(2, player.getSkill());
            stmt.setInt(3, player.getExp());
            stmt.setString(4, player.getCountry());
            stmt.setDouble(5, player.getOverall_score());
            stmt.setInt(6, player.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deletePlayer(int id) {
        String sql = "DELETE FROM players WHERE id = ?";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
