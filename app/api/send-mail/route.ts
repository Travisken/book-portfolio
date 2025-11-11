import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, bookTitle, bookDocument } = await req.json();

    if (!email || !bookTitle || !bookDocument) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create book link
    const bookLink = `https://www.drnimbs.com/read-book?bookDocument=${encodeURIComponent(
      bookDocument
    )}`;

    // Create the transporter
    const transporter = nodemailer.createTransport({
      host: "in-v3.mailjet.com",
      port: 587,
      secure: false, // use TLS
      auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET,
      },
    });


    // Compose message
    const info = await transporter.sendMail({
      from: `"${process.env.MAILJET_SENDER_NAME}" <${process.env.MAILJET_SENDER_EMAIL}>`,
      to: email,
      subject: `Your copy of ${bookTitle}`,
      html: `
    <div style="max-width:600px;margin:40px auto;border-radius:10px;padding:30px;font-family:'Helvetica Neue',Arial,sans-serif;color:#000;">
      <h1 style="font-size:22px;color:#000;margin-bottom:20px;display:flex;align-items:center;gap:8px;">📚 The Book Link</h1>
      <p style="font-size:15px;line-height:1.6;color:#000;">Hello,</p>
      <p style="font-size:15px;line-height:1.6;color:#000;">
        You requested to read <strong>${bookTitle}</strong>.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#000;">Click the link below to access the book:</p>
      <a href="${bookLink}" style="display:inline-block;background-color:#0078d4;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:6px;margin:20px 0;font-size:15px;">
        📖 Read Book
      </a>
      <p style="font-size:15px;line-height:1.6;color:#000;">
        Please do well to drop a review on the website after reading. Thank you.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#000;">
        If you did not request this, please ignore this email.
      </p>
      <p style="font-size:15px;line-height:1.6;color:#000;">
        Best regards,<br>
        <strong>Dr. Folarin</strong>
      </p>
    </div>
  `,
    });


    console.log("Mail sent:", info.messageId);
    console.log("MAILJET_API_KEY:", process.env.MAILJET_API_KEY ? "✅ Loaded" : "❌ Missing");


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mailjet SMTP error:", error);
    console.log("MAILJET_API_KEY:", process.env.MAILJET_API_KEY ? "✅ Loaded" : "❌ Missing");
    return NextResponse.json({ error: "Failed to send mail" }, { status: 500 });
  }
}
