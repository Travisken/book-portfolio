import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// File path for emails.json
const filePath = path.join(process.cwd(), "data", "emails.json");

// 🧠 GET - Fetch all emails
export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const emails = JSON.parse(data);
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error reading emails:", error);
    return NextResponse.json({ error: "Failed to read emails" }, { status: 500 });
  }
}

// ✉️ POST - Add a new email
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const data = fs.readFileSync(filePath, "utf8");
    const emails = JSON.parse(data);

    const newEmail = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };

    emails.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));

    return NextResponse.json({ success: true, email: newEmail });
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }
}
