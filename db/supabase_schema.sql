-- Supabase SQL schema for landing page CMS content

-- Table for Hero / Homepage Content
CREATE TABLE hero_content (
  id SERIAL PRIMARY KEY,
  welcome_title TEXT NOT NULL,
  welcome_subtitle TEXT NOT NULL,
  mission_title TEXT NOT NULL,
  mission_text TEXT NOT NULL,
  vision_title TEXT NOT NULL,
  vision_text TEXT NOT NULL,
  main_image_url TEXT NOT NULL,
  main_image_alt TEXT NOT NULL,
  main_image_ai_hint TEXT
);

-- Table for Services
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  industry TEXT,
  service_type TEXT,
  short_description TEXT,
  long_description TEXT,
  image TEXT,
  ai_hint TEXT,
  has_demo BOOLEAN DEFAULT FALSE
);

-- Table for Service Features (one-to-many)
CREATE TABLE service_features (
  id SERIAL PRIMARY KEY,
  service_id TEXT REFERENCES services(id) ON DELETE CASCADE,
  feature TEXT NOT NULL
);

-- Table for company size compatibility (many-to-many)
CREATE TABLE service_company_sizes (
  id SERIAL PRIMARY KEY,
  service_id TEXT REFERENCES services(id) ON DELETE CASCADE,
  company_size TEXT NOT NULL
);

-- Table for Success Stories
CREATE TABLE success_stories (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  industry TEXT,
  challenge TEXT,
  solution TEXT,
  pdf_url TEXT,
  image TEXT,
  ai_hint TEXT
);

-- Table for Success Story Impact Metrics (one-to-many)
CREATE TABLE success_story_impacts (
  id SERIAL PRIMARY KEY,
  success_story_id TEXT REFERENCES success_stories(id) ON DELETE CASCADE,
  metric TEXT NOT NULL,
  value TEXT NOT NULL,
  before_value TEXT,
  after_value TEXT
);

-- Table for Success Story Technologies (one-to-many)
CREATE TABLE success_story_technologies (
  id SERIAL PRIMARY KEY,
  success_story_id TEXT REFERENCES success_stories(id) ON DELETE CASCADE,
  technology TEXT NOT NULL
);

-- Table for Testimonials (linked to success stories)
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  success_story_id TEXT REFERENCES success_stories(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  video_url TEXT
);

-- Table for Plans
CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT,
  featured BOOLEAN DEFAULT FALSE
);

-- Table for Plan Features (one-to-many)
CREATE TABLE plan_features (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  feature TEXT NOT NULL
);

-- Table for Resources
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  subcategory TEXT,
  type TEXT,
  download_url TEXT,
  is_gated BOOLEAN DEFAULT FALSE,
  image TEXT,
  ai_hint TEXT
);

-- Header Content Table
CREATE TABLE IF NOT EXISTS header_content (
  id TEXT PRIMARY KEY,
  logo_url TEXT,
  menu_links JSONB, -- [{"name": "Inicio", "url": "/"}, ...]
  quick_links JSONB -- [{"name": "Contacto", "url": "/contact"}, ...]
);

-- Footer Content Table
CREATE TABLE IF NOT EXISTS footer_content (
  id TEXT PRIMARY KEY,
  company_name TEXT,
  address TEXT,
  email TEXT,
  phone TEXT,
  social_links JSONB, -- [{"name": "Twitter", "url": "..."}, ...]
  legal_links JSONB   -- [{"name": "Aviso Legal", "url": "..."}, ...]
);

-- Page Visits Analytics Table
CREATE TABLE IF NOT EXISTS page_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT, -- Ejemplo: 'home', 'services', 'success_cases', etc.
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);
