const welcomeTemplate = (name) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to GreenVision AI</title>
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
padding:32px 28px;
text-align:center;
">

<h1 style="
margin:0;
color:#22c55e;
font-size:24px;
font-weight:bold;
">
🌿 GreenVision AI
</h1>

<p style="
margin-top:10px;
color:#d1d5db;
font-size:12px;
letter-spacing:1px;
">
AI POWERED ENVIRONMENTAL INTELLIGENCE
</p>

</td>
</tr>

<!-- Welcome Hero -->
<tr>
<td style="
padding:45px 35px 30px;
text-align:center;
">

<div style="
font-size:48px;
margin-bottom:15px;
">
🌎
</div>

<h2 style="
margin:0;
color:#111827;
font-size:26px;
line-height:1.4;
">
Welcome to GreenVision AI,
<br/>
<span style="color:#16a34a;">${name}!</span>
</h2>

<p style="
margin-top:20px;
font-size:15px;
line-height:1.8;
color:#4b5563;
">
We're excited to have you on board!
You've just taken a meaningful step towards
building a cleaner, greener, and more sustainable future.
</p>

</td>
</tr>

<!-- Main Message -->
<tr>
<td style="padding:10px 35px 35px;">

<p style="
font-size:14px;
line-height:1.9;
color:#4b5563;
">
At <strong>GreenVision AI</strong>, we believe that technology
can do more than make life easier — it can help make our planet
a better place to live.
</p>

<p style="
font-size:14px;
line-height:1.9;
color:#4b5563;
">
Our platform combines Artificial Intelligence and environmental
intelligence to help identify environmental issues, encourage
community participation, and support meaningful action.
</p>

<!-- Features -->
<div style="
margin-top:25px;
padding:22px;
background:#ecfdf5;
border-radius:14px;
">

<h3 style="
margin:0 0 20px;
color:#065f46;
font-size:16px;
">
Here's what you can do with GreenVision AI:
</h3>

<p style="font-size:13px;line-height:1.8;color:#065f46;">
🌱 <strong>Report Environmental Issues</strong><br/>
Identify and report waste, pollution, and other environmental concerns.
</p>

<p style="font-size:13px;line-height:1.8;color:#065f46;">
🤖 <strong>AI-Powered Analysis</strong><br/>
Get intelligent insights into environmental problems and their potential risks.
</p>

<p style="font-size:13px;line-height:1.8;color:#065f46;">
🤝 <strong>Be Part of the Community</strong><br/>
Participate in cleanup activities and contribute towards a cleaner environment.
</p>

<p style="font-size:13px;line-height:1.8;color:#065f46;">
🏆 <strong>Make Your Impact Count</strong><br/>
Track your contributions and get recognized for your environmental efforts.
</p>

</div>

<!-- Inspirational Message -->
<div style="
margin-top:30px;
padding:25px;
background:#111827;
border-radius:14px;
text-align:center;
">

<p style="
margin:0;
color:#22c55e;
font-size:18px;
font-weight:bold;
line-height:1.6;
">
Small Actions. Big Impact.
</p>

<p style="
margin-top:12px;
color:#d1d5db;
font-size:13px;
line-height:1.8;
">
Every report you submit, every cleanup you participate in,
and every action you take brings us one step closer to a healthier planet.
</p>

</div>

<!-- Closing -->
<p style="
margin-top:30px;
font-size:14px;
line-height:1.8;
color:#4b5563;
">
We're glad you're here, ${name}.
Let's turn awareness into action and make sustainability
a part of everyday life.
</p>

<p style="
margin-top:25px;
font-size:14px;
color:#374151;
">
With green regards,<br/>
<strong style="color:#16a34a;">Team GreenVision AI 🌿</strong>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="
background:#111827;
padding:30px;
text-align:center;
">

<p style="
margin:0;
font-size:16px;
color:#22c55e;
font-weight:bold;
">
GreenVision AI
</p>

<p style="
margin-top:10px;
color:#9ca3af;
font-size:13px;
line-height:1.7;
">
Building a Cleaner Tomorrow with Artificial Intelligence 🌎
</p>

<hr style="
margin:22px 0;
border:none;
border-top:1px solid #374151;
">

<p style="
margin:0;
font-size:11px;
color:#6b7280;
line-height:1.7;
">
You're receiving this email because you created an account
with GreenVision AI.
</p>

<p style="
margin-top:12px;
font-size:11px;
color:#6b7280;
">
Together for a Greener Tomorrow.
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

module.exports = welcomeTemplate;
