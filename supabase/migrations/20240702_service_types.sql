-- Create service_types table
CREATE TABLE IF NOT EXISTS service_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Create service_subtypes table
CREATE TABLE IF NOT EXISTS service_subtypes (
  id SERIAL PRIMARY KEY,
  service_type_id INTEGER NOT NULL REFERENCES service_types(id),
  name TEXT NOT NULL,
  description TEXT
);

-- Insert service types
INSERT INTO service_types (name, description) VALUES
('Clinical & Therapeutic Services', 'Professional clinical and therapeutic mental health services'),
('Crisis & Urgent Support', 'Emergency and immediate support services'),
('Peer & Community Support', 'Community-based peer support services'),
('Neurodivergence & Learning Support', 'Services for neurodivergent individuals'),
('Wellness & Preventative Care', 'Preventative and wellness-focused services'),
('Practical & Social Support', 'Practical assistance and social support services');

-- Insert service subtypes
-- Clinical & Therapeutic Services subtypes
INSERT INTO service_subtypes (service_type_id, name) VALUES
(1, 'Therapy & Counselling'),
(1, 'Cognitive Behavioural Therapy (CBT)'),
(1, 'Dialectical Behaviour Therapy (DBT)'),
(1, 'EMDR (Eye Movement Desensitisation)'),
(1, 'Psychodynamic Therapy'),
(1, 'Couples/Family Therapy'),
(1, 'Online Counselling'),
(1, 'Psychiatry & Mental Health Assessment'),
(1, 'Diagnosis & Medication Management'),
(1, 'Private Psychiatric Consultations'),
(1, 'ADHD / Autism Assessments'),
(1, 'Eating Disorder Support'),
(1, 'ED Clinics'),
(1, 'Body Image Therapy'),
(1, 'Family Support for ED');

-- Crisis & Urgent Support subtypes
INSERT INTO service_subtypes (service_type_id, name) VALUES
(2, 'Crisis Support'),
(2, 'Suicide Prevention Helplines'),
(2, 'Crisis Cafés / Drop-In Centres'),
(2, 'Emergency Mental Health Services'),
(2, 'Safe Spaces for Immediate Help'),
(2, 'Domestic Abuse & Violence Services'),
(2, 'Refuges / Shelters'),
(2, 'Emergency Housing'),
(2, 'Advocacy & Legal Support');

-- Peer & Community Support subtypes
INSERT INTO service_subtypes (service_type_id, name) VALUES
(3, 'Peer Support Groups'),
(3, 'Mental Health Peer Circles'),
(3, 'Men''s / Women''s Support Groups'),
(3, 'LGBTQ+ Peer Support'),
(3, 'Addiction & Recovery Support'),
(3, '12-Step Programs (AA, NA, GA)'),
(3, 'Sober Living Programs'),
(3, 'Harm Reduction Services'),
(3, 'Youth & Family Services'),
(3, 'CAMHS / Youth Mental Health'),
(3, 'Parent Support Groups'),
(3, 'School Counselling Services');

-- Neurodivergence & Learning Support subtypes
INSERT INTO service_subtypes (service_type_id, name) VALUES
(4, 'Neurodiversity Services'),
(4, 'Autism Support & Coaching'),
(4, 'ADHD Coaching / Mentoring'),
(4, 'Social Skills Groups'),
(4, 'Sensory Support'),
(4, 'Learning & Development Support'),
(4, 'Dyslexia / Dyspraxia Support'),
(4, 'SEN Education Services'),
(4, 'Occupational Therapy');

-- Wellness & Preventative Care subtypes
INSERT INTO service_subtypes (service_type_id, name) VALUES
(5, 'Mindfulness & Meditation'),
(5, 'Mindfulness Classes'),
(5, 'Guided Meditation Groups'),
(5, 'Online Courses & Apps'),
(5, 'Holistic Therapies'),
(5, 'Art / Music / Drama Therapy'),
(5, 'Somatic Therapy'),
(5, 'Ecotherapy / Nature-Based'),
(5, 'Reiki / Energy Healing'),
(5, 'Life Coaching & Personal Development'),
(5, 'Life Purpose Coaching'),
(5, 'Career / Confidence Coaching'),
(5, 'Spiritual or Inner Work Coaching');

-- Practical & Social Support subtypes
INSERT INTO service_subtypes (service_type_id, name) VALUES
(6, 'Housing & Social Services'),
(6, 'Supported Accommodation'),
(6, 'Social Workers'),
(6, 'Financial / Legal Advocacy'),
(6, 'Employment & Education Support'),
(6, 'Back-to-Work Programs'),
(6, 'Vocational Rehabilitation'),
(6, 'Mental Health at Work Advisors'),
(6, 'Digital & Online Resources'),
(6, 'Guided Programs'),
(6, 'Community Forums'),
(6, 'Self-help Libraries');

-- Enable realtime for the new tables
alter publication supabase_realtime add table service_types;
alter publication supabase_realtime add table service_subtypes;
