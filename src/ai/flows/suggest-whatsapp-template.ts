'use server';

/**
 * @fileOverview Suggests an appropriate WhatsApp message template based on the current order status.
 *
 * - suggestWhatsAppTemplate - A function that suggests a WhatsApp message template.
 * - SuggestWhatsAppTemplateInput - The input type for the suggestWhatsAppTemplate function.
 * - SuggestWhatsAppTemplateOutput - The return type for the suggestWhatsAppTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWhatsAppTemplateInputSchema = z.object({
  orderStatus: z
    .enum([
      'New Request',
      'Pickup Assigned',
      'Picked Up',
      'In Laundry',
      'Laundry Completed',
      'In Ironing',
      'Ready for Delivery',
      'Delivered',
    ])
    .describe('The current status of the order.'),
  orderId: z.string().describe('The unique identifier for the order.'),
  customerPhoneNumber: z
    .string()
    .describe('The customer phone number to send the message.'),
});
export type SuggestWhatsAppTemplateInput = z.infer<
  typeof SuggestWhatsAppTemplateInputSchema
>;

const SuggestWhatsAppTemplateOutputSchema = z.object({
  templateName: z
    .string()
    .describe(
      'The name of the suggested WhatsApp message template to use, which must be an approved template in WhatsApp Cloud API.'
    ),
  templateParameters: z
    .record(z.string())
    .describe(
      'A map of parameter names to values, to be used to populate the WhatsApp message template.'
    )
    .optional(),
});
export type SuggestWhatsAppTemplateOutput = z.infer<
  typeof SuggestWhatsAppTemplateOutputSchema
>;

export async function suggestWhatsAppTemplate(
  input: SuggestWhatsAppTemplateInput
): Promise<SuggestWhatsAppTemplateOutput> {
  return suggestWhatsAppTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWhatsAppTemplatePrompt',
  input: {schema: SuggestWhatsAppTemplateInputSchema},
  output: {schema: SuggestWhatsAppTemplateOutputSchema},
  prompt: `You are a helpful assistant designed to suggest the best WhatsApp message template to send to a customer based on the current order status.

  Given the current order status: {{{orderStatus}}} and order ID: {{{orderId}}}, and customer phone number {{{customerPhoneNumber}}}, suggest the most appropriate WhatsApp message template name from the approved templates in WhatsApp Cloud API. The template name must exactly match a template in WhatsApp Cloud API.

  Also, if applicable, identify the required template parameters and provide example values based on the order status and order ID. The 'templateParameters' field is optional, only populate if necessary.

  Ensure the suggested template aligns with the order status and provides relevant information to the customer.

  Here are some guiding principles:
  - "New Request": Inform the customer that their order request has been received and provide the order ID.
  - "Pickup Assigned": Notify the customer that a pickup has been assigned and provide the pickup details (e.g., date, time, pickup staff).
  - "Picked Up": Confirm with the customer that their order has been picked up.
  - "In Laundry": Inform the customer that their order is currently being laundered.
  - "Laundry Completed": Notify the customer that the laundry process is complete.
  - "In Ironing": Inform the customer that their order is currently being ironed.
  - "Ready for Delivery": Inform the customer that their order is ready for delivery and provide delivery details.
  - "Delivered": Confirm with the customer that their order has been delivered.

Output the template name and the template parameters, with example values.

Considerations:
* 'templateParameters' should be omitted when it is not needed
* The outputted template name MUST be an existing approved template name in WhatsApp Cloud API. Do not make up the name, and do not provide a description in the template name.

Example 1:
input: {orderStatus: 'New Request', orderId: '12345'}
output: {templateName: 'order_received', templateParameters: {orderId: '12345'}}

Example 2:
input: {orderStatus: 'Picked Up', orderId: '12345'}
output: {templateName: 'order_picked_up'}
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const suggestWhatsAppTemplateFlow = ai.defineFlow(
  {
    name: 'suggestWhatsAppTemplateFlow',
    inputSchema: SuggestWhatsAppTemplateInputSchema,
    outputSchema: SuggestWhatsAppTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
