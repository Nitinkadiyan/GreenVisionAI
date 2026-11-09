const resetPasswordTemplate = (name, resetUrl) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password</title>
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

<!-- Header -->
<tr>
<td style="
background:#111827;
padding:28px;
text-align:center;
">

<h1 style="
margin:0;
color:#22c55e;
font-size:20px;
font-weight:bold;
">
🌿 GreenVision AI
</h1>

<p style="
margin-top:8px;
color:#d1d5db;
font-size:12px;
">
AI Powered Environmental Intelligence
</p>

</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:40px;">

<h2 style="
margin:0;
color:#111827;
font-size:20px;
">
Hello ${name},
</h2>

<p style="
margin-top:20px;
font-size:14px;
line-height:1.7;
color:#4b5563;
">
We received a request to reset the password associated with
your <strong>GreenVision AI</strong> account.
</p>

<p style="
font-size:14px;
line-height:1.7;
color:#4b5563;
">
Click the button below to create a new password.
</p>

<!-- Reset Button -->
<div style="
margin:35px auto;
text-align:center;
">

<a href="${resetUrl}"
style="
display:inline-block;
background:#16a34a;
color:#ffffff;
text-decoration:none;
padding:16px 32px;
border-radius:10px;
font-size:14px;
font-weight:bold;
">
Reset My Password
</a>

</div>

<p style="
text-align:center;
font-size:12px;
line-height:1.7;
color:#6b7280;
">
This password reset link is valid for
<strong>15 minutes</strong> and can only be used once.
</p>

<hr style="
margin:35px 0;
border:none;
border-top:1px solid #e5e7eb;
">

<p style="
font-size:12px;
line-height:1.8;
color:#6b7280;
">
<strong>Having trouble with the button?</strong><br/>
Copy and paste the following link into your browser:
</p>

<p style="
font-size:12px;
line-height:1.7;
word-break:break-all;
color:#16a34a;
">
${resetUrl}
</p>

<p style="
margin-top:30px;
font-size:12px;
line-height:1.8;
color:#6b7280;
">
🔒 For your security, never share your password reset link with anyone.
GreenVision AI will never ask you to share your password.
</p>

<p style="
margin-top:25px;
font-size:13px;
line-height:1.7;
color:#374151;
">
If you did not request a password reset, you can safely ignore this email.
Your account password will remain unchanged.
</p>

<p style="
margin-top:30px;
font-size:14px;
color:#374151;
">
Regards,<br/>
<strong>GreenVision AI Team</strong>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="
background:#111827;
padding:28px;
text-align:center;
">

<p style="
margin:0;
font-size:15px;
color:#22c55e;
font-weight:bold;
">
GreenVision AI
</p>

<p style="
margin-top:8px;
color:#9ca3af;
font-size:13px;
">
Building a Cleaner Tomorrow with Artificial Intelligence 🌎
</p>

<p style="
margin-top:20px;
font-size:11px;
color:#6b7280;
">
Need help? Contact our Support Team anytime.
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

module.exports = resetPasswordTemplate;
