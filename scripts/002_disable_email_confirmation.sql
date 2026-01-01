-- =============================================
-- DISABLE EMAIL CONFIRMATION (FOR DEVELOPMENT)
-- Run this in Supabase SQL Editor if you want
-- users to login immediately after signup
-- =============================================

-- This function auto-confirms users on signup
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users 
  SET email_confirmed_at = NOW(),
      confirmed_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS auto_confirm_user_trigger ON auth.users;

-- Create trigger to auto-confirm users
CREATE TRIGGER auto_confirm_user_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_user();

-- =============================================
-- ALTERNATIVE: Manually confirm existing users
-- Uncomment and run this to confirm all users
-- =============================================
-- UPDATE auth.users SET email_confirmed_at = NOW(), confirmed_at = NOW() WHERE email_confirmed_at IS NULL;
