var http = require("https");

class OtpServices {
  /**
   * Creates a new instance
   * @param {string} authKey Authentication key
   * @param {string} templateId
   * @param {string} companyName
   * @param {string} hostname
   * @param {number} otpLength
   * @param {number} otpExpiry
   * @param {number} invisible
   */
  constructor(authKey, templateId) {
    this.authKey = authKey;
    this.templateId = templateId;
    this.companyName = "Durity";
    this.hostname = "api.msg91.com";
    this.otpLength = 4;
    this.otpExpiry = 1;
    this.invisible = 1;
  }

  setOtpExpity(timeInMin) {
    this.otpExpiry = timeInMin;
    return;
  }

  setOtpLength(length) {
    this.otpLength = length;
    return;
  }

  setInvisible(flag) {
    this.invisible = flag;
    return;
  }

  static generateOtp(otpLength) {
    return Math.floor(
      Math.pow(10, otpLength - 1) +
        Math.random() * 9 * Math.pow(10, otpLength - 1)
    );
  }

  /**
   * @param { number } mobile -> mobile number with country code
   * @param { number } otp
   */
  send(mobile, cb, otp = "undefined") {
    if (otp === "undefined") {
      otp = OtpServices.generateOtp(this.otpLength);
    }
    let extraParam = {
      COMPANY_NAME: this.companyName,
      OTP: otp,
    };
    console.log(otp);
    const path = `/api/v5/otp?authkey=${this.authKey}&template_id=${
      this.templateId
    }&extra_param=${JSON.stringify(extraParam)}&mobile=${mobile}&invisible=${
      this.invisible
    }&otp=${otp}&otp_length=${this.otpLength}&otp_expiry=${this.otpExpiry}`;

    const options = {
      method: "GET",
      hostname: this.hostname,
      port: 443,
      path: encodeURI(path),
      headers: {
        "content-type": "application/json",
      },
    };
    OtpServices.doHttpRequest(options, cb).end();
  }

  /**
   * @param { number } mobile -> mobile number with country code
   * @param { number } otp
   * @param {callback function} cb
   */

  verify(mobile, otp, cb) {
    const path = `/api/v5/otp/verify?mobile=${mobile}&otp=${otp}&authkey=${this.authKey}`;
    // console.log(encodeURI(path))
    const options = {
      method: "POST",
      hostname: this.hostname,
      port: null,
      path: encodeURI(path),
      headers: {
        "content-type": "application/json",
      },
    };
    OtpServices.doHttpRequest(options, cb).end();
  }

  /**
   * @param { number } mobile -> mobile number with country code
   * @param {callback function} cb
   */

  resend(mobile, cb) {
    const path = `/api/v5/otp/retry?mobile=${mobile}&authkey=${this.authKey}`;
    const options = {
      method: "POST",
      hostname: this.hostname,
      port: null,
      path: encodeURI(path),
      headers: {
        "content-type": "application/json",
      },
    };
    OtpServices.doHttpRequest(options, cb).end();
  }

  static doHttpRequest(options, cb) {
    return http.request(options, function (res) {
      var chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        const body = Buffer.concat(chunks).toString();
        if (res.statusCode != 200) {
          cb("MSG91 Api call failed with response code " + res.statusCode, '');
        } else {
          cb(null, JSON.parse(body));
        }
      });
    });
  }
}

module.exports = OtpServices;

