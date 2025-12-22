import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the AI
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 2025 FIX: Use the 'lite' model which is the current free-tier standard
    // If this fails, try 'gemini-3-flash-preview'
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const SYSTEM_PROMPT = `
You are "WonderAI", the magical assistant for WonderLand toy store. 

STRICT RESPONSE RULES:
1. MAXIMUM 3 SENTENCES per response.
2. Use BULLET POINTS if listing more than one item.
3. Use EMOJIS to keep it magical, but don't overdo it.
4. NEVER write long paragraphs. 
5. ONLY talk about toys and WonderLand store info.
6. If the user asks something non-toy related, give a 1-sentence refusal.

Example of a good response:
"We have amazing building kits! 🏰 
• LEGO sets for creators
• Magnetic tiles for toddlers
Which one sounds most magical?"
`;

    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nWonderAI:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    // Friendly error for the UI
    return NextResponse.json(
      {
        text:
          "The toy box is stuck! (Error: " +
          (error.status === 404 ? "Model update needed" : "Connection issue") +
          ")",
      },
      { status: 500 }
    );
  }
}
