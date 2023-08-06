const SendVerificationEmail = (email: string, otp: string) => {
	// const client = new twilio(accountSid, authToken);
	// client.messages
	// 	.create({
	// 		body: `Your OTP is ${otp}`,
	// 		from: '+12058915155',
	// 		to: phone,
	// 	})
	// 	.then((message) => console.log(message.sid));
	//TODO: Send OTP to phone
};

export default {
	SendVerificationEmail,
};
