import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { email, bookTitle } = await req.json();

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // App password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Your requested book: ${bookTitle}`,
            html: `
                <p>Thank you for your interest in <b>${bookTitle}</b>!</p>
                <p>Click the link below to access the book:</p>
                <a href="YOUR_BOOK_DOWNLOAD_LINK" style="background-color: #3ca0ce; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Download Now</a>
                <p>Happy reading!</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
