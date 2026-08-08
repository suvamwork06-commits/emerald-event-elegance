# Form Submission Delivery Plan

## How you would receive enquiries in each option

| Option | How you receive the lead | Best for |
| --- | --- | --- |
| **Lovable Cloud DB only** | Submissions are stored in a secure database. You view them by logging into a private admin page inside the app, or by browsing the database in the Lovable Cloud console. | Tracking, searching, and managing a large pipeline of leads. |
| **Email notifications only** | Each submission is emailed to you (e.g., concierge@maisonaurelle.com) as soon as the form is submitted. No login needed to read them. | Immediate, inbox-first workflow. |
| **Admin dashboard only** | A private dashboard page inside the app lists every submission with filters and status tracking. | Internal team visibility without relying on email. |

## Recommended default: Database + Email + Admin dashboard

For a luxury concierge business, the most robust flow is a combination of all three:

1. **The form saves the enquiry to a Lovable Cloud database** so you have a permanent, searchable record of every lead.
2. **The server immediately sends a formatted email to you** with all the enquiry details (name, email, phone, event type, date, guests, city, budget, notes).
3. **A protected `/admin/enquiries` page inside the app** lets you view, sort, and update the status of every lead in one place.

## Implementation plan

### 1. Enable Lovable Cloud backend
- Activate Lovable Cloud so the project has a PostgreSQL database and server functions.
- This is required before any form data can be persisted.

### 2. Create the `enquiries` table (migration)
- Columns: `id`, `name`, `email`, `phone`, `event_type`, `event_date`, `guests`, `city`, `budget`, `notes`, `status`, `created_at`.
- Enable Row Level Security and grant the authenticated role INSERT access (form submissions are public writes) and SELECT access for the admin dashboard.
- Add `GRANT` statements in the same migration per public-schema policy.

### 3. Replace the EmailJS placeholder with a server function
- Build a `createServerFn` in `src/lib/enquiries.functions.ts` that validates the payload with Zod, inserts it into the `enquiries` table, and sends an email notification.
- Update `QuoteModal.tsx` to call this function instead of `sendEnquiry` from `src/lib/emailjs.ts`.
- Remove the now-unused `emailjs.ts` file.

### 4. Configure email notifications
- Set up a verified Lovable email domain for `maisonaurelle.com` (or your domain).
- Create a transactional email template `new-enquiry` that renders the enquiry details in a luxury-branded layout.
- Use the scaffolded `sendTemplateEmail` helper to send the email to your receiving address after the insert succeeds.
- If you do not yet own a domain, the email step can be deferred and the DB/admin dashboard will still work.

### 5. Build a protected admin page
- Create `src/routes/_authenticated/admin/enquiries.tsx` to list enquiries in a clean table with status filters and a detail drawer.
- This route will sit under the authenticated layout so only signed-in users can access it.

### 6. Add an initial admin user (optional)
- Create the first admin account so you can sign in and view the dashboard immediately after deployment.

## Files to create or modify

| File | Change |
| --- | --- |
| `supabase/migrations/..._create_enquiries.sql` | New table, RLS policies, grants |
| `src/lib/enquiries.functions.ts` | Server function to save + notify |
| `src/lib/email-templates/new-enquiry.tsx` | Email template for lead notifications |
| `src/lib/email-templates/registry.ts` | Register the new template |
| `src/components/luxe/QuoteModal.tsx` | Wire form submission to the server function |
| `src/lib/emailjs.ts` | Delete (replaced by server function) |
| `src/routes/_authenticated/admin/enquiries.tsx` | Admin dashboard route |
| `src/routes/_authenticated/route.tsx` | Auth gate layout (created if missing) |
| `src/routes/__root.tsx` | Add admin nav link if user is authenticated |
| `src/start.ts` | Ensure bearer token middleware is present for authenticated server functions |

## After this plan is approved

I will enable Lovable Cloud, write the migration, scaffold the email template, and build the server function and admin page. The first form submission will be stored in the database and emailed to your configured address, and you will be able to review all submissions in `/admin/enquiries`.
