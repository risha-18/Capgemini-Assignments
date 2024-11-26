-- Create the BankDB schema
CREATE DATABASE IF NOT EXISTS BankDB;
USE BankDB;

-- Create Customers Table
CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(15) NOT NULL,
    Address VARCHAR(255) NOT NULL
);

-- Create Accounts Table
CREATE TABLE Accounts (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT NOT NULL,
    AccountType ENUM('Savings', 'Checking') NOT NULL,
    Balance DECIMAL(15, 2) NOT NULL CHECK (Balance >= 0),
    CreatedDate DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Create Transactions Table
CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    AccountID INT NOT NULL,
    TransactionType ENUM('Deposit', 'Withdrawal') NOT NULL,
    Amount DECIMAL(15, 2) NOT NULL CHECK (Amount >= 0),
    TransactionDate DATETIME NOT NULL,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

-- Create Branches Table
CREATE TABLE Branches (
    BranchID INT AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(100) NOT NULL,
    Location VARCHAR(100) NOT NULL
);

-- Create Employees Table
CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    BranchID INT NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Salary DECIMAL(10, 2) NOT NULL CHECK (Salary > 0),
    FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
);

-- Insert into Customers
INSERT INTO Customers (FirstName, LastName, Email, Phone, Address) VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', '123 Elm St'),
('Jane', 'Smith', 'jane.smith@example.com', '9876543210', '456 Oak St'),
('Michael', 'Brown', 'michael.brown@example.com', '5678901234', '789 Pine St');

-- Insert into Accounts
INSERT INTO Accounts (CustomerID, AccountType, Balance, CreatedDate) VALUES
(1, 'Savings', 5000.00, '2023-01-15'),
(1, 'Checking', 2000.00, '2023-02-10'),
(2, 'Savings', 10000.00, '2023-03-05'),
(3, 'Savings', 7000.00, '2023-04-20');

-- Insert into Transactions
INSERT INTO Transactions (AccountID, TransactionType, Amount, TransactionDate) VALUES
(1, 'Deposit', 1000.00, '2023-01-20 10:00:00'),
(1, 'Withdrawal', 500.00, '2023-01-25 14:30:00'),
(2, 'Deposit', 2000.00, '2023-02-15 09:15:00'),
(3, 'Withdrawal', 1000.00, '2023-04-25 16:45:00');

-- 1. List all customers and their accounts with balances
SELECT c.FirstName, c.LastName, a.AccountType, a.Balance
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID;

-- 2. List all employees who manage branches where the total account balances exceed $20,000
SELECT e.FirstName, e.LastName, e.Role, b.BranchName
FROM Employees e
JOIN Branches b ON e.BranchID = b.BranchID
JOIN Accounts a ON a.CustomerID IN (
    SELECT c.CustomerID
    FROM Customers c
    JOIN Accounts a2 ON c.CustomerID = a2.CustomerID
    WHERE a2.AccountID = a.AccountID
)
GROUP BY e.EmployeeID
HAVING SUM(a.Balance) > 20000;

-- 3. Identify accounts whose balance is higher than the average balance of accounts within their branch
SELECT a.AccountID, a.CustomerID, a.AccountType, a.Balance
FROM Accounts a
WHERE a.Balance > (
    SELECT AVG(a2.Balance)
    FROM Accounts a2
    WHERE a2.AccountType = a.AccountType
);

-- 4. Find customers who have at least one transaction of more than $1,000
SELECT DISTINCT c.CustomerID, c.FirstName, c.LastName
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID
JOIN Transactions t ON a.AccountID = t.AccountID
WHERE t.Amount > 1000;

-- 5. Get the total deposits and total withdrawals for each account, along with the account type
SELECT a.AccountID, a.AccountType,
       SUM(CASE WHEN t.TransactionType = 'Deposit' THEN t.Amount ELSE 0 END) AS TotalDeposits,
       SUM(CASE WHEN t.TransactionType = 'Withdrawal' THEN t.Amount ELSE 0 END) AS TotalWithdrawals
FROM Accounts a
LEFT JOIN Transactions t ON a.AccountID = t.AccountID
GROUP BY a.AccountID, a.AccountType;

-- 6. Find pairs of customers who have accounts with the same account type and belong to the same branch
SELECT c1.CustomerID AS Customer1ID, c2.CustomerID AS Customer2ID, a1.AccountType
FROM Accounts a1
JOIN Accounts a2 ON a1.AccountType = a2.AccountType AND a1.CustomerID < a2.CustomerID
JOIN Customers c1 ON a1.CustomerID = c1.CustomerID
JOIN Customers c2 ON a2.CustomerID = c2.CustomerID;

-- 7. Find customers who do not have any transactions recorded
SELECT c.CustomerID, c.FirstName, c.LastName
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID
LEFT JOIN Transactions t ON a.AccountID = t.AccountID
WHERE t.TransactionID IS NULL;
 
 -- 8. Rank customers based on their total balance across all accounts
 SELECT c.FirstName, c.LastName, SUM(a.Balance) AS TotalBalance,
       RANK() OVER (ORDER BY SUM(a.Balance) DESC) AS CustomerRank
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;

-- 9. List employees whose salary is above the average salary of all employees in their branch
SELECT e.EmployeeID, e.FirstName, e.LastName, e.Salary, e.BranchID
FROM Employees e
WHERE e.Salary > (
    SELECT AVG(e2.Salary)
    FROM Employees e2
    WHERE e2.BranchID = e.BranchID
);
