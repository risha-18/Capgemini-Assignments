CREATE DATABASE `training`;
USE `training`;

/* 1. TABLE- countries*/
CREATE TABLE countries (
    country_id INT PRIMARY KEY,
    country_name VARCHAR(100) NOT NULL,
    region_id INT
);

-- 2. TABLE- job_history
-- creating jobs table for referencing
CREATE TABLE jobs (
    job_id VARCHAR(10) PRIMARY KEY,
    job_title VARCHAR(35) NOT NULL,
    min_salary DECIMAL(6,0),
    max_salary DECIMAL(6,0)
);

CREATE TABLE job_history (
    employee_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    job_id VARCHAR(10),
    department_id INT,
    PRIMARY KEY (employee_id, start_date),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);

-- 3. TABLE- employees
-- table departments for referencing
CREATE TABLE departments (
    department_id DECIMAL(4, 0) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    manager_id DECIMAL(6, 0) NOT NULL,
    location_id DECIMAL(4, 0),
    PRIMARY KEY (department_id, manager_id)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    hire_date DATE NOT NULL,
    job_id VARCHAR(10) NOT NULL,
    salary DECIMAL(10, 2),
    commission DECIMAL(5, 2),
    manager_id DECIMAL(6, 0),
    department_id DECIMAL(4, 0),
    CONSTRAINT fk_department_manager FOREIGN KEY (department_id, manager_id)
        REFERENCES departments(department_id, manager_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);