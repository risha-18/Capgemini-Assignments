package com.demo.player;

public abstract class AbstractPlayer {
    private int id;
    private String name;
    private String skill;
    private int exp;
    private String country;
    private double overall_score;

    // Constructor to initialize the player
    public AbstractPlayer(String name, String skill, int exp, String country, double overall_score) {
        this.name = name;
        this.skill = skill;
        this.exp = exp;
        this.country = country;
        this.overall_score = overall_score;
    }

    // Getter methods
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSkill() {
        return skill;
    }

    public int getExp() {
        return exp;
    }

    public String getCountry() {
        return country;
    }

    public double getOverall_score() {
        return overall_score;
    }

    // Setter methods
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setOverall_score(double overall_score) {
        this.overall_score = overall_score;
    }
    
    @Override
    public String toString() {
        return "Player [ID=" + getId() + ", Name=" + getName() + ", Skill=" + getSkill() +
               ", Experience=" + getExp() + " years, Country=" + getCountry() +
               ", Overall Score=" + getOverall_score() + "]";
    }
}

