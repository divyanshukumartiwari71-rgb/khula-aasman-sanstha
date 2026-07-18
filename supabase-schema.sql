-- Khula Aasman Sanstha Database Schema
-- Run this in your Supabase SQL Editor to set up tables.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor', -- 'admin', 'editor'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Seed an admin user (replace with actual admin email)
-- INSERT INTO admins (email, role) VALUES ('admin@khulaaasmansanstha.org', 'admin') ON CONFLICT (email) DO NOTHING;

-- 2. Homepage Content
CREATE TABLE IF NOT EXISTS homepage_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_title TEXT NOT NULL,
    hero_subtitle TEXT NOT NULL,
    mission TEXT NOT NULL,
    vision TEXT NOT NULL,
    stats_children TEXT NOT NULL,
    stats_women TEXT NOT NULL,
    stats_meals TEXT NOT NULL,
    stats_volunteers TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Seed homepage content
INSERT INTO homepage_content (id, hero_title, hero_subtitle, mission, vision, stats_children, stats_women, stats_meals, stats_volunteers)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Empowering Underprivileged Communities in Varanasi',
    'Khula Aasman Sanstha is dedicated to uplifting lives through Child Education, Women Empowerment, Nutrition, and Sustainable Development.',
    'To create an inclusive society where every child gets quality education, every woman finds self-reliance, and every community thrives in health and harmony.',
    'An empowered nation where geographical, gender, and social barriers are dissolved, allowing every individual to achieve their full potential under a "Khula Aasman" (Open Sky).',
    '1,200+',
    '350+',
    '50,000+',
    '150+'
) ON CONFLICT (id) DO NOTHING;

-- 3. Programs Table
CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    banner_image TEXT NOT NULL,
    description TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    read_more_content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'education', 'women', 'meals', 'rural', 'environment', 'sports'
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    skills TEXT,
    experience TEXT,
    status TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    type TEXT NOT NULL, -- 'one-time', 'monthly', 'sponsor'
    sponsor_child_id TEXT,
    status TEXT DEFAULT 'completed' NOT NULL, -- 'pending', 'completed', 'rejected'
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL, -- 'unread', 'read', 'replied'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Success Stories Table
CREATE TABLE IF NOT EXISTS success_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. Partners Table
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    quote TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
