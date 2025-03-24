
const nodemailer = require('nodemailer');
const { GMAIL_USER, GMAIL_PASS } = process.env;



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host
    port: 465, // Common port for SMTP with STARTTLS
    secure: true, // Set to true for port 465 (SSL), or false for port 587 (STARTTLS)
    auth: {
        user: 'in.trafyai@gmail.com',
        pass: 'tbgi htxk tnxc zxxf'  // Your email password
    }
});

console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_PASS:', process.env.GMAIL_PASS);


const sendEmailNotification = async (email, subject, htmlContent) => {
    console.log(`Sending email to: ${email}`);
    try {
        await transporter.sendMail({
            from: 'in.trafyai@gmail.com',
            to: email,
            subject: subject,
            html: htmlContent,  // ✅ Ensure HTML content is used
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};




const sendNewsletterWelcomeEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, msg: 'Email is required.' });
        }

        const subject = "Welcome to the Trafy AI Newsletter!";
        const htmlContent = `
            <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: auto; padding: 20px;padding-top:"0px" border-radius: 10px; background-color: #ffffff; border: 1px solid #ddd;">
                <div style="text-align: center; margin-bottom: 20px;background-color:white;padding:20px 0px">
                    <img src="https://firebasestorage.googleapis.com/v0/b/testing-f9c8c.appspot.com/o/trafy-b-logo.png?alt=media&token=397f432c-8f74-4f3e-932e-0d13b229af6a" alt="Trafy AI" width="100" />
                </div>
                <h2 style="color: #02020A; text-align: center;">🎉 Welcome to Trafy AI!</h2>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    You’ve successfully subscribed to our newsletter. Get ready to receive insights on AI, marketing trends, and the latest updates straight to your inbox!
                </p>
                <p style="font-size: 16px; color: #555; text-align: center;">
                    Stay ahead with expert tips, industry news, and exclusive content crafted just for you.
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://trafy.ai/research/evolve-intelligence-transmutable-resilient-ai" style="background: #02020A; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; display: inline-block;">
                        Visit Our Blog
                    </a>
                </div>
                <p style="font-size: 14px; color: #888; text-align: center; margin-top: 20px;">
                    If you have any questions, feel free to <a href="mailto:support@trafy.ai" style="color: #007bff;">contact us</a>.
                </p>
                <hr style="border: none; border-top: 1px solid #ddd; margin-top: 20px;">
                <p style="font-size: 12px; color: #aaa; text-align: center;">
                    © 2025 Trafy AI. All rights reserved.
                </p>
            </div>
        `;

        await sendEmailNotification(email, subject, htmlContent);

        res.status(200).json({ success: true, msg: 'Welcome email sent successfully' });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({ success: false, msg: 'Failed to send email' });
    }
};

module.exports = {
    sendNewsletterWelcomeEmail
};
