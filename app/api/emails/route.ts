import { NextResponse } from "next/server";

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_ID}`;
const JSONBIN_KEY = process.env.JSONBIN_KEY as string;

// 🧠 GET - Fetch all emails
export async function GET() {
  try {
    // Fetch data from JSONBin
    const res = await fetch(JSONBIN_URL, {
      headers: { "X-Master-Key": JSONBIN_KEY },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch emails:", res.statusText);
      return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
    }

    const json = await res.json();
    const emails = json.record?.emails || [];

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("❌ Error reading emails:", error);
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

    // Get current emails
    const getRes = await fetch(JSONBIN_URL, {
      headers: { "X-Master-Key": JSONBIN_KEY },
      cache: "no-store",
    });

    if (!getRes.ok) {
      console.error("❌ Failed to load existing emails:", getRes.statusText);
      return NextResponse.json({ error: "Failed to load existing emails" }, { status: 500 });
    }

    const data = await getRes.json();
    const emails = data.record?.emails || [];

    const newEmail = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };

    // Append and update
    const updated = { emails: [...emails, newEmail] };

    const putRes = await fetch(JSONBIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_KEY,
      },
      body: JSON.stringify(updated),
    });

    if (!putRes.ok) {
      console.error("❌ Failed to update JSONBin:", putRes.statusText);
      return NextResponse.json({ error: "Failed to update email list" }, { status: 500 });
    }

    return NextResponse.json({ success: true, email: newEmail });
  } catch (error) {
    console.error("❌ Error saving email:", error);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }
}
