class Employee {
    constructor(name, id, skill, doj, department) {
        this.name = name;
        this.id = id;
        this.skill = skill;
        this.doj = new Date(doj);
        this.department = department;
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

    if (!name || !id || !skill || !doj || !department) {
        alert('Please fill out all fields.');
        return;
    }

    const newEmployee = new Employee(name, id, skill, doj, department);
    employees.push(newEmployee);
    alert('Employee added successfully!');
    clearInputs();
}

// Remove Employee
function removeEmployee() {
    const id = parseInt(document.getElementById('removeId').value);
    const index = employees.findIndex(employee => employee.id === id);

    if (index !== -1) {
        employees.splice(index, 1);
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
            Department: ${employee.department}<br>Experience: ${experience} years`
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

// Clear Input Fields
function clearInputs() {
    document.querySelectorAll('input').forEach(input => (input.value = ''));
}