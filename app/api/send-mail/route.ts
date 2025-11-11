import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY as string, // store securely
});

export async function POST(req: Request) {
  try {
    const { email, bookTitle, bookDocument } = await req.json();

    if (!email || !bookTitle || !bookDocument) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Compose dynamic book link
    const bookLink = `https://www.drnimbs.com/read-book?bookDocument=${encodeURIComponent(
      bookDocument
    )}`;

    // Send using your Mailgun template
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
      from: "Dr. Folarin <mail@yourdomain.com>",
      to: [email],
      subject: `Your free book: ${bookTitle}`,
      template: "book_delivery", // ← your Mailgun template name
      'h:X-Mailgun-Variables': JSON.stringify({
        book_title: bookTitle,
        book_link: bookLink,
        recipient_email: email,
      }),
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("Mailgun error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
