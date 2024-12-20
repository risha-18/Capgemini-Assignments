package com.demo.player;

import java.util.List;
import java.util.Scanner;

public class PlayerApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Player playerOperations = new Player("", "", 0, "", 0.0);  // Use concrete class for operations
        int choice;

        do {
            System.out.println("\nPlayer Management System");
            System.out.println("1. Add Player");
            System.out.println("2. View All Players");
            System.out.println("3. Update Player");
            System.out.println("4. Delete Player");
            System.out.println("5. List Players by Country");
            System.out.println("6. List Players by Experience");
            System.out.println("7. Sort Players");
            System.out.println("8. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline character

            switch (choice) {
                case 1:
                    // Add Player
                    System.out.print("Enter player name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter player skill: ");
                    String skill = scanner.nextLine();
                    System.out.print("Enter experience: ");
                    int exp = scanner.nextInt();
                    scanner.nextLine();  // Consume newline
                    System.out.print("Enter country: ");
                    String country = scanner.nextLine();
                    System.out.print("Enter overall score: ");
                    double score = scanner.nextDouble();
                    scanner.nextLine();  // Consume newline

                    Player newPlayer = new Player(name, skill, exp, country, score);
                    playerOperations.addPlayer(newPlayer);
                    System.out.println("Player added successfully!");
                    break;

                case 2:
                    // View All Players
                    System.out.println("\nAll Players:");
                    List<Player> players = playerOperations.getAllPlayers();
                    if (players.isEmpty()) {
                        System.out.println("No players found.");
                    } else {
                        for (Player player : players) {
                            System.out.println(player);
                        }
                    }
                    break;

                case 3:
                    // Update Player
                    System.out.print("Enter player ID to update: ");
                    int updateId = scanner.nextInt();
                    scanner.nextLine();  // Consume newline character

                    Player playerToUpdate = playerOperations.getPlayerById(updateId);
                    if (playerToUpdate != null) {
                        System.out.print("Enter new skill (or press Enter to keep current): ");
                        String newSkill = scanner.nextLine();
                        if (!newSkill.isEmpty()) playerToUpdate.setSkill(newSkill);

                        System.out.print("Enter new experience (or press Enter to keep current): ");
                        String expInput = scanner.nextLine();
                        if (!expInput.isEmpty()) playerToUpdate.setExp(Integer.parseInt(expInput));

                        System.out.print("Enter new country (or press Enter to keep current): ");
                        String newCountry = scanner.nextLine();
                        if (!newCountry.isEmpty()) playerToUpdate.setCountry(newCountry);

                        System.out.print("Enter new score (or press Enter to keep current): ");
                        String scoreInput = scanner.nextLine();
                        if (!scoreInput.isEmpty()) playerToUpdate.setOverall_score(Double.parseDouble(scoreInput));

                        playerOperations.updatePlayer(playerToUpdate);
                        System.out.println("Player updated successfully!");
                    } else {
                        System.out.println("Player with ID " + updateId + " not found.");
                    }
                    break;

                case 4:
                    // Delete Player
                    System.out.print("Enter player ID to delete: ");
                    int deleteId = scanner.nextInt();
                    scanner.nextLine();  // Consume newline character

                    playerOperations.deletePlayer(deleteId);
                    System.out.println("Player deleted successfully!");
                    break;

                case 5:
                    // List Players by Country
                    System.out.print("Enter country: ");
                    String countryFilter = scanner.nextLine();
                    List<Player> playersByCountry = playerOperations.getPlayersByCountry(countryFilter);
                    if (playersByCountry.isEmpty()) {
                        System.out.println("No players found from " + countryFilter);
                    } else {
                        for (Player player : playersByCountry) {
                            System.out.println(player);
                        }
                    }
                    break;

                case 6:
                    // List Players by Experience
                    System.out.println("\nPlayers sorted by experience:");
                    List<Player> playersByExperience = playerOperations.getPlayersByExperience();
                    for (Player player : playersByExperience) {
                        System.out.println(player);
                    }
                    break;

                case 7:
                    // Sort Players by Skill or Experience
                    System.out.println("\nSort Players By:");
                    System.out.println("1. Skill");
                    System.out.println("2. Experience");
                    System.out.print("Enter your choice: ");
                    int sortChoice = scanner.nextInt();
                    scanner.nextLine();  // Consume newline character

                    switch (sortChoice) {
                        case 1:
                            // Sort by Skill
                            System.out.println("\nPlayers sorted by Skill:");
                            List<Player> sortedBySkill = playerOperations.getAllPlayers();
                            sortedBySkill.sort((p1, p2) -> p1.getSkill().compareTo(p2.getSkill()));  // Sorting alphabetically by skill
                            for (Player player : sortedBySkill) {
                                System.out.println(player);
                            }
                            break;

                        case 2:
                            // Sort by Experience
                            System.out.println("\nPlayers sorted by Experience:");
                            List<Player> sortedByExperience = playerOperations.getPlayersByExperience();
                            for (Player player : sortedByExperience) {
                                System.out.println(player);
                            }
                            break;

                        default:
                            System.out.println("Invalid choice. Returning to main menu.");
                            break;
                    }
                    break;

                case 8:
                    System.out.println("Exiting...");
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 8);

        scanner.close();
    }
}

