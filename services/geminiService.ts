
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants.ts";

// Fixed: Initialize GoogleGenAI strictly following the guidelines (named parameter, direct env variable)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSweetRecommendation = async (userPrompt: string) => {
  try {
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
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of a sugar crash! Let me try again in a moment.";
  }
};
