-- Create the CompanyDB schema
CREATE DATABASE IF NOT EXISTS CompanyDB;
USE CompanyDB;

-- Create Departments Table
CREATE TABLE Departments (
   DepartmentID INT AUTO_INCREMENT PRIMARY KEY,
   DepartmentName VARCHAR(50) NOT NULL UNIQUE,
   Location VARCHAR(100) NOT NULL
);

-- Create Employees Table
CREATE TABLE Employees (
   EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
   FirstName VARCHAR(50) NOT NULL,
   LastName VARCHAR(50) NOT NULL,
   DepartmentID INT NOT NULL,
   DateOfBirth DATE NOT NULL,
   Email VARCHAR(100) NOT NULL UNIQUE,
   Gender ENUM('Male', 'Female', 'Other') NOT NULL,
   HireDate DATE NOT NULL CHECK (HireDate >= '2000-01-01'),
   FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

-- Create Projects Table
CREATE TABLE Projects (
   ProjectID INT AUTO_INCREMENT PRIMARY KEY,
   ProjectName VARCHAR(100) NOT NULL UNIQUE,
   StartDate DATE NOT NULL,
   EndDate DATE,
   Budget DECIMAL(15, 2) NOT NULL CHECK (Budget > 0)
);

-- Create Assignments Table
CREATE TABLE Assignments (
   AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
   EmployeeID INT NOT NULL,
   ProjectID INT NOT NULL,
   HoursWorked DECIMAL(5, 2) NOT NULL CHECK (HoursWorked >= 0),
   FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
   FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

-- Create Salaries Table
CREATE TABLE Salaries (
   SalaryID INT AUTO_INCREMENT PRIMARY KEY,
   EmployeeID INT NOT NULL,
   BaseSalary DECIMAL(10, 2) NOT NULL CHECK (BaseSalary > 0),
   Bonus DECIMAL(10, 2) CHECK (Bonus >= 0),
   FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Insert into Departments
INSERT INTO Departments (DepartmentName, Location) VALUES
('HR', 'New York'),
('IT', 'San Francisco'),
('Finance', 'Chicago'),
('Marketing', 'Los Angeles');

-- Insert into Employees
INSERT INTO Employees (FirstName, LastName, DepartmentID, DateOfBirth, Email, Gender, HireDate) VALUES
('John', 'Doe', 1, '1985-04-12', 'john.doe@example.com', 'Male', '2010-05-10'),
('Jane', 'Smith', 2, '1990-08-23', 'jane.smith@example.com', 'Female', '2015-07-19'),
('Alice', 'Brown', 3, '1982-11-17', 'alice.brown@example.com', 'Female', '2008-02-25'),
('Bob', 'Johnson', 4, '1979-03-30', 'bob.johnson@example.com', 'Male', '2005-01-15');

-- Insert into Projects
INSERT INTO Projects (ProjectName, StartDate, EndDate, Budget) VALUES
('Website Redesign', '2023-01-01', '2023-12-31', 100000),
('Mobile App Development', '2023-03-01', '2024-02-28', 150000),
('Data Migration', '2022-06-01', '2023-06-30', 50000);

-- Insert into Assignments
INSERT INTO Assignments (EmployeeID, ProjectID, HoursWorked) VALUES
(1, 1, 120),
(2, 2, 250),
(3, 3, 180),
(4, 1, 90);

-- Insert into Salaries
INSERT INTO Salaries (EmployeeID, BaseSalary, Bonus) VALUES
(1, 60000, 5000),
(2, 80000, 7000),
(3, 75000, 6000),
(4, 90000, 10000);


-- 1. Retrieve all employees in the IT department
SELECT * FROM Employees
WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE DepartmentName = 'IT');

-- 2. Find employees hired after 2010
SELECT * FROM Employees
WHERE HireDate > '2010-01-01';

-- 3. List projects with a budget exceeding $80,000
SELECT * FROM Projects
WHERE Budget > 80000;

-- 4. Sort employees by their hire date in descending order
SELECT * FROM Employees
ORDER BY HireDate DESC;

-- 5. Show projects sorted by their budget in ascending order
SELECT * FROM Projects
ORDER BY Budget ASC;

-- 6. Count the number of employees in each department
SELECT d.DepartmentName, COUNT(e.EmployeeID) AS EmployeeCount
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;

-- 7. Display the top 3 employees with the highest base salary
SELECT * FROM Salaries
ORDER BY BaseSalary DESC
LIMIT 3;

-- 8. Retrieve employee names along with their department names
SELECT e.FirstName, e.LastName, d.DepartmentName
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 9. List all assignments, including employee and project details
SELECT a.AssignmentID, e.FirstName, e.LastName, p.ProjectName, a.HoursWorked
FROM Assignments a
JOIN Employees e ON a.EmployeeID = e.EmployeeID
JOIN Projects p ON a.ProjectID = p.ProjectID;

-- 10. Find employees working on the project with the highest budget
SELECT e.FirstName, e.LastName
FROM Employees e
JOIN Assignments a ON e.EmployeeID = a.EmployeeID
WHERE a.ProjectID = (SELECT ProjectID FROM Projects ORDER BY Budget DESC LIMIT 1);

-- 11. Calculate the age of each employee
SELECT FirstName, LastName, DateOfBirth,
TIMESTAMPDIFF(YEAR, DateOfBirth, CURDATE()) AS Age
FROM Employees;

-- 12. Calculate the total salary (base + bonus) for each employee
SELECT e.FirstName, e.LastName, s.BaseSalary, s.Bonus,
(s.BaseSalary + COALESCE(s.Bonus, 0)) AS TotalSalary
FROM Employees e
JOIN Salaries s ON e.EmployeeID = s.EmployeeID;

-- 13. Find all employees hired in 2015
SELECT * FROM Employees
WHERE YEAR(HireDate) = 2015;

-- 14. Retrieve the names of projects ending before December 2023
SELECT ProjectName
FROM Projects
WHERE EndDate < '2023-12-01';

-- 15. List employees with base salaries greater than $70,000
SELECT e.FirstName, e.LastName, s.BaseSalary
FROM Employees e
JOIN Salaries s ON e.EmployeeID = s.EmployeeID
WHERE s.BaseSalary > 70000;

-- 16. Count the number of projects handled by each employee
SELECT e.FirstName, e.LastName, COUNT(a.ProjectID) AS ProjectCount
FROM Employees e
JOIN Assignments a ON e.EmployeeID = a.EmployeeID
GROUP BY e.EmployeeID;

-- 17. List all departments located in “San Francisco”
SELECT * FROM Departments
WHERE Location = 'San Francisco';

-- 18. Display project names along with total hours worked on each
SELECT p.ProjectName, SUM(a.HoursWorked) AS TotalHours
FROM Projects p
JOIN Assignments a ON p.ProjectID = a.ProjectID
GROUP BY p.ProjectID;

-- 19. Find the highest bonus received by any employee
SELECT MAX(Bonus) AS HighestBonus
FROM Salaries;

-- 20. Identify projects that lasted for more than 12 months
SELECT ProjectName
FROM Projects
WHERE TIMESTAMPDIFF(MONTH, StartDate, EndDate) >= 12;

-- 21. Retrieve all projects starting in 2023
SELECT * FROM Projects
WHERE YEAR(StartDate) = 2023;

-- 22. Calculate the total hours worked by each employee across all projects
SELECT e.FirstName, e.LastName, SUM(a.HoursWorked) AS TotalHours
FROM Employees e
JOIN Assignments a ON e.EmployeeID = a.EmployeeID
GROUP BY e.EmployeeID;

-- 23. Find the department with the most employees
SELECT d.DepartmentName, COUNT(e.EmployeeID) AS EmployeeCount
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName
ORDER BY EmployeeCount DESC
LIMIT 1;

-- 24. List employees who were born before 1985
SELECT * FROM Employees
WHERE DateOfBirth < '1985-01-01';