-- =============================================
-- VULNERABILITY SCANNER DATABASE SCHEMA
-- Run this ENTIRE script in Supabase SQL Editor
-- =============================================

-- Step 1: Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Step 2: Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow users to view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow public read for profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON public.profiles;

-- Step 4: Create RLS policies
-- Users can view their own profile
CREATE POLICY "Allow users to view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Allow users to update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Allow insert during signup - this is the KEY fix
-- Service role and triggers can insert profiles
CREATE POLICY "Allow insert for authenticated users" 
  ON public.profiles FOR INSERT 
  WITH CHECK (true);

-- Step 5: Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 7: Create trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- SCANS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS public.scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  scan_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to view their own scans" ON public.scans;
DROP POLICY IF EXISTS "Allow users to insert their own scans" ON public.scans;
DROP POLICY IF EXISTS "Allow users to update their own scans" ON public.scans;
DROP POLICY IF EXISTS "Allow users to delete their own scans" ON public.scans;

CREATE POLICY "Allow users to view their own scans" 
  ON public.scans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own scans" 
  ON public.scans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own scans" 
  ON public.scans FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own scans" 
  ON public.scans FOR DELETE 
  USING (auth.uid() = user_id);

-- =============================================
-- SCHEDULED SCANS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS public.scheduled_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  scan_type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  next_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.scheduled_scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to view their own scheduled scans" ON public.scheduled_scans;
DROP POLICY IF EXISTS "Allow users to insert their own scheduled scans" ON public.scheduled_scans;
DROP POLICY IF EXISTS "Allow users to update their own scheduled scans" ON public.scheduled_scans;
DROP POLICY IF EXISTS "Allow users to delete their own scheduled scans" ON public.scheduled_scans;

CREATE POLICY "Allow users to view their own scheduled scans" 
  ON public.scheduled_scans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own scheduled scans" 
  ON public.scheduled_scans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own scheduled scans" 
  ON public.scheduled_scans FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own scheduled scans" 
  ON public.scheduled_scans FOR DELETE 
  USING (auth.uid() = user_id);

-- =============================================
-- DONE! Your database is now ready.
-- =============================================
