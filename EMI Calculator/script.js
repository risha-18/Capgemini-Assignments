document.getElementById("emiForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve user inputs
    const salary = parseFloat(document.getElementById("salary").value);
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const loanType = document.getElementById("loanType").value;

    // Validate inputs
    if (isNaN(salary) || isNaN(loanAmount) || salary <= 0 || loanAmount <= 0 || !loanType) {
        alert("Please enter valid details for all fields.");
        return;
    }

    // Interest rates for different loan types
    const interestRates = {
        home: 7.5,
        car: 8.5,
        education: 6.5,
    };

    // Calculate interest rate and max EMI
    const annualRate = interestRates[loanType];
    const monthlyRate = annualRate / 12 / 100;
    const maxEMI = salary * 0.5;

    // Calculate loan duration
    let duration = 1; // Start with 1 year
    let emi = 0;

    while (true) {
        const months = duration * 12;
        emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);

        if (emi <= maxEMI || duration >= 30) break; // Stop if EMI is affordable or max duration reached
        duration++;
    }

    // Display results
    const resultElement = document.getElementById("results");
    resultElement.innerHTML = `
        <h2>Results</h2> <!-- Added Results heading -->
        <p><strong>Loan Type:</strong> ${loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan</p>
        <p><strong>Loan Amount:</strong> ₹${loanAmount.toLocaleString()}</p>
        <p><strong>Loan Duration:</strong> ${duration} years (${duration * 12} months)</p>
        <p><strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}</p>
    `;
    resultElement.style.display = "block";
});