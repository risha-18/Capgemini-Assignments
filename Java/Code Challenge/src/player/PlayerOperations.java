package com.demo.player;

import java.util.List;

public interface PlayerOperations {
    void addPlayer(Player player);
    List<Player> getAllPlayers();
    Player getPlayerById(int id);
    List<Player> getPlayersByCountry(String country);
    List<Player> getPlayersByExperience();
    void updatePlayer(Player player);
    void deletePlayer(int id);
}
