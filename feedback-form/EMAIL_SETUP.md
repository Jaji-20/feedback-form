# Email Setup Instructions for Feedback Form

This form uses EmailJS to send feedback directly to your email: **jajichandrakala@gmail.com**

## Quick Setup Steps:

### 1. Create a Free EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account (200 emails/month free)

### 2. Create an Email Service
- In EmailJS dashboard, go to **Email Services**
- Click **Add New Service**
- Choose your email provider (Gmail recommended)
- Connect your Gmail account
- Note down your **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create an Email Template
- Go to **Email Templates** in the dashboard
- Click **Create New Template**
- Use this template:

**Template Name:** Feedback Form

**Subject:** New Feedback Form Response

**Content (HTML format - select HTML in EmailJS):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <h2 style="color: #1a73e8; border-bottom: 2px solid #1a73e8; padding-bottom: 10px;">📋 New Feedback Form Response</h2>
  
  <div style="background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 5px;">
    <p style="margin: 8px 0;"><strong>👤 Name:</strong> {{from_name}}</p>
    <p style="margin: 8px 0;"><strong>📧 Email:</strong> {{from_email}}</p>
    <p style="margin: 8px 0;"><strong>📁 Category:</strong> {{category}}</p>
    <p style="margin: 8px 0;"><strong>⭐ Rating:</strong> {{rating}}/5</p>
    <p style="margin: 8px 0;"><strong>🕒 Submitted:</strong> {{timestamp}}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="color: #333; margin-bottom: 10px;">💬 Feedback Message:</h3>
    <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1a73e8; border-radius: 4px;">
      <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">{{message}}</p>
    </div>
  </div>
  
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
    <p>You can reply directly to this email to respond to {{from_name}}.</p>
  </div>
</div>
```

**OR Plain Text Format (if HTML doesn't work):**
```
═══════════════════════════════════════════════════════
📋 NEW FEEDBACK FORM RESPONSE
═══════════════════════════════════════════════════════

👤 Name: {{from_name}}
📧 Email: {{from_email}}
📁 Category: {{category}}
⭐ Rating: {{rating}}/5
🕒 Submitted: {{timestamp}}

───────────────────────────────────────────────────────
💬 FEEDBACK MESSAGE:
───────────────────────────────────────────────────────

{{message}}

───────────────────────────────────────────────────────
You can reply directly to this email to respond to {{from_name}}.
═══════════════════════════════════════════════════════
```

- Set **To Email:** jajichandrakala@gmail.com
- Set **From Name:** {{from_name}}
- Set **Reply To:** {{reply_to}}
- Note down your **Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Your Public Key
- Go to **Account** → **General**
- Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

### 5. Update the JavaScript File
Open `feedback.js` and replace these placeholders:

1. Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. Replace `YOUR_SERVICE_ID` with your Service ID
3. Replace `YOUR_TEMPLATE_ID` with your Template ID

### Example:
```javascript
emailjs.init("abc123xyz456"); // Your Public Key

await emailjs.send(
    'service_abc123',    // Your Service ID
    'template_xyz789',  // Your Template ID
    templateParams
);
```

## Testing
1. Fill out the form
2. Submit it
3. Check your email: jajichandrakala@gmail.com
4. You should receive the feedback!

## Troubleshooting
- Make sure all IDs are correctly entered
- Check browser console for any errors
- Verify EmailJS service is connected properly
- Ensure template variables match ({{from_name}}, {{message}}, etc.)
