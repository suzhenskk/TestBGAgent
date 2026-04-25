-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'parent',
  created_at TIMESTAMP DEFAULT now()
);

-- Children Table
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  age INTEGER,
  level VARCHAR(50) DEFAULT 'beginner',
  created_at TIMESTAMP DEFAULT now()
);

-- Progress Table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id),
  content_id UUID REFERENCES content(id),
  module_type VARCHAR(50) NOT NULL,
  completion_percentage INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT now()
);

-- Achievements Table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  earned_at TIMESTAMP DEFAULT now()
);

-- Content Table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_type VARCHAR(50) NOT NULL,
  difficulty_level INTEGER DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  content_json JSONB,
  media_url VARCHAR(500)
);

-- Insert sample data
INSERT INTO content (module_type, difficulty_level, title, content_json)
VALUES 
  ('vocabulary', 1, 'Animals', '{"words": [{"word": "cat", "image": "cat.png", "audio": "cat.mp3"}, {"word": "dog", "image": "dog.png", "audio": "dog.mp3"}]}'),
  ('phonics', 1, 'Letter A', '{"sounds": [{"letter": "A", "sound": "a", "words": ["apple", "ant"]}]}'),
  ('grammar', 1, 'Basic Greetings', '{"exercises": [{"question": "Hello ____ name is", "answer": "my"}]}'),
  ('reading', 1, 'The Cat and the Mouse', '{"text": "Once upon a time, there was a cat and a mouse...", "audio": "story1.mp3"}');

-- Grant permissions
GRANT SELECT ON users, children, progress, achievements, content TO anon;
GRANT ALL PRIVILEGES ON users, children, progress, achievements, content TO authenticated;