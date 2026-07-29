const otpTemplate = (name, otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="
background:#ffffff;
border:2px solid #111827;
border-radius:18px;
overflow:hidden;
">

<tr>
<td style="
background:#111827;
padding:28px;
text-align:center;
">

<h1 style="
margin:0;
color:#22c55e;
font-size:16px;
font-weight:bold;
">
🌿 GreenVision AI
</h1>

<p style="
margin-top:8px;
color:#d1d5db;
font-size:8px;
">
AI Powered Environmental Intelligence
</p>

</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="
margin:0;
color:#111827;
font-size:17px;
">
Hello ${name},
</h2>

<p style="
margin-top:20px;
font-size:8px;
line-height:1.7;
color:#4b5563;
">
Thank you for signing up with
<strong>GreenVision AI.</strong>

To verify your email address, please use the One-Time Password (OTP) below.
</p>

<div
style="
margin:35px auto;
width:240px;
background:#111827;
border-radius:14px;
padding:18px;
text-align:center;
">

<span
style="
font-size:19px;
letter-spacing:12px;
font-weight:bold;
color:#22c55e;
">
${otp}
</span>

</div>

<p style="
text-align:center;
font-size:8px;
color:#6b7280;
">

This OTP is valid for
<strong>5 minutes</strong>
and can be used
<strong>only once.</strong>

</p>

<hr
style="
margin:35px 0;
border:none;
border-top:1px solid #e5e7eb;
">

<p style="
font-size:8px;
line-height:1.8;
color:#6b7280;
">

🔒 Please do not share this OTP with anyone.

GreenVision AI will never ask you for your OTP via phone, email, or message.

</p>

<p style="
margin-top:30px;
font-size:9px;
color:#374151;
">

If you did not create this account, you can safely ignore this email.

</p>

</td>
</tr>

<tr>

<td
style="
background:#111827;
padding:28px;
text-align:center;
">

<p style="
margin:0;
font-size:12px;
color:#22c55e;
font-weight:bold;
">
GreenVision AI
</p>

<p style="
margin-top:8px;
color:#9ca3af;
font-size:14px;
">

Building a Cleaner Tomorrow with Artificial Intelligence 🌎

</p>

<p style="
margin-top:20px;
font-size:7px;
color:#6b7280;
">

Need help?

Contact our Support Team anytime.

</p>

</td>

</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

module.exports = otpTemplate;