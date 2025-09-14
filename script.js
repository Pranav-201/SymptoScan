async function checkDisease() {
    const symptomInput = document.getElementById('symptomInput').value.trim();
    const resultElement = document.getElementById('diseaseName');

    if (!symptomInput) {
        alert("Please enter symptoms.");
        return;
    }

    // Clear previous results
    resultElement.innerHTML = "Loading...";

    try {
        const response = await fetch('http://localhost:3000/check-disease', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: symptomInput })
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data.diseases);
        } else {
            throw new Error(data.error || "An error occurred while processing your request.");
        }
    } catch (error) {
        console.error("Error:", error);
        displayResults(["An error occurred while processing your request."]);
    }
}

function displayResults(diseases) {
    const resultElement = document.getElementById('diseaseName');
    
    if (!diseases.length) {
        resultElement.innerHTML = "No diseases found.";
        return;
    }

    // Display results as a bullet list
    resultElement.innerHTML = "<ul>" + diseases.map(d => `<li>${d}</li>`).join('') + "</ul>";
}
