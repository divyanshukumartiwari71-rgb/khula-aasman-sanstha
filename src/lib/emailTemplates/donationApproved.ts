export function donationApprovedTemplate(
  donorName: string,
  amount: number
) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Donation Approved</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:white;border-radius:12px;padding:40px;margin-top:30px;">

<tr>
<td align="center">

<h1 style="color:#0f172a;">
🙏 Thank You For Your Donation
</h1>

<p style="font-size:18px;color:#334155;">
Dear <strong>${donorName}</strong>,
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Thank you for donating
<strong>₹${amount}</strong>
to
<b>Khula Aasman Sanstha</b>.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Your payment has been successfully verified by our team.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Your support helps us provide education, food,
healthcare and skill development to those who need it most.
</p>

<div
style="
margin-top:35px;
background:#2563eb;
display:inline-block;
padding:14px 30px;
border-radius:8px;
color:white;
font-weight:bold;
font-size:18px;
">
Donation Verified ✅
</div>

<p style="margin-top:40px;color:#64748b;">
With Gratitude,<br>
<b>Khula Aasman Sanstha</b>
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
}

export function volunteerVerificationTemplate(
  volunteerName: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Volunteer Verification</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:white;border-radius:12px;padding:40px;margin-top:30px;">

<tr>
<td align="center">

<h1 style="color:#0f172a;">
🤝 Volunteer Application Received
</h1>

<p style="font-size:18px;color:#334155;">
Dear <strong>${volunteerName}</strong>,
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Thank you for applying to become a volunteer with
<strong>Khula Aasman Sanstha</strong>.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
To continue with your application, please reply to this email with the following documents:
</p>

<div style="text-align:left;margin:25px auto;width:80%;font-size:16px;color:#475569;line-height:30px;">
• Aadhaar Card<br>
• Passport-size Photograph<br>
• Resume (if applicable)<br>
• Any relevant certificates (optional)
</div>

<p style="font-size:16px;color:#475569;line-height:28px;">
Once our team verifies your documents, we will contact you regarding the next steps.
</p>

<div
style="
margin-top:35px;
background:#16a34a;
display:inline-block;
padding:14px 30px;
border-radius:8px;
color:white;
font-weight:bold;
font-size:18px;
">
Verification Required 📄
</div>

<p style="margin-top:40px;color:#64748b;">
Regards,<br>
<b>Khula Aasman Sanstha</b>
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
}

export function volunteerApprovedTemplate(
  volunteerName: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Volunteer Application Approved</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:white;border-radius:12px;padding:40px;margin-top:30px;">

<tr>
<td align="center">

<h1 style="color:#16a34a;">
🎉 Congratulations!
</h1>

<p style="font-size:18px;color:#334155;">
Dear <strong>${volunteerName}</strong>,
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
We are delighted to inform you that your documents have been successfully verified.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Your volunteer application has been approved by
<strong>Khula Aasman Sanstha</strong>.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Our team will contact you shortly regarding upcoming activities and onboarding.
</p>

<div
style="
margin-top:35px;
background:#16a34a;
display:inline-block;
padding:14px 30px;
border-radius:8px;
color:white;
font-weight:bold;
font-size:18px;
">
Application Approved ✅
</div>

<p style="margin-top:40px;color:#64748b;">
Welcome to the Khula Aasman Sanstha family! ❤️
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
}
export function volunteerRejectedTemplate(
  volunteerName: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Volunteer Application Update</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:white;border-radius:12px;padding:40px;margin-top:30px;">

<tr>
<td align="center">

<h1 style="color:#dc2626;">
Volunteer Application Update
</h1>

<p style="font-size:18px;color:#334155;">
Dear <strong>${volunteerName}</strong>,
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
Thank you for your interest in volunteering with
<strong>Khula Aasman Sanstha</strong>.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
After reviewing your application, we regret to inform you that we are unable to proceed with your application at this time.
</p>

<p style="font-size:16px;color:#475569;line-height:28px;">
We sincerely appreciate your willingness to support our mission and encourage you to apply again in the future.
</p>

<div
style="
margin-top:35px;
background:#dc2626;
display:inline-block;
padding:14px 30px;
border-radius:8px;
color:white;
font-weight:bold;
font-size:18px;
">
Application Not Selected
</div>

<p style="margin-top:40px;color:#64748b;">
Thank you for your understanding.<br>
<b>Khula Aasman Sanstha</b>
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