const Bill = require("../models/BillsModel");
const  nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
  }
});

const sendReminders = async () => {
  const today = new Date();
  const bills = await Bill.find({ dueDate: { $lte: today }, status: 'Pending' }).populate('userId');
  
  bills.forEach(async (bill) => {
      const mailOptions = {
          from: 'your-email@gmail.com',
          to: bill.userId.email,
          subject: `Reminder: ${bill.billName} Due Soon!`,
          text: `Your bill of ${bill.amount} is due on ${bill.dueDate.toDateString()}. Please pay it on time.`
      };
      await transporter.sendMail(mailOptions);
  });
};

// Run the reminder function every day at 8 AM
setInterval(sendReminders, 24 * 60 * 60 * 1000);