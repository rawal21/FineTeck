const report = require("../models/Reports")

module.exports.fetchreport = async (req, res) => {
  try {
      const reports = await Report.find({ userId: req.params.userId });
      res.json(reports);
  } catch (error) {
      res.status(500).json({ error: 'Server Error' });
  }
} 

module.exports.downloadfile =  async (req, res) => {
  try {
      const reports = await Report.find({ userId: req.params.userId });
      if (!reports.length) return res.status(404).json({ error: 'No reports found' });
      
      const format = req.query.format || 'csv';
      
      if (format === 'csv') {
          const csv = json2csv(reports);
          res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
          res.setHeader('Content-Type', 'text/csv');
          return res.send(csv);
      }
      
      if (format === 'pdf') {
          const doc = new PDFDocument();
          const filePath = path.join(__dirname, 'report.pdf');
          const stream = fs.createWriteStream(filePath);
          doc.pipe(stream);
          
          doc.fontSize(16).text('Financial Report', { align: 'center' });
          reports.forEach(report => {
              doc.moveDown().fontSize(12).text(`Month: ${report.month}, Year: ${report.year}`);
              doc.text(`Income: ${report.income}, Expenses: ${report.expenses}, Savings: ${report.savings}`);
          });
          
          doc.end();
          stream.on('finish', () => {
              res.download(filePath, 'report.pdf', (err) => {
                  if (err) console.error(err);
                  fs.unlinkSync(filePath);
              });
          });
      }
  } catch (error) {
      res.status(500).json({ error: 'Server Error' });
  }
};