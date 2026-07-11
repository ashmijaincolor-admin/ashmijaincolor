# Ashmija in Color — Custom Murals Studio Web Application

Welcome to the official codebase for **ashmija in color** — South Asia's premium custom mural and hand-painted wall art collective. 

This project consists of a high-performance client-facing frontend and a fully integrated, secure Admin Control Dashboard. The application is completely **serverless**, leveraging **Supabase** for database, user authentication, and machine learning (ML) text generation.

---

## 📁 Directory Structure

```text
├── frontend/                     # Static website assets & panels
│   ├── index.html                # Client-facing public landing page
│   ├── css/                      # CSS styling variables, animations & layouts
│   ├── js/                       # Public website controllers
│   │   ├── public/               # Animations, sliders, and form modules
│   │   └── shared/               # Database client config & loader libraries
│   └── admin/                    # Administrative dashboard panel
│       ├── index.html            # Admin login & section routing Shell
│       ├── css/                  # Admin styling sheets & widgets
│       └── js/                   # Dashboard logic (Inquiries, Reviews, Auth, Toasts)
└── supabase-migration/           # Database setup and cloud assets
    ├── supabase_schema.sql       # Database schema creation script
    ├── seed_data_pg.sql          # Demo project data inserts
    └── edge-functions/           # Supabase edge function for ML responses
```

---

## ⚡ Core Features

### 1. Client-Facing Homepage
* **Creations Showcase:** Premium 3D interactive portfolio galleries showing past residential, restaurant, and corporate office murals.
* **Connect Form:** An inquiry form for booking consultations. It writes directly to the Supabase database.
* **Testimonials Carousel:** Animating review cards that pull dynamically from approved reviews.

### 2. Rating & Rate Us Modal
* Located on the homepage. Includes a preset avatar picker, custom avatar file upload, rating selector, and **Project Work Photo** file upload.
* Auto-compressor downscales client-uploaded photos directly on their browser using HTML5 Canvas before uploading (saving database space and speeding up pages).
* Captures rating details and parses metadata correctly.

### 3. Admin Dashboard (Essentials Only)
* **Stats Counter Cards:** Live counters showing Portfolio Items, Active Artists, Unread Inquiries, and Average Star Ratings.
* **Recent Inquiries & Pending Reviews:** Fast-loading overview grids showing the most recent data requiring attention.
* **Simplified View:** Visual analytics charts have been removed to keep the dashboard lightweight, clean, and bug-free.

### 4. Admin Review Management
* Shows reviews as **Visible** (on site) or **Pending Approval**.
* Features a green **Approve** button on the row to publish reviews instantly, or a **Hide** button to pull them down.
* Features a **Robot** button that automatically calls our Supabase AI Edge Function to draft a personalized reply based on the client's review.

### 5. Admin Inquiry Management
* Automatically parses inquiry payloads from the contact form into distinct fields.
* **Project Type** displays in its own separate column as a styled gold badge, while the clean client message body displays in the next column.
* Clickable rows slide open a detailed inquiry panel to update statuses (New, Seen, In Discussion, Closed) or delete messages.

---

## 🚀 Setup & Deployment Guide

### Step 1: Initialize Supabase Database
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) and create a project.
2. Open the **SQL Editor** tab.
3. Paste the contents of `supabase-migration/supabase_schema.sql` and click **Run**.
4. (Optional) Run `supabase-migration/seed_data_pg.sql` in the SQL Editor to populate sample items.

### Step 2: Set Row Level Security (RLS) Permissions
Run the following SQL commands in your Supabase SQL Editor to allow public users to submit forms:
```sql
-- Allow anonymous inserts on the reviews table
CREATE POLICY "public insert reviews" ON reviews FOR INSERT WITH CHECK (true);

-- Allow anonymous inserts on the inquiries table
CREATE POLICY "public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
```

### Step 3: Deploy the AI Reply Edge Function
*Requires the Supabase CLI installed on your machine:*
```bash
supabase login
supabase link --project-ref your-project-id
supabase functions deploy generate-reply
```

### Step 4: Configure App Connection
Open `frontend/js/shared/config.js` and input your Supabase URL and public Anonymous Key:
```javascript
window.appConfig = {
  SUPABASE_URL: "https://your-project-id.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-key-here",
  // URL to your deployed Edge Function:
  ML_REPLY_FUNCTION_URL: "https://your-project-id.supabase.co/functions/v1/generate-reply"
};
```

### Step 5: Create Admin User
In your Supabase Dashboard:
1. Go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Set the email and password you wish to use for logging into the admin panel.

### Step 6: Host Frontend Static Files
Simply upload the entire contents of the `frontend/` directory to any static web hosting provider (such as Hostinger, Netlify, Vercel, or GitHub Pages). 

* **To see the public website:** `https://yourdomain.com`
* **To see the admin dashboard:** `https://yourdomain.com/admin` (the server will automatically load `admin/index.html` inside this directory).

---

## 🛠️ Technology Stack
* **Frontend UI:** HTML5, Vanilla CSS3 (Custom responsive styling, glassmorphism UI, tabler icon fonts).
* **Animations:** GSAP (GreenSock Animation Platform) and CSS Keyframe animations.
* **Database & Auth:** Supabase Client Library (`@supabase/supabase-js`).
* **Dev Server Requirements:** None (No Docker, Java/Spring Boot, Node servers, or local MySQL databases required).
