-- Create referral_codes table IF it doesn't exist
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent "policy already exists" errors when running multiple times
DROP POLICY IF EXISTS "Anyone can view referral codes" ON public.referral_codes;
DROP POLICY IF EXISTS "Authenticated users can insert referral codes" ON public.referral_codes;
DROP POLICY IF EXISTS "Users can update referral codes" ON public.referral_codes;

-- Create RLS Policies
-- We need public access to read so the signup form can validate before the user authenticates
CREATE POLICY "Anyone can view referral codes" ON public.referral_codes FOR SELECT USING (true);

-- Allow authenticated users to insert codes (Admin UI handles restricting access)
CREATE POLICY "Authenticated users can insert referral codes" ON public.referral_codes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- We don't necessarily need update policies unless admin wants to disable codes, but for now we'll stick to insert/select.
