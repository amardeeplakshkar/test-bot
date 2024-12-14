import { NextResponse } from 'next/server';
import { Bot } from 'node-telegram-bot-api';

// Replace with your Telegram bot token
const botToken = "7535642128:AAFC-i7Dx414ixZFYiov7jlt0ZGhbnmdioQ";
const botApi = new Bot(botToken, { polling: false });

export async function POST(request) {
  try {
    const invoiceLink = await botApi.createInvoiceLink(
      "Title", // Title of the item
      "Some description", // Description of the item
      "{}", // Payload
      "", // Empty for Telegram Stars payment
      "XTR", // Currency (Telegram Stars)
      [{ amount: 100, label: "Diamond" }] // Price details (amount in smallest unit)
    );

    return NextResponse.json({ invoiceLink });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
