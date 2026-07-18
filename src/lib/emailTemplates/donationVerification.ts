export const abc = "hello";

export function donationVerificationTemplate(
  donorName: string,
  reason: string
) {
  return `<h1>${donorName}</h1><p>${reason}</p>`;
}