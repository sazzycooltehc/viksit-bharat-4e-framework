
import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  
  constructor() {
    // IMPORTANT: The API key is sourced from environment variables.
    // Ensure `process.env.API_KEY` is available in your deployment environment.
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.error('API key for GoogleGenAI is not set. Please set the API_KEY environment variable.');
    }
  }

  async generatePolicyIdea(topic: string, details: string): Promise<string> {
    if (!this.ai) {
      return Promise.reject(new Error('Gemini AI client not initialized. Check API key.'));
    }

    const prompt = `
      You are an expert policy advisor for the "Viksit Bharat 2047" initiative. 
      Your task is to generate a single, innovative, and actionable policy idea.

      The policy should be related to the pillar: "${topic}".
      Key details about this pillar: "${details}".

      Generate a creative policy idea with a catchy name and a one-sentence description.
      Format your response as: **Policy Name:** Description.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.8,
          maxOutputTokens: 100,
        },
      });
      return response.text.trim();
    } catch (error) {
      console.error('Error generating content:', error);
      return 'An error occurred while generating the policy idea. Please try again.';
    }
  }
}
