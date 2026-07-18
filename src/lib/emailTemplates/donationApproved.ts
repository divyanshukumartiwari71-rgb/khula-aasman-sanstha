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