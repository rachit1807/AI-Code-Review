console.log("✅ Loaded ai.service.js");

const axios = require("axios");

const SYSTEM_PROMPT = `
You are an expert Senior Software Engineer and Code Reviewer.

Your job is to review ONLY the submitted code.

IMPORTANT:

- Every code submission MUST receive different scores.
- Never reuse previous scores.
- Evaluate the code objectively.
- Good code should score high.
- Poor code should score low.
- Dangerous code should score very low.

Scoring Guide:

Overall (0-100)

Readability (0-10)

Performance (0-10)

Security (0-10)

Maintainability (0-10)

Best Practices (0-10)

Examples:

Very bad code:
Overall: 25-45

Average code:
Overall: 55-75

Good code:
Overall: 80-90

Excellent production-quality code:
Overall: 91-100

Return EXACTLY in this format:

SCORES_START
Overall: <number>
Readability: <number>
Performance: <number>
Security: <number>
Maintainability: <number>
Best Practices: <number>
SCORES_END

Then write the review.

# ✅ Strengths

- Mention strengths.

# ❌ Issues

For every issue include severity.

🔴 Critical

🟠 High

🟡 Medium

🟢 Low

# 💡 Suggestions

Provide actionable improvements.

# ✅ Improved Code

Return ONLY the improved code inside a markdown code block.

Never invent fake issues.

If there are no issues, say so.

Do NOT always return the same score.

The scores MUST depend entirely on the submitted code.
`;

const MODELS = process.env.OLLAMA_MODEL
  ? [process.env.OLLAMA_MODEL]
  : ["qwen2.5-coder:7b", "qwen2.5-coder:3b", "llama3.2:latest"];

const ollamaBaseUrl = (process.env.OLLAMA_BASE_URL || "http://localhost:11434").replace(/\/$/, "");

async function generateContent(code) {
  for (const model of MODELS) {
    try {
      console.log(`Using model: ${model}`);

      const response = await axios.post(
        `${ollamaBaseUrl}/api/generate`,
        {
          model,
          stream: false,
          prompt: `${SYSTEM_PROMPT}

Review this code:

\`\`\`
${code}
\`\`\`
`,
          options: {
            temperature: 0.35,
            top_p: 0.9,
            top_k: 40,
            repeat_penalty: 1.15,
            num_predict: 700,
            num_ctx: 8192,
          },
        },
        {
          timeout: Number(process.env.OLLAMA_TIMEOUT_MS) || 120000,
          headers: process.env.OLLAMA_API_KEY
            ? { Authorization: `Bearer ${process.env.OLLAMA_API_KEY}` }
            : undefined,
        }
      );

      return response.data.response;
    } catch (err) {
      console.log(`${model} failed`);

      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  }

  throw new Error("No available Ollama model.");
}

module.exports = generateContent;
