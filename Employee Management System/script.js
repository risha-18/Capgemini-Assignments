class Employee {
    constructor(name, id, skill, doj, department, image) {
        this.name = name;
        this.id = id;
        this.skill = skill;
        this.doj = new Date(doj);
        this.department = department;
        this.image = image;
    }
}

const employees = [];

// Add Employee
function addEmployee() {
    const name = document.getElementById('name').value;
    const id = parseInt(document.getElementById('id').value);
    const skill = document.getElementById('skill').value;
    const doj = document.getElementById('doj').value;
    const department = document.getElementById('department').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

    if (!name || !id || !skill || !doj || !department) {
        alert('Please fill out all fields.');
        return;
    }

    const newEmployee = new Employee(name, id, skill, doj, department, image);
    employees.push(newEmployee);
    updateEmployeeTable();
    alert('Employee added successfully!');
    clearInputs();
}

// Remove Employee
function removeEmployee() {
    const id = parseInt(document.getElementById('removeId').value);
    const index = employees.findIndex(employee => employee.id === id);

    if (index !== -1) {
        employees.splice(index, 1);
        updateEmployeeTable();
        alert('Employee removed successfully!');
    } else {
        alert('Employee not found.');
    }
    clearInputs();
}

// Search Employee
function searchEmployee() {
    const id = parseInt(document.getElementById('searchId').value);
    const employee = employees.find(employee => employee.id === id);

    if (employee) {
        const experience = calculateExperience(employee.doj);
        displayOutput(
            `Name: ${employee.name}<br>ID: ${employee.id}<br>Skill: ${employee.skill}<br>
            Department: ${employee.department}<br>Experience: ${experience} years<br>
            <img src="${employee.image}" alt="${employee.name}'s image">`
        );
    } else {
        displayOutput('Employee not found.');
    }
    clearInputs();
}

// Calculate Experience
function calculateExperience(doj) {
    const currentDate = new Date();
    return currentDate.getFullYear() - doj.getFullYear();
}

// Display Output
function displayOutput(content) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = content;
}

// Update Employee Table
function updateEmployeeTable() {
    const tableBody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Clear the table

    employees.forEach((employee, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.skill}</td>
            <td>${employee.department}</td>
            <td>${calculateExperience(employee.doj)} years</td>
            <td><img src="${employee.image}" alt="${employee.name}'s image"></td>
        `;
    });
}

// Clear Input Fields
function clearInputs() {
    document.querySelectorAll('input').forEach(input => (input.value = ''));
}