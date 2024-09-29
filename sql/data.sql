PRAGMA foreign_keys = ON;

INSERT INTO users (username, fullname, email, password) VALUES
('sharas', 'Sharanya', 'sharas@umich.edu', 'sha512$34e94a05cdf247db92a84bc590950336$7eaca2b4169e042120f015666115856c717343f1c75d1c1bd1bf469bd1cd439eb152ccda6a0b8703706dfbcb861b3cef9208325c31f436e8edb9563f01176c48'),
('kayleyg', 'Kayley', 'kayleyg@umich.edu', 'sha512$34e94a05cdf247db92a84bc590950336$7eaca2b4169e042120f015666115856c717343f1c75d1c1bd1bf469bd1cd439eb152ccda6a0b8703706dfbcb861b3cef9208325c31f436e8edb9563f01176c48');
('bdone', 'Bianca', 'bdone@umich.edu', 'sha512$34e94a05cdf247db92a84bc590950336$7eaca2b4169e042120f015666115856c717343f1c75d1c1bd1bf469bd1cd439eb152ccda6a0b8703706dfbcb861b3cef9208325c31f436e8edb9563f01176c48')
('lalekhya', 'Alekhya', 'lalekhya@umich.edu', 'sha512$34e94a05cdf247db92a84bc590950336$7eaca2b4169e042120f015666115856c717343f1c75d1c1bd1bf469bd1cd439eb152ccda6a0b8703706dfbcb861b3cef9208325c31f436e8edb9563f01176c48')

INSERT INTO friends (username1, username2) VALUES
('sharas', 'kayleyg');
