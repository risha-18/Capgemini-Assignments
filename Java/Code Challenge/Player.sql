CREATE DATABASE playerdb;

USE playerdb;

CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    skill VARCHAR(50),
    exp INT,
    country VARCHAR(50),
    overall_score DOUBLE
);

select * from players;

-- Create the database if not already created
CREATE DATABASE playerdb;

-- Use the database
USE playerdb;

-- Create the 'players' table
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    skill VARCHAR(50) NOT NULL,
    exp INT NOT NULL,
    country VARCHAR(50) NOT NULL,
    overall_score DOUBLE NOT NULL
);

-- Insert sample player data
INSERT INTO players (name, skill, exp, country, overall_score) VALUES
('John Doe', 'Batsman', 5, 'India', 85.5),
('Mike Smith', 'Bowler', 3, 'Australia', 78.0),
('Chris Evans', 'All-rounder', 7, 'USA', 90.0),
('David Warner', 'Batsman', 10, 'Australia', 92.0),
('Virat Kohli', 'Batsman', 12, 'India', 95.0),
('Ben Stokes', 'All-rounder', 8, 'England', 88.0),
('Joe Root', 'Batsman', 6, 'England', 80.5),
('Rashid Khan', 'Bowler', 4, 'Afghanistan', 82.0);
