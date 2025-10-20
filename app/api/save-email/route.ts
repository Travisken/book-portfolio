import { NextResponse } from "next/server";

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_ID}`;
const JSONBIN_KEY = process.env.JSONBIN_KEY as string;

// 🧠 GET all emails
export async function GET() {
  try {
    const response = await fetch(JSONBIN_URL, {
      headers: { "X-Master-Key": JSONBIN_KEY },
    });

    if (!response.ok) {
      console.error("Failed to fetch from JSONBin:", response.statusText);
      return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
    }

    const json = await response.json();
    const emails = json.record?.emails || [];

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error reading emails:", error);
    return NextResponse.json({ error: "Failed to read emails" }, { status: 500 });
  }
}

// ✉️ POST new email
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get current emails from JSONBin
    const res = await fetch(JSONBIN_URL, {
      headers: { "X-Master-Key": JSONBIN_KEY },
    });

    if (!res.ok) {
      console.error("Failed to fetch existing emails:", res.statusText);
      return NextResponse.json({ error: "Failed to fetch existing emails" }, { status: 500 });
    }

    const data = await res.json();
    const emails = data.record?.emails || [];

    const newEmail = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };

    // Add new email to array
    const updatedEmails = { emails: [...emails, newEmail] };

    // Update JSONBin file
    const update = await fetch(JSONBIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_KEY,
      },
      body: JSON.stringify(updatedEmails),
    });

    if (!update.ok) {
      console.error("Failed to update JSONBin:", update.statusText);
      return NextResponse.json({ error: "Failed to update email list" }, { status: 500 });
    }

    return NextResponse.json({ success: true, email: newEmail });
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }
}
