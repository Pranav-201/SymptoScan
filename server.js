require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/check-disease', async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required." });
    }

    // Optimized prompt to return only disease names (max 7)
    const prompt = `A patient has the following symptoms: ${symptoms}. 
                    List only the possible diseases, one per line, without explanations, special characters, or numbering.
                    Provide a maximum of 7 diseases.`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }]
        });

        // Extracting the response correctly
        const text = result.response.candidates[0].content.parts[0].text;

        // Process the response: remove unwanted characters and limit to first 7 diseases
        const diseases = text
            .split("\n")  // Split by new line
            .map(d => d.replace(/[*\-•\d.]/g, '').trim()) // Remove *, -, •, and numbers
            .filter(d => d) // Remove empty values
            .slice(0, 7); // Limit to 7 diseases

        res.json({ diseases });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
