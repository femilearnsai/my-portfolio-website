import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // temp storage

// Google Drive setup
const auth = new google.auth.GoogleAuth({
  keyFile: 'SERVICE_ACCOUNT_JSON.json', // placeholder
  scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets']
});
const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID';

// Helper: upload file to Drive
async function uploadToDrive(file) {
  const fileMetadata = {
    name: file.originalname,
    parents: [DRIVE_FOLDER_ID]
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path)
  };
  const res = await drive.files.create({ requestBody: fileMetadata, media, fields: 'id, webViewLink' });
  fs.unlinkSync(file.path); // delete temp file
  return res.data.webViewLink;
}

// Booking endpoint
app.post('/api/book', upload.array('files'), async (req, res) => {
  try {
    const { name, email, company, topic, duration, currency, paystackReference } = req.body;

    // Verify Paystack payment
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_xxx';
    const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${paystackReference}`, {
      headers: { Authorization: `Bearer ${paystackSecret}` }
    });

    if (paystackRes.data.data.status !== 'success') {
      return res.status(400).json({ error: 'Payment not successful' });
    }

    // Upload files to Drive
    let filesLinks = [];
    if (req.files) {
      for (const file of req.files) {
        const link = await uploadToDrive(file);
        filesLinks.push(link);
      }
    }

    // Add booking to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Bookings!A:G', // adjust sheet name and range
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [new Date().toLocaleString(), name, email, company, topic, duration, currency, filesLinks.join(', ')]
        ]
      }
    });

    res.json({ success: true, message: 'Booking confirmed', filesLinks });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
