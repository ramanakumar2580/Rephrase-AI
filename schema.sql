-- Drop old tables if they exist to ensure a clean start
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS pdf_summaries;
DROP TABLE IF EXISTS users;

-- Enable UUID extension for other tables if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Corrected Users Table
CREATE TABLE users (
    id TEXT PRIMARY KEY, -- Changed to TEXT to store Clerk User ID
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Stripe Columns
    stripe_customer_id       VARCHAR(255) UNIQUE,
    stripe_subscription_id   VARCHAR(255) UNIQUE,
    stripe_price_id          VARCHAR(255),
    stripe_current_period_end TIMESTAMP WITH TIME ZONE
);

-- Corrected PDF Summaries Table
CREATE TABLE pdf_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES users(id), -- Connects to the new TEXT user ID
    original_file_url TEXT NOT NULL,
    summary_text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    title TEXT,
    file_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger function and triggers remain the same, just ensure they are applied
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
    BEFORE UPDATE ON pdf_summaries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();