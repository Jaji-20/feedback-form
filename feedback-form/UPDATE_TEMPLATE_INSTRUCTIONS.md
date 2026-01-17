# 📧 How to Update Your EmailJS Template Content

## Step-by-Step Instructions

### Step 1: Open Your EmailJS Template
1. Go to: https://dashboard.emailjs.com/admin/template/template_u8pqiyl
2. Or: EmailJS Dashboard → Email Templates → Click on `template_u8pqiyl`

### Step 2: Update Template Content

#### Option A: HTML Template (Recommended - Beautiful Design)
1. In your EmailJS template editor, make sure **"Content Type"** is set to **"HTML"**
2. **Delete** all the existing content
3. **Copy** the entire content from `EMAILJS_TEMPLATE_SIMPLE.html`
4. **Paste** it into the EmailJS template content area
5. The template will display all your feedback data beautifully

#### Option B: Plain Text Template (Simple)
1. In your EmailJS template editor, set **"Content Type"** to **"Plain Text"**
2. **Delete** all the existing content
3. **Copy** the content from `EMAILJS_TEMPLATE_PLAINTEXT.txt`
4. **Paste** it into the EmailJS template content area

### Step 3: Update Template Settings

Make sure these settings are correct:

- **To Email:** `jajichandrakala@gmail.com` (or use `{{to_email}}`)
- **From Name:** `{{from_name}}`
- **Reply To:** `{{reply_to}}` or `{{from_email}}`
- **Subject:** `New Feedback Submission - {{from_name}}` or `New Feedback Received`

### Step 4: Save Template
1. Click **"Save"** button
2. Wait for confirmation

### Step 5: Test
1. Go back to your feedback form
2. Submit a test feedback
3. Check your email: jajichandrakala@gmail.com
4. You should receive a beautifully formatted email!

## Template Variables Used

The template uses these variables (already sent by your form):
- `{{from_name}}` - Submitter's name
- `{{from_email}}` - Submitter's email
- `{{category}}` - Feedback category
- `{{rating}}` - Rating (1-5)
- `{{message}}` - Feedback message
- `{{timestamp}}` - Submission time
- `{{reply_to}}` - Reply-to email (same as from_email)

## Which Template to Use?

- **EMAILJS_TEMPLATE_SIMPLE.html** - Recommended! Beautiful HTML email with colors and formatting
- **EMAILJS_TEMPLATE_PLAINTEXT.txt** - Simple text-only version (if HTML doesn't work)

## Troubleshooting

### If HTML doesn't work:
- Try the plain text version first
- Make sure "Content Type" is set correctly in EmailJS
- Some email clients don't support all HTML features

### If variables show as {{variable_name}}:
- Make sure variable names match exactly (case-sensitive)
- Check that your form is sending these variables (it is!)

### If email looks broken:
- Use the simpler template (EMAILJS_TEMPLATE_SIMPLE.html)
- Check EmailJS template preview before saving

## Quick Copy-Paste

**For HTML Template:**
1. Open `EMAILJS_TEMPLATE_SIMPLE.html` file
2. Copy all content (Ctrl+A, Ctrl+C)
3. Paste into EmailJS template editor
4. Save

**For Plain Text:**
1. Open `EMAILJS_TEMPLATE_PLAINTEXT.txt` file
2. Copy all content
3. Paste into EmailJS template editor
4. Save
