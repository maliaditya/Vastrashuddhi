'use server';

import { suggestWhatsAppTemplate } from '@/ai/flows/suggest-whatsapp-template';
import type { SuggestWhatsAppTemplateInput, SuggestWhatsAppTemplateOutput } from '@/ai/flows/suggest-whatsapp-template';

export async function getWhatsAppTemplateSuggestion(input: SuggestWhatsAppTemplateInput): Promise<SuggestWhatsAppTemplateOutput> {
  try {
    const result = await suggestWhatsAppTemplate(input);
    return result;
  } catch (error) {
    console.error("Error getting WhatsApp template suggestion:", error);
    // Return a fallback or error-indicating object
    return {
      templateName: "error_template",
      templateParameters: {
        error: "Failed to generate suggestion."
      }
    };
  }
}
