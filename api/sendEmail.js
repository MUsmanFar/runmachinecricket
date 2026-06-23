import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_your_api_key_here') {
      console.warn("Resend API key missing or dummy. Email delivery skipped gracefully.");
      return res.status(200).json({ success: true, warning: 'Email skipped (missing key)' });
    }

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
    } else if (type === 'status_update') {
      subject = `Status Update on your Repair: ${payload.status}`;
      htmlContent = `
        <h2>Your Repair Status Has Been Updated</h2>
        <p>Hi ${payload.fullName},</p>
        <p>The status of your repair booking (Ref: ${payload.id}) has been updated to: <strong>${payload.status}</strong></p>
        <p><strong>Service:</strong> ${payload.serviceName}</p>
        <p><strong>Bat Brand:</strong> ${payload.batBrand}</p>
        <br/>
        <p>Thank you for choosing Run Machine Cricket!</p>
      `;
    } else {
      return res.status(400).json({ error: 'Invalid notification type' });
    }

    let toAddresses = ['admin@runmachinecricket.co.uk'];
    if (type === 'repair_request' || type === 'status_update') {
      if (payload.email) {
        toAddresses.push(payload.email);
      }
    }

    const resendData = await resend.emails.send({
      from: 'Run Machine Cricket <onboarding@resend.dev>', // Replace with verified domain in production
      to: toAddresses,
      subject: subject,
      html: htmlContent,
    });

    return res.status(200).json(resendData);
  } catch (error) {
    console.error("Resend API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
