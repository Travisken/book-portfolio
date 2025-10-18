import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "data.json");

    // Read existing data
    let data = [];
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf8");
      data = file ? JSON.parse(file) : [];
    }

    // Add new record
    data.push(body);

    // Save updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "Email saved successfully." });
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json({ success: false, error: "Failed to save email." }, { status: 500 });
  }
}
