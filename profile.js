function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Fetching values from input fields
    let name = document.getElementById("name").value || "N/A";
    let age = document.getElementById("age").value || "N/A";
    let weight = document.getElementById("weight").value || "N/A";
    let address = document.getElementById("address").value || "N/A";
    let mobile = document.getElementById("mobile").value || "N/A";
    let disease = document.getElementById("disease").innerText || "None";
    let extra = document.getElementById("extra").value || "None";

    // Load the background image
    let img = new Image();
    img.src = "pdf-bg.jpg"; // Replace with your actual image path
    img.crossOrigin = "anonymous"; // Prevent CORS issues

    img.onload = function () {
        // Add background image (full A4 size: 210x297 mm)
        doc.addImage(img, 'JPEG', 0, 0, 210, 297);

        // Set text properties
        doc.setTextColor(0, 0, 0); // Black text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        
        // Center Title
        let pageWidth = doc.internal.pageSize.getWidth();
        

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);

        // Y position for text
        let y = 60;
        const lineSpacing = 12; // Adjust line spacing

        // Function to center text
        function addCenteredText(text, y) {
            let textWidth = doc.getTextWidth(text);
            let x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        }

        // Add user details (Centered)
        addCenteredText(`Name: ${name}`, y);
        y += lineSpacing;
        addCenteredText(`Age: ${age}`, y);
        y += lineSpacing;
        addCenteredText(`Weight: ${weight} kg`, y);
        y += lineSpacing;
        addCenteredText(`Address: ${address}`, y);
        y += lineSpacing;
        addCenteredText(`Mobile No.: ${mobile}`, y);
        y += lineSpacing;
        addCenteredText(`Possible Diseases: ${disease}`, y);
        y += lineSpacing;
        addCenteredText(`Additional Info: ${extra}`, y);

        // Save the file
        doc.save(name+"s'Report.pdf");
    };

    img.onerror = function () {
        alert("Error loading background image. Please check the image path.");
    };

    // If image is already cached, trigger onload manually
    if (img.complete) {
        img.onload();
    }
}
