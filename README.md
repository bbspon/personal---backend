## 📧 Email Sending Setup (Nodemailer with Gmail)

To enable email functionality, follow these steps:

1. **Enable 2-Step Verification** on your Gmail account:  
   https://myaccount.google.com/security

2. **Generate an App Password** here:  
   https://myaccount.google.com/apppasswords  
   - Choose **App** → Mail  
   - Choose **Device** → Other → type `NodeMailer App`  
   - Click Generate

3. **Copy the 16-character app password** (e.g. `abcd efgh ijkl mnop`).

4. Add the following to your `.env` file:
   ```env
   GMAIL_USER=yourgmail@gmail.com
   GMAIL_PASS=abcd efgh ijkl mnop
