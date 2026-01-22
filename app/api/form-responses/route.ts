// app/api/form-responses/route.ts
import { google } from "googleapis";
import { FormResponse } from "@/types/form";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export async function GET() {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Form Responses 1",
  });

  const rows = res.data.values || [];
  const [, ...data] = rows; // remove header row

  const responses: FormResponse[] = data.map((row, i) => ({
    id: `${i}-${row[2]}`,
    timestamp: row[0],
    name: row[1],
    country: row[2],
    email: row[3],
    phone: row[4],
    specialties: row[5]?.split(",").map((s: string) => s.trim()) || [],
    comments: row[6] || "",
  }));

  return Response.json(responses);
}
