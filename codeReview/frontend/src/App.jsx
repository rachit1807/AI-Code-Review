import { useState, useEffect } from "react";
import axios from "axios";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";

import "./App.css";
import "./prism-override.css";

import Editor from "react-simple-code-editor";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useTheme } from "./context/ThemeContext";

import jsPDF from "jspdf";

function App() {
  const { dark, toggleTheme } = useTheme();

  // ==========================
  // States
  // ==========================

  const [code, setCode] = useState(`function hello() {
  console.log("Hello World");
}`);

  const [language, setLanguage] = useState("javascript");

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);

  const [scores, setScores] = useState({
    overall: 0,
    readability: 0,
    performance: 0,
    security: 0,
    maintainability: 0,
    bestPractices: 0,
  });

  // ==========================
  // Upload Code File
  // ==========================

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;

      setCode(content);

      const extension = file.name.split(".").pop().toLowerCase();

      switch (extension) {
        case "js":
          setLanguage("javascript");
          break;

        case "ts":
          setLanguage("typescript");
          break;

        case "py":
          setLanguage("python");
          break;

        case "java":
          setLanguage("java");
          break;

        case "cpp":
        case "cc":
        case "c":
          setLanguage("cpp");
          break;

        default:
          setLanguage("javascript");
      }
    };

    reader.readAsText(file);
  }
    // ==========================
  // AI Review
  // ==========================

  async function reviewCode() {
    if (!code.trim()) {
      alert("Please enter or upload some code.");
      return;
    }

    try {
      setLoading(true);
      setReview("");

      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        {
          code,
        }
      );

      const text = response.data;

      console.log("========== AI RESPONSE ==========");
      console.log(text);
      console.log("================================");

      let values = {};
      let reviewText = text;

      const scoreRegex =
        /SCORES_START([\s\S]*?)SCORES_END/;

      const scoreMatch = text.match(scoreRegex);

      if (scoreMatch) {
        scoreMatch[1]
          .trim()
          .split("\n")
          .forEach((line) => {
            const [key, value] = line.split(":");

            if (key && value) {
              values[key.trim()] = Number(value.trim());
            }
          });

        reviewText = text.replace(scoreRegex, "").trim();
      } else {
        const jsonMatch = text.match(/\{[\s\S]*?\}/);

        if (jsonMatch) {
          try {
            values = JSON.parse(jsonMatch[0]);

            reviewText = text
              .replace(jsonMatch[0], "")
              .trim();
          } catch {
            console.log("Score JSON not valid");
          }
        }
      }

      setScores({
        overall: values["Overall"] || 0,
        readability: values["Readability"] || 0,
        performance: values["Performance"] || 0,
        security: values["Security"] || 0,
        maintainability: values["Maintainability"] || 0,
        bestPractices: values["Best Practices"] || 0,
      });

      setReview(reviewText);
    } catch (error) {
      console.error(error);

      setReview(
        "❌ Unable to review code.\n\nPlease make sure backend and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  }
    // ==========================
  // Download PDF Report
  // ==========================

  function downloadReport() {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("AI Code Review Report", 20, 20);

    pdf.setFontSize(12);

    pdf.text(`Overall: ${scores.overall}/10`, 20, 40);
    pdf.text(`Readability: ${scores.readability}/10`, 20, 50);
    pdf.text(`Performance: ${scores.performance}/10`, 20, 60);
    pdf.text(`Security: ${scores.security}/10`, 20, 70);
    pdf.text(`Maintainability: ${scores.maintainability}/10`, 20, 80);
    pdf.text(`Best Practices: ${scores.bestPractices}/10`, 20, 90);

    const reviewLines = pdf.splitTextToSize(review || "No Review", 170);

    pdf.text(reviewLines, 20, 110);

    pdf.save("AI-Code-Review.pdf");
  }

  // ==========================
  // Highlight Code
  // ==========================

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  return (
  <main
    className={`h-screen flex transition-colors duration-500 ${
      dark ? "bg-zinc-950 text-white" : "bg-white text-black"
    }`}
  >
    {/* Left Panel */}

    <div
      className={`relative h-full w-1/2 transition-colors duration-500 ${
        dark ? "bg-zinc-800" : "bg-gray-200"
      }`}
    >
      <div
        className={`h-full transition-colors duration-500 ${
          dark ? "bg-zinc-900" : "bg-white"
        }`}
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            Prism.highlight(
              code,
              Prism.languages.javascript,
              "javascript"
            )
          }
          padding={15}
          className="h-full outline-none"
          placeholder="Paste your code here..."
          style={{
            fontFamily:
              'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: 16,
            backgroundColor: dark ? "#18181b" : "#ffffff",
            color: dark ? "#f8fafc" : "#111827",
            lineHeight: 1.6,
            minHeight: "100%",
          }}
        />
      </div>

      <input
        id="fileUpload"
        type="file"
        accept=".js,.ts,.py,.java,.cpp,.c"
        onChange={handleFileUpload}
        className="hidden"
      />

      <button
        onClick={() =>
          document.getElementById("fileUpload").click()
        }
        className="absolute left-5 bottom-5 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
      >
        📂 Upload Code
      </button>

      <button
        onClick={reviewCode}
        disabled={loading}
        className="absolute right-5 bottom-5 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-semibold transition"
      >
        {loading ? "Reviewing..." : "Review"}
      </button>
    </div>
          {/* Right Panel */}

      <div
        className={`w-1/2 overflow-auto transition-colors duration-500 ${
          dark
            ? "bg-zinc-950 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {/* Header */}

        <div className="flex justify-between items-center p-5 border-b border-zinc-700">
          <h1 className="text-3xl font-bold">
            🤖 AI Code Review
          </h1>

          <div className="flex gap-3">
            {review && (
              <button
                onClick={downloadReport}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
              >
                📄 Download PDF
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">
                Reviewing your code...
              </h2>

              <div className="animate-pulse space-y-4">
                <p>🔍 Analyzing code...</p>
                <p>🔒 Checking security...</p>
                <p>⚡ Checking performance...</p>
                <p>🧹 Checking best practices...</p>
                <p>📝 Generating improved code...</p>
              </div>
            </div>
          ) : review ? (
            <>
              {/* Dashboard */}

              <div
                className={`rounded-xl p-5 mb-6 transition-colors duration-500 ${
                  dark
                    ? "bg-zinc-800"
                    : "bg-white shadow-lg"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">
                  📊 Code Quality Dashboard
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`rounded-lg p-4 ${
                      dark
                        ? "bg-zinc-700"
                        : "bg-gray-200 border"
                    }`}
                  >
                    <p className="text-gray-400">
                      Overall Score
                    </p>

                    <h2 className="text-4xl font-bold text-green-500">
                      {scores.overall}/100
                    </h2>
                  </div>

                  {[
                    ["📖 Readability", scores.readability],
                    ["⚡ Performance", scores.performance],
                    ["🔒 Security", scores.security],
                    ["🛠 Maintainability", scores.maintainability],
                    ["✅ Best Practices", scores.bestPractices],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className={`rounded-lg p-4 ${
                        dark
                          ? "bg-zinc-700"
                          : "bg-gray-200 border"
                      }`}
                    >
                      <p>{title}</p>

                      <h3 className="text-2xl font-bold">
                        {value}/10
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review */}

              <div
                className={`markdown prose max-w-none ${
                  dark
                    ? "prose-invert text-white"
                    : "text-gray-900"
                }`}
              >
                <Markdown remarkPlugins={[remarkGfm]}>
                  {review}
                </Markdown>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[80vh]">
              <h2 className="text-gray-500 text-xl">
                👈 Paste or Upload your code and click{" "}
                <strong>Review</strong>
              </h2>
            </div>
          )}
        </div>
      </div>
          </main>
  );
}

export default App;