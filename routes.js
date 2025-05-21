import express from 'express';
import PDFDocument from 'pdfkit';


const router = express.Router();

let complaintData = null;

router.post('/api/complaint/generate', (req, res) => {
  try {
    const { fullName, mobile, address, complaintText } = req.body;

    if (!fullName || !mobile || !address || !complaintText) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    complaintData = { fullName, mobile, address, complaintText };
    res.status(200).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/complaint/download', (req, res) => {
  try {
    if (!complaintData) {
      return res.status(400).json({ error: 'No complaint found to generate PDF' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=complaint.pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Complaint Form', { align: 'center' }).moveDown();
    doc.fontSize(14).text(`Full Name: ${complaintData.fullName}`);
    doc.text(`Mobile Number: ${complaintData.mobile}`);
    doc.text(`Address: ${complaintData.address}`);
    doc.text(`Complaint: ${complaintData.complaintText}`);
    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Could not generate PDF' });
  }
});

export const complaint = router;