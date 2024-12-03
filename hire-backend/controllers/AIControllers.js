require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const { Skills } = require("../utils/InitializeModels");

// Set up your Hugging Face API key and model
const API_KEY = process.env.NVIDIA_API_KEY; // Replace with your actual API key
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: `${API_KEY}`, // Replace with your OpenAI API key
  baseURL: "https://integrate.api.nvidia.com/v1", // NVIDIA API endpoint
});

async function extractSkills(req, res, next) {
  const prompt = `
You are an AI trained to extract  skills from text. 
Only list the skills as a comma-separated string. Do not add any explanation.

Text: "${req.body.extractText}"

Skills:`;

  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-405b-instruct", // Ensure the model name matches your API
      messages: [{ role: "user", content: prompt }],
      temperature: 0.0, // Deterministic output
      top_p: 1.0, // Consider all relevant tokens
      max_tokens: 100, // Limit to expected token range
    });

    // Extract and return skills from the model's response
    const skills = completion.choices[0]?.message?.content.trim().split(",");

    req.body.skills = skills;
    console.log(skills);
    next();
  } catch (error) {
    console.error("Error extracting skills:", error);
    return null;
  }
}
const findSimilarSkills = async (req, res, next) => {
  const fetchedSkills = req.body.skills;
  const dbSkills = await Skills.findAll({
    attributes: ["skill_name", "skill_id"],
    raw: true,
  });
  console.log("The fetched skills are");
  console.log(fetchedSkills);
  console.log(dbSkills);
  const textSkills = [];
  for (s of dbSkills) {
    textSkills.push(s.skill_name);
  }
  console.log(textSkills);
  const response = await fetch("http://127.0.0.1:5000/extract_skills", {
    method: "POST",
    body: JSON.stringify({
      generated_skills: fetchedSkills,
      db_skills: textSkills,
    }),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  console.log(data.extracted_skills);
  req.body.extracted_skills = data.extracted_skills;
  next();
};

module.exports = { extractSkills, findSimilarSkills };
// Example usage
