export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      subject,
      html,
    }),
  });

  return await response.json();
}