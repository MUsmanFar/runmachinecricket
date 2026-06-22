import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    const { type, payload } = data;

    let subject = '';
    let htmlContent = '';

    if (type === 'repair_request') {
      subject = `New Repair Request: ${payload.id} - ${payload.fullName}`;
      htmlContent = `
        <h2>New Repair Request Received</h2>
        <p><strong>Booking Ref:</strong> ${payload.id}</p>
        <p><strong>Customer Name:</strong> ${payload.fullName}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>WhatsApp:</strong> ${payload.whatsApp}</p>
        <p><strong>Service:</strong> ${payload.serviceName}</p>
        <p><strong>Bat Brand:</strong> ${payload.batBrand}</p>
        <p><strong>Condition:</strong> ${payload.batCondition}</p>
        <p><strong>Delivery Method:</strong> ${payload.deliveryMethod}</p>
        <p><strong>Preferred Date:</strong> ${payload.preferredDate}</p>
        <p><strong>Description:</strong> ${payload.description || 'None'}</p>
      `;
    } else if (type === 'contact_inquiry') {
      subject = `New Contact Inquiry: ${payload.name}`;
      htmlContent = `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message}</p>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid notification type' });
    }

    const resendData = await resend.emails.send({
      from: 'Run Machine Cricket <onboarding@resend.dev>', // Replace with verified domain in production
      to: ['admin@runmachinecricket.co.uk'], // Replace with business email
      subject: subject,
      html: htmlContent,
    });

    return res.status(200).json(resendData);
  } catch (error) {
    console.error("Resend API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
