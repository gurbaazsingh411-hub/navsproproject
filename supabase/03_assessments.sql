-- Create assessments table IF it doesn't exist
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  answers jsonb default '{}'::jsonb,
  current_question_index integer default 0,
  is_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent "policy already exists" errors when running multiple times
DROP POLICY IF EXISTS "Users can view their own assessment" ON public.assessments;
DROP POLICY IF EXISTS "Users can insert their own assessment" ON public.assessments;
DROP POLICY IF EXISTS "Users can update their own assessment" ON public.assessments;

-- Create RLS Policies
CREATE POLICY "Users can view their own assessment"
  ON public.assessments FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own assessment"
  ON public.assessments FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own assessment"
  ON public.assessments FOR UPDATE
  USING ( auth.uid() = user_id );
