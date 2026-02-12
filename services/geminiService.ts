
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants.ts";

export const getSweetRecommendation = async (userPrompt: string) => {
  try {
    // Initialize inside the function to ensure process.env.API_KEY is available
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key is missing in the environment.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const productsContext = PRODUCTS.map(p => 
      `${p.name} (${p.category}): ${p.description}. Price: ₹${p.price}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a "Sweet Assistant" for SweetMoments, an artisanal sweet shop.
      Here are our products:
      ${productsContext}

      User wants: "${userPrompt}"

      Recommend 1-2 specific products from our list that match their need.
      Keep it warm, professional, and slightly poetic about the sweets. 
      If they ask for something we don't have, politely suggest the closest match.
      Use Markdown formatting.`,
    });

    return response.text || "I'm sorry, I couldn't find a perfect match. How about our Classic Kaju Katli?";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API Key")) {
      return "I'm currently unable to access my sweet wisdom (API Key missing). Please check the shop collection manually!";
    }
    return "I'm having a bit of a sugar crash! Let me try again in a moment.";
  }
};
