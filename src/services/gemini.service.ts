import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!environment.apiKey) {
      throw new Error('Gemini API key is missing. Set apiKey in environment files.');
    }

    this.ai = new GoogleGenAI({ apiKey: environment.apiKey });
  }

  async generatePolicyIdea(topic: string, details: string): Promise<string> {
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

      return response.text?.trim() ?? 'No response generated.';
    } catch (error) {
      console.error('Error generating content:', error);
      return 'An error occurred while generating the policy idea. Please try again.';
    }
  }
}
