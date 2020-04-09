# OTP-services
To use msg91 otp services

Example:

OptService = require("otpServices.js")


let otpServices = new OtpServices(
  "Auth Key",
  "Template ID"
);

Send OTP:
  //example moble number: 919876543210
  otpServices.send(mobile number with country code, (status, res) => console.log(status, res));

Resend OTP: 
  otpServices.resend(mobile number with country code, (status, res) => console.log(res));

Verify OTP:
  otpServices.verify(mobile number with country code, otp, (status, res) => console.log(status, res));

Set OTPexpiry:
  otpServices.setOtpExpity(1000);

Set OTPlength:
  //min length - 4
  //max length - 9
  otpServices.setOtpLength(6);