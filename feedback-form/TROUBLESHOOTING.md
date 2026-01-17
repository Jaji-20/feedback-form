# 🔧 Troubleshooting EmailJS Errors

## Common Issues and Solutions

### Error: "undefined" or Generic Error

This usually means one of these issues:

### ✅ 1. Check Template Variables Match

**Problem:** Your EmailJS template variables don't match what the code is sending.

**Solution:**
- Go to your EmailJS Dashboard → Email Templates
- Open your template (`template_u8pqiyl`)
- Make sure these variables exist in your template:
  - `{{to_email}}` or set "To Email" field directly
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{category}}`
  - `{{rating}}`
  - `{{message}}`
  - `{{timestamp}}`
  - `{{reply_to}}`

**Quick Fix:** In your EmailJS template, you can use:
```
Name: {{from_name}}
Email: {{from_email}}
Category: {{category}}
Rating: {{rating}}
Message: {{message}}
```

### ✅ 2. Verify Service is Connected

**Problem:** Your EmailJS service might not be connected to your email provider.

**Solution:**
1. Go to EmailJS Dashboard → Email Services
2. Click on your service (`service_2ju743b`)
3. Make sure it shows "Connected" status
4. If not connected, reconnect your Gmail account

### ✅ 3. Check Template Settings

**Problem:** Template might not be configured correctly.

**Solution:**
1. Go to EmailJS Dashboard → Email Templates
2. Open template `template_u8pqiyl`
3. Verify:
   - **To Email:** Should be `jajichandrakala@gmail.com` OR use `{{to_email}}`
   - **From Name:** `{{from_name}}`
   - **Reply To:** `{{reply_to}}` or `{{from_email}}`
   - **Subject:** Something like "New Feedback Submission"

### ✅ 4. Test EmailJS Connection

**Quick Test:**
1. Open browser console (F12)
2. Try submitting the form
3. Look for console messages:
   - "EmailJS initialized with Public Key: ..."
   - "Sending email with params: ..."
   - "EmailJS Response: ..."
   - Any error messages

### ✅ 5. Verify Credentials

Double-check in `feedback.js`:
- **PUBLIC_KEY:** `30K9rEKUHHy93L6pu` ✓
- **SERVICE_ID:** `service_2ju743b` ✓
- **TEMPLATE_ID:** `template_u8pqiyl` ✓

### ✅ 6. Check EmailJS Quota

**Problem:** Free tier has 200 emails/month limit.

**Solution:**
- Go to EmailJS Dashboard → Account
- Check if you've exceeded the limit
- If yes, wait for next month or upgrade

## Step-by-Step Debugging

1. **Open Browser Console (F12)**
2. **Submit the form**
3. **Look for these messages:**
   ```
   EmailJS initialized with Public Key: 30K9rEKUHHy93L6pu
   Sending email with params: {...}
   ```
4. **Check for errors:**
   - If you see "EmailJS library not loaded" → Script not loading
   - If you see HTTP 400/401 → Credentials wrong
   - If you see HTTP 500 → Template/Service issue

## Quick Test Template

Use this simple template in EmailJS to test:

**Subject:** Test Feedback

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Category: {{category}}
Rating: {{rating}}
Message: {{message}}
```

**Settings:**
- To Email: `jajichandrakala@gmail.com`
- From Name: `{{from_name}}`
- Reply To: `{{reply_to}}`

## Still Not Working?

1. Check EmailJS Dashboard for any error messages
2. Try creating a new template and update TEMPLATE_ID
3. Verify your Gmail account is properly connected
4. Check spam folder in your email
