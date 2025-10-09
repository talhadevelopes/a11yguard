import axios from "axios";
import { ChatRequest } from "../types";

export class ChatService {
  static async processQuestion(chatRequest: ChatRequest): Promise<string> {
    const { textContent, question, url, expertType } = chatRequest;
    
    const truncatedContent =
      textContent.length > 30000
        ? textContent.slice(0, 30000) + "..."
        : textContent;

    let prompt = "";
    
    switch (expertType) {
      case "health":
        prompt = this.getHealthExpertPrompt(question, url, truncatedContent);
        break;
      case "fact-checker":
        prompt = this.getFactCheckerPrompt(question, url, truncatedContent);
        break;
      case "tech":
        prompt = this.getTechExpertPrompt(question, url, truncatedContent);
        break;
      default:
        prompt = this.getTechExpertPrompt(question, url, truncatedContent); // Default to tech
    }

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.AI_API_KEY_CHAT || process.env.GEMINI_API_KEY,
          },
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.error("Gemini API error:", error.response?.data || error.message);
      throw new Error("Failed to process question. Try again!");
    }
  }

  private static getHealthExpertPrompt(question: string, url: string, content: string): string {
    return `
      As a HEALTH & MEDICAL EXPERT, analyze this page (${url}) and answer: "${question}"
      
      Page content: ${content}
      
      Instructions:
      - In JUST and ONLY 200 words STRCITLY
      - Provide evidence-based health information
      - Cite 2-3 reputable medical sources (PubMed, WHO, CDC, Mayo Clinic, etc.)
      - If medical advice is requested, recommend consulting healthcare professionals
      - Focus on factual, scientific health information
      - Include relevant health statistics or studies if applicable
      
      Format: Clear answer + "Sources: [list 2-3 medical references]"
    `;
  }

  private static getFactCheckerPrompt(question: string, url: string, content: string): string {
    return `
      As a PROFESSIONAL FACT CHECKER, analyze this page (${url}) and answer: "${question}"
      
      Page content: ${content}
      
      Instructions:
      - In JUST and ONLY 200 words STRICTLY
      - Provide objective fact-checking analysis
      - Reference credible sources (Reuters, AP News, Snopes, FactCheck.org, PolitiFact, government sites)
      - Verify claims using multiple independent sources
      - Identify any misleading information, context gaps, or unsubstantiated claims
      - Rate accuracy and provide evidence-based assessment
      - Cite 2-3 reliable fact-checking or news sources
      
      Format: Fact-check analysis + accuracy rating + "Sources: [list 2-3 credible references]"
    `;
  }

  private static getTechExpertPrompt(question: string, url: string, content: string): string {
    return `
      As a TECHNOLOGY EXPERT, analyze this page (${url}) and answer: "${question}"
      
      Page content: ${content}
      
      Instructions:
      - In JUST and ONLY 200 words STRCITLY
      - Provide technical insights and analysis
      - Reference tech sources (GitHub, Stack Overflow, MDN, official docs)
      - Explain technical concepts clearly
      - Include relevant tech trends, frameworks, or best practices
      - Cite 2-3 authoritative tech resources
      
      Format: Technical explanation + "Sources: [list 2-3 tech references]"
    `;
  }
}