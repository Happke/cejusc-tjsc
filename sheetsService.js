import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

const sheets = google.sheets({ version: 'v4', auth });

export async function getMetas() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.PAUTAC2_ID,
    range: 'METAS!A2:C',
  });

  const values = res.data.values || [];
  return values.filter(row => row[0] && row[1] && row[2] && !isNaN(row[2]));
}
