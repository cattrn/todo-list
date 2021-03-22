INSERT INTO users(email, password, is_active)
VALUES 
('elon.musk@tesla.com', crypt('Hello1', gen_salt('bf')), true),
('harry.potter@gmail.com', crypt('Hello1', gen_salt('bf')), true),
('anna.karenina@gmail.com', crypt('Hello1', gen_salt('bf')), true),
('scarlett.ohara@gmail.com', crypt('Hello1', gen_salt('bf')), true),
('elsa@frozen.com', crypt('Hello1', gen_salt('bf')), true);