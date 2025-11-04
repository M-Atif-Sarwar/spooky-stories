export const verificationEmailTemplate = (verificationCode: string)=> { 
    return `
  <div style="background-color:#f4f4f4;padding:40px;font-family:Arial, sans-serif;">
    <div style="max-width: 500px;margin:auto;background:white;border-radius:10px;padding:30px;text-align:center;border:1px solid #ddd;">
      
      <h2 style="color:#333;margin-bottom:10px;">🔐 Verify Your Email</h2>
      <p style="color:#555;font-size:16px;">
        Thank you for signing up for <strong>Spooky Stories</strong> 👻
      </p>

      <p style="color:#666;margin:25px 0;font-size:15px;">
        Enter the verification code below to activate your account:
      </p>

      <div style="font-size:32px;font-weight:bold;color:#0d6efd;background:#eef2ff;padding:12px;border-radius:6px;display:inline-block;letter-spacing:6px;">
        ${verificationCode}
      </div>

    //   <p style="color:#888;font-size:14px;margin-top:30px;">
    //     This code will expire in <strong>10 minutes</strong>.
    //   </p>

      <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">

      <p style="font-size:12px;color:#aaa;">
        If you didn’t request this email, you can safely ignore it.
      </p>
    </div>
  </div>
`
};