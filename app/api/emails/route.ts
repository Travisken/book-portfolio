import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "email.json");

// 🧩 Ensure data directory & file exist
function ensureFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

// 🧠 GET - Fetch all emails
export async function GET() {
  try {
    ensureFileExists();

    const data = fs.readFileSync(filePath, "utf8");
    const emails = JSON.parse(data || "[]");

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("❌ Error reading emails:", error);
    return NextResponse.json({ error: "Failed to read emails" }, { status: 500 });
  }
}

// ✉️ POST - Add a new email
export async function POST(req: Request) {
  try {
    ensureFileExists();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    const emails = fileData ? JSON.parse(fileData) : [];

    const newEmail = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };

    emails.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));

    return NextResponse.json({ success: true, email: newEmail });
  } catch (error) {
    console.error("❌ Error saving email:", error);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }
}
