import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Proxy Route
  app.post("/api/gemini", async (req, res) => {
    const { prompt, systemPrompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (!apiKey) {
      console.error("Gemini request blocked: missing API key");
      return res.status(500).json({ error: "GEMINI_API_KEY not configured on server. Add it to .env.local and restart the server." });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      res.json({ content: response.text });
    } catch (error: any) {
      const parseErrorMessage = (value: any) => {
        if (!value) return "Failed to communicate with Gemini API";
        if (typeof value === "string") {
          try {
            const parsed = JSON.parse(value);
            return parsed?.error?.message || value;
          } catch {
            return value;
          }
        }
        return value?.message || JSON.stringify(value);
      };

      const message = parseErrorMessage(error?.message);
      console.error("Server-side Gemini error:", {
        name: error?.name,
        message: error?.message,
        parsedMessage: message,
        status: error?.status ?? error?.statusCode,
        details: error?.errors ?? error?.response,
      });
      res.status(error?.status ?? 500).json({ error: message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
