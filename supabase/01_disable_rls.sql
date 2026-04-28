-- PROFILES table — disable RLS (Firebase handles auth at app level)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- ASSESSMENTS table — disable RLS
ALTER TABLE assessments DISABLE ROW LEVEL SECURITY;
