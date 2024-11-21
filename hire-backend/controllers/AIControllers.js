require("dotenv").config({ path: "../.env" });
const axios = require("axios");

// Set up your Hugging Face API key and model
const API_KEY = process.env.HUGGINGFACE_KEY; // Replace with your actual API key
const MODEL = "dbmdz/bert-large-cased-finetuned-conll03-english"; // NER model

// Function to extract skills using Hugging Face's API
async function extractSkillsWithHuggingFace(text) {
  const url = `https://api-inference.huggingface.co/models/${MODEL}`;

  try {
    const response = await axios.post(
      url,
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log the response to inspect its structure
    console.log("API Response:", response.data);

    // Make sure the response structure is what we expect
    if (response.data) {
      // Extract entities and filter them to identify skills

      const skills = response.data
        .filter(
          (entity) =>
            entity.entity_group == "MISC" || entity.entity_group == "ORG"
        )
        .map((entity) => entity.word);

      console.log("Extracted Skills:", skills);
    } else {
      console.log("No entities found in the response.");
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.status : error.message
    );
  }
}

// Example job description
const jobDescription =
  "We are looking for a full-stack developer with expertise in JavaScript, React, Node.js, and AWS. Experience with MongoDB is a plus.";
extractSkillsWithHuggingFace(jobDescription);
