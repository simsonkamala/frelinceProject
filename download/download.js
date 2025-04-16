// routes/pdf.js or inside your invoice route file
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/generate-pdf', async (req, res) => {
    const { html } = req.body;
  
    if (!html) {
      return res.status(400).json({ error: 'Missing HTML content' });
    }
  
    try {
      const browser = await puppeteer.launch({
        headless: 'new', // for Puppeteer v19+
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
  
      const page = await browser.newPage();
  
      // Set content and wait for full load
      await page.setContent(html, {
        waitUntil: 'networkidle0', // <--- ensures all resources load (e.g. CSS, fonts)
      });
  
      // Optional: Set viewport to make layout consistent
      await page.setViewport({ width: 1200, height: 800 });
  
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });
  
      await browser.close();
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
        'Content-Length': pdfBuffer.length,
      });
  
      res.send(pdfBuffer);
    } catch (error) {
      console.error('PDF generation failed:', error);
      res.status(500).json({ error: 'PDF generation failed' });
    }
  });
  
module.exports = router;
