import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, bookTitle, bookDocument } = await req.json();

    if (!email || !bookTitle || !bookDocument) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create book link
    const bookLink = `https://www.drnimbs.com/read-book?bookDocument=${encodeURIComponent(
      bookDocument,
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

  <h1 style="font-size:22px;color:#000;margin-bottom:20px;display:flex;align-items:center;gap:8px;">
    📚 The Book Link
  </h1>

  <p style="font-size:15px;line-height:1.6;color:#000;">Hello,</p>

  <p style="font-size:15px;line-height:1.6;color:#000;">
    You requested to read <strong>${bookTitle}</strong>.
  </p>

  <p style="font-size:15px;line-height:1.6;color:#000;">
    Click the link below to access the book:
  </p>

  <a
    href="${bookLink}"
    style="
      display:inline-block;
      background-color:#0078d4;
      color:#ffffff;
      text-decoration:none;
      font-weight:600;
      padding:12px 24px;
      border-radius:6px;
      margin:20px 0;
      font-size:15px;
    "
  >
    📖 Read Book
  </a>

  <hr style="border:none;border-top:1px solid #e5e5e5;margin:30px 0;" />

  <p style="font-size:15px;line-height:1.7;color:#000;">
    Hello, this is <strong>Dr. Folarin Akinsiku</strong>, the author of
    <em>International Framework for Investing in Healthcare</em>.
    Thank you for your interest in this eBook.
  </p>

  <p style="font-size:15px;line-height:1.7;color:#000;">
    Since its release, it has received over <strong>1,000 views</strong>,
    demonstrating a strong demand for structured mentorship, access to credible
    information, and expert guidance within the healthcare entrepreneurship space.
    In response, we have put systems in place to support this growing interest,
    and we encourage you to watch out for more information that will be shared soon.
  </p>

  <p style="font-size:15px;line-height:1.7;color:#000;">
    If you would like to join a healthcare entrepreneurial community of seasoned
    experts who provide support, mentorship, and guidance to help bring innovative
    solutions to life, kindly register below:
  </p>

  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSepWZsS9YIZSADmHwCq-qvcC82014K4yLdzp-iYyrZ0z-MrJQ/viewform?usp=publish-editor"
    target="_blank"
    style="
      display:inline-block;
      background-color:#000;
      color:#ffffff;
      text-decoration:none;
      font-weight:600;
      padding:14px 26px;
      border-radius:6px;
      margin:20px 0;
      font-size:15px;
    "
  >
    🤝 Join the Healthcare Entrepreneurs Community
  </a>

  <p style="font-size:14px;line-height:1.6;color:#000;margin-top:30px;">
    Please do well to drop a review on the website after reading. Thank you.
  </p>

  <p style="font-size:14px;line-height:1.6;color:#000;">
    If you did not request this email, please ignore it.
  </p>

  <p style="font-size:14px;line-height:1.6;color:#000;margin-top:20px;">
    Best regards,<br />
    <strong>Dr. Folarin Akinsiku</strong>
  </p>

</div>

  `,
    });

    console.log("Mail sent:", info.messageId);
    console.log(
      "MAILJET_API_KEY:",
      process.env.MAILJET_API_KEY ? "✅ Loaded" : "❌ Missing",
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mailjet SMTP error:", error);
    console.log(
      "MAILJET_API_KEY:",
      process.env.MAILJET_API_KEY ? "✅ Loaded" : "❌ Missing",
    );
    return NextResponse.json({ error: "Failed to send mail" }, { status: 500 });
  }
}
