import { ToneType, ScriptFormat, ScriptStyle, CaptionTone, Platform } from "../types";

async function callGeminiProxy(prompt: string, systemPrompt: string) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, systemPrompt })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    if (!data?.content) {
      throw new Error(`Empty Gemini response: ${JSON.stringify(data)}`);
    }
    return data.content;
  } catch (error: any) {
    console.error('Gemini Proxy Error:', error);
    throw error;
  }
}

export const humanizeContent = async (text: string, tone: ToneType): Promise<string> => {
  if (!text.trim()) return "";

  const systemInstruction = `
    You are an expert writer and editor specializing in "humanizing" text. 
    Your goal is to take input text (which may be AI-generated or stiff) and rewrite it to sound natural, fluid, and human.
    
    Rules:
    1. Detect the language of the input text and output in the SAME language.
    2. Remove robotic transitions (e.g., "In conclusion", "Furthermore").
    3. Vary sentence length and structure.
    4. Rewrite strictly in the requested tone: ${tone}.
    5. Do not add conversational filler.
  `;

  const prompt = `Rewrite the following text to sound like a natural human: \n\n ${text}`;

  try {
    return await callGeminiProxy(prompt, systemInstruction);
  } catch (error: any) {
    console.error("Error in humanizeContent:", error);
    throw error;
  }
};

export const generateScript = async (
  topic: string, 
  format: ScriptFormat, 
  language: string, 
  style: ScriptStyle,
  platform: Platform,
  captionTone: CaptionTone,
  targetAudience: string,
  addEmojis: boolean
): Promise<string> => {
  if (!topic.trim()) return "";

  const systemInstruction = `
    You are an advanced Script Writer and Content Creator.
    Generate content strictly based on parameters.

    OUTPUT FORMAT:
    ### A. Script Intro
    ### B. Main Script Body
    ### C. Ending CTA
    ### D. Viral Caption (Optimized for ${platform})
    ### E. Short SEO Description
    ### F. Trending Hashtags
    
    Target Audience: ${targetAudience}
    Emojis: ${addEmojis ? 'ON' : 'OFF'}
    Language: ${language}
    Tone: ${style}
  `;

  const prompt = `Generate a professional ${format} script for ${platform} about: "${topic}"`;

  try {
    return await callGeminiProxy(prompt, systemInstruction);
  } catch (error: any) {
    console.error("Error in generateScript:", error);
    throw error;
  }
};

export const generateSeoMetadata = async (topic: string, language: string): Promise<string> => {
  if (!topic.trim()) return "";

  const systemInstruction = `
    You are a YouTube SEO expert. Return a valid JSON object.
    Schema:
    {
      "titles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"],
      "description": "Full video description...",
      "hashtags": ["#tag1", ...],
      "tags": ["tag1", ...]
    }
    Rules: Language: ${language}. No markdown blocks. Raw JSON only.
  `;

  const prompt = `Generate YouTube SEO Metadata for a video about: "${topic}"`;

  try {
    return await callGeminiProxy(prompt, systemInstruction);
  } catch (error: any) {
    console.error("Error in generateSeoMetadata:", error);
    throw error;
  }
};

export const generateSocialCaptions = async (
  topic: string, 
  tone: CaptionTone, 
  category: string, 
  addEmojis: boolean,
  platform: Platform
): Promise<string> => {
  if (!topic.trim()) return "";

  const systemInstruction = `
    You are a professional social media manager. Return a valid JSON object.
    Schema:
    {
      "options": [
        {
          "type": "Primary Option",
          "content": "Viral Caption...",
          "description": "Metric focus...",
          "hashtags": ["#tag1"...],
          "seoTags": ["tag1"...]
        }
      ]
    }
    Rules: Platform: ${platform}, Tone: ${tone}, Emojis: ${addEmojis}. No markdown blocks.
  `;

  const prompt = `Generate viral captions for ${platform} about: "${topic}"`;

  try {
    return await callGeminiProxy(prompt, systemInstruction);
  } catch (error: any) {
    console.error("Error in generateSocialCaptions:", error);
    throw error;
  }
};

export const generateThumbnailConcepts = async (topic: string, aspectRatio: string = "16:9", style: string, imageBase64: string | null = null): Promise<string> => {
  if (!topic.trim()) return "";

  const systemPrompt = "You are a professional Graphic Designer and YouTube Strategist.";
  const prompt = `Describe a high-click-through-rate (CTR) YouTube thumbnail concept for a video about: "${topic}". 
  Style: ${style}. Aspect Ratio: ${aspectRatio}. 
  Provide specific layout details, color hex codes, and text overlay suggestions. 
  Note: You cannot generate the image directly, so provide instructions for a designer.`;

  try {
    const description = await callGeminiProxy(prompt, systemPrompt);
    return `[DESIGN CONCEPT ONLY]\n\n${description}`;
  } catch (error: any) {
    console.error("Error in generateThumbnailConcepts:", error);
    throw error;
  }
};
