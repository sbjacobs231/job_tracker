DROP DATABASE IF EXISTS job_tracker;
CREATE DATABASE job_tracker;
USE job_tracker;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username),
    PRIMARY KEY (id)
);
CREATE TABLE job (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NULL,
    location VARCHAR(255) NOT NULL,
    apply_date DATE NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE status (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE progress (
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE skill (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE contact (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE job_status (
    id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL, 
    status_id INT NOT NULL, 
    FOREIGN KEY (job_id) REFERENCES job(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
    PRIMARY KEY (id)
);
CREATE TABLE job_progress (
    id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL, 
    progress_id INT NOT NULL, 
    FOREIGN KEY (job_id) REFERENCES job(id),
    FOREIGN KEY (progress_id) REFERENCES progress(id),
    PRIMARY KEY (id)
);
CREATE TABLE job_skill (
    id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL, 
    skill_id INT NOT NULL, 
    FOREIGN KEY (job_id) REFERENCES job(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id),
    PRIMARY KEY (id)
);
CREATE TABLE job_contact (
    id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL, 
    contact_id INT NOT NULL, 
    FOREIGN KEY (job_id) REFERENCES job(id),
    FOREIGN KEY (contact_id) REFERENCES contact(id),
    PRIMARY KEY (id)
);
CREATE TABLE user_job (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    job_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (job_id) REFERENCES job(id),
    PRIMARY KEY (id)
);
INSERT INTO `status` (
    `name`
) VALUES (
    'Applied'
), (
    'Interview Scheduled'
), (
    'Interviewed'
), (
    'Offer Extended'
), (
    'Offer Accepted'
), (
    'Offer Declined'
), (
    'Rejected'
), (
    'Interested'
);

INSERT INTO user (
    first_name,
    last_name,
    username,
    password
) VALUES (
    'Test',
    'User',
    'testuser',
    'password'
);