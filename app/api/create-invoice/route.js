import { Bot } from 'node-telegram-bot-api';

// Replace with your Telegram bot token
const botToken = '7535642128:AAFC-i7Dx414ixZFYiov7jlt0ZGhbnmdioQ';
const botApi = new Bot(botToken, { polling: false });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const invoiceLink = await botApi.createInvoiceLink(
        'Title', // Title of the item
        'Some description', // Description of the item
        '{}', // Payload
        '', // Empty for Telegram Stars payment
        'XTR', // Currency (Telegram Stars)
        [{ amount: 1, label: 'Diamond' }] // Price details (amount in smallest unit)
      );

      res.status(200).json({ invoiceLink });
    } catch (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
