CREATE TABLE Users
(
    name varchar(50) NOT NULL,
    username varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    address json,
    phone varchar(50) NOT NULL,
    website varchar(50),
    company json,
    id SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE Todos
(
	id SERIAL NOT NULL PRIMARY KEY,
	user_Id  INTEGER REFERENCES users (id),
	title varchar(100) NOT NULL,
	completed boolean
);

CREATE TABLE Albums
(
	id SERIAL NOT NULL PRIMARY KEY,
	user_Id  INTEGER REFERENCES users (id),
	title varchar(200) NOT NULL
);

CREATE TABLE Photos
(
	id SERIAL NOT NULL PRIMARY KEY,
	album_id INTEGER REFERENCES Albums (id),
	title varchar(100) NOT NULL,
	url varchar(100) NOT NULL,
	thumbnailUrl varchar(100) NOT NULL
);

CREATE TABLE Posts
(
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INTEGER REFERENCES users (id),
	title varchar(100) NOT NULL,
    body varchar(500) NOT NULL
);

CREATE TABLE Comments
(
	id SERIAL NOT NULL PRIMARY KEY,
	posts_id INTEGER REFERENCES posts (id),
	name varchar(100) NOT NULL,
    body varchar(500) NOT NULL,
    email varchar(50) NOT NULL
);