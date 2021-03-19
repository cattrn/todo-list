INSERT INTO users(firstname, lastname, email, password, is_active)
VALUES 
('Elon', 'Musk', 'elon.musk@tesla.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Harry', 'Potter', 'harry.potter@gmail.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Anna', 'Karenina', 'anna.karenina@gmail.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Scarlett', 'Ohara', 'scarlett.ohara@gmail.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true),
('Elza', 'Oldenburg', 'elsa@frozen.com', crypt('Gunsmoke&Lav1', gen_salt('bf')), true);