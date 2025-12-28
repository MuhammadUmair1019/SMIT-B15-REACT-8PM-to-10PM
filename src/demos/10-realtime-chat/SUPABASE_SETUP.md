# Supabase Setup for Real-time Chat App

This document explains how to set up the Supabase database tables and policies for the real-time chat application.

## 📋 Required Tables

### 1. Profiles Table

Create a `profiles` table to store user profile information:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### 2. Messages Table

Create a `messages` table to store chat messages:

```sql
-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  room TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  edited BOOLEAN DEFAULT FALSE
);

-- Create index for faster queries
CREATE INDEX idx_messages_room_created ON messages(room, created_at);
CREATE INDEX idx_messages_user_id ON messages(user_id);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all messages
CREATE POLICY "Users can view all messages"
  ON messages FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert messages
CREATE POLICY "Authenticated users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can update their own messages
CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own messages
CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  USING (auth.uid() = user_id);
```

## 🔄 Real-time Subscriptions

The app uses Supabase real-time features. Make sure real-time is enabled:

1. Go to your Supabase project dashboard
2. Navigate to **Database** → **Replication**
3. Enable replication for:
   - `messages` table (INSERT, UPDATE, DELETE)
   - `profiles` table (if you want real-time profile updates)

## 👥 Presence (Online Users)

The app uses Supabase Presence for tracking online users. This is automatically handled by the Supabase client and doesn't require additional database setup.

## 🚀 Quick Setup Script

Run this complete setup script in your Supabase SQL Editor:

```sql
-- ============================================
-- SUPABASE CHAT APP SETUP
-- ============================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  room TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  edited BOOLEAN DEFAULT FALSE
);

-- 3. Create indexes
CREATE INDEX IF NOT EXISTS idx_messages_room_created ON messages(room, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);

-- 4. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 5. Profiles Policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 6. Messages Policies
DROP POLICY IF EXISTS "Users can view all messages" ON messages;
CREATE POLICY "Users can view all messages"
  ON messages FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert messages" ON messages;
CREATE POLICY "Authenticated users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update own messages" ON messages;
CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own messages" ON messages;
CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  USING (auth.uid() = user_id);

-- 7. Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## ✅ Verification

After running the setup:

1. **Check Tables**: Verify both `profiles` and `messages` tables exist
2. **Check Policies**: Go to **Authentication** → **Policies** and verify all policies are created
3. **Enable Replication**: Go to **Database** → **Replication** and enable for `messages` table
4. **Test**: Create a test user and send a message to verify everything works

## 🎯 Features Enabled

- ✅ Real-time message updates
- ✅ Online user presence
- ✅ Message history
- ✅ User profiles
- ✅ Room-based chat
- ✅ Message editing (users can edit their own)
- ✅ Message deletion (users can delete their own)

## 📝 Notes

- The `room` field defaults to 'general' but supports multiple rooms
- Messages are automatically deleted when a user is deleted (CASCADE)
- Profiles are automatically created when a user signs up (trigger)
- All queries are optimized with indexes for performance

