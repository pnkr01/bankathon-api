import sgMail from '@sendgrid/mail';
import { EMAIL_API, EMAIL_FROM } from '../../config/const';
sgMail.setApiKey(EMAIL_API);

const SendLoginOTP = (email: string, otp: string) => {
	const msg = {
		to: email, // Change to your recipient
		from: EMAIL_FROM, // Change to your verified sender
		subject: 'Email Verification',
		html: LoginTemplate(otp),
	};
	sgMail.send(msg).catch((err) => {
		logger.error(err.response.body);

		//ignore
	});
};

export default {
	SendLoginOTP,
};

const LoginTemplate = (otp: string) => {
	return `   
	<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .confirmation-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            text-align: center;
        }

        .logo {
            max-width: 100px;
            margin-bottom: 20px;
        }

        .confirmation-code {
            font-size: 66px;
            font-weight: bold;
            margin-bottom: 20px;
            margin-top: 10px;
            background-image: linear-gradient(to right, #007bff, #ff0000);
            -webkit-background-clip: text;
            color: transparent;
        }

        .instructions {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
        }

        .thank-you {
            font-size: 20px;
            color: #007bff;
            margin-bottom: 20px;
        }

        .note {
            font-size: 14px;
            color: #777;
        }

        .footer {
            font-size: 14px;
            color: #555;
            text-align: center;
            padding: 10px;
            background-color: #c6c6c6;

        }

        h1 {
            margin-top: -10px;
        }
    </style>
</head>

<body>
    <div class="confirmation-container">
        <h1>Email Verification</h1>
        <p class="confirmation-code">${otp}</p>
        <p class="instructions">All you have to do is just to copy the above code and paste it to your form for your
            email verification.</p>
        <p class="thank-you">Thank You!</p>
        <p class="note">Note: This is confirmation code is valid for only 10 minutes.</p>
        <div class="footer">
            ©All rights reserved.
        </div>
    </div>
</body>

</html>
	 `;
};
