CREATE TABLE lesson_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_name VARCHAR(255) NOT NULL
);

INSERT INTO lesson_list (lesson_name) VALUES
('Türkçe'),
('Matematik'),
('Fen'),
('Tarih'),
('İngilizce'),
('Din');