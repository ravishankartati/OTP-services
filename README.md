# OTP-services
To use msg91 OTP services.

For documentation refer 'https://docs.msg91.com/collection/msg91-api-integration/5/sendotp/TZ648D1Y'.

Example:

OptService = require("otpServices.js")


let otpServices = new OtpServices(
  "Auth Key",
  "Template ID"
);

1. Send OTP:
  
    //example moble number: 919876543210
  
    otpServices.send(mobile number with country code, (status, res) => console.log(status, res));

2. Resend OTP: 

    otpServices.resend(mobile number with country code, (status, res) => console.log(res));

3. Verify OTP:

    otpServices.verify(mobile number with country code, otp, (status, res) => console.log(status, res));

4. Set OTPexpiry:

    otpServices.setOtpExpity(1000);

5. Set OTPlength:

    //min length - 4
  
    //max length - 9
  
    otpServices.setOtpLength(6);
