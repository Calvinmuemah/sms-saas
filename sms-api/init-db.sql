-- Database initialization script for SMS SaaS

-- 1. system_users (Dashboard users)
CREATE TABLE IF NOT EXISTS system_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    otp VARCHAR(10),
    otp_expiry TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. contacts (SMS subscribers)
CREATE TABLE IF NOT EXISTS contacts (
    phone VARCHAR(50) PRIMARY KEY,
    opted_in BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. recipient_groups (Contact Lists / Groups)
CREATE TABLE IF NOT EXISTS recipient_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    numbers TEXT, -- Comma-separated list of numbers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. api_keys (Developer API keys)
CREATE TABLE IF NOT EXISTS api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) DEFAULT 'Default Project',
    key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. campaigns (SMS Campaigns)
CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    recipient VARCHAR(255),
    recipients INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. scheduled (Scheduled campaigns)
CREATE TABLE IF NOT EXISTS scheduled (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    scheduled_at TIMESTAMP NOT NULL,
    recipients TEXT, -- Stringified JSON or comma-separated list
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. messages (Single sent message logs)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    cost NUMERIC(10, 4),
    message_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
