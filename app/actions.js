"use server";

export async function sendContactRequest(formData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("nachricht");

  console.log("Contact Request Received:", { name, email, message });

  // In a real app, you would use a service like Resend, Nodemailer, etc.
  // return { success: true };
  
  return {
    success: true,
    message: "Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.",
  };
}
