-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.37 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for book_management_api
CREATE DATABASE IF NOT EXISTS `book_management_api` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `book_management_api`;

-- Dumping structure for table book_management_api.address
CREATE TABLE IF NOT EXISTS `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street_address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.address: ~1 rows (approximately)
INSERT INTO `address` (`id`, `street_address`, `city`, `province`, `postal_code`, `created_at`, `updated_at`) VALUES
	(1, '1230 Avenue of the Americas', 'New York', 'NY', '10020', '2025-09-04 08:23:42', '2025-09-04 08:23:42'),
	(12, '120 Broadway', 'New York', 'NY', '10271', '2025-09-04 16:55:45', '2025-09-04 16:55:45');

-- Dumping structure for table book_management_api.authors
CREATE TABLE IF NOT EXISTS `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `biography` text,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nationality_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Authors_nationality1_idx` (`nationality_id`),
  CONSTRAINT `fk_Authors_nationality1` FOREIGN KEY (`nationality_id`) REFERENCES `nationality` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.authors: ~1 rows (approximately)
INSERT INTO `authors` (`id`, `first_name`, `last_name`, `biography`, `birth_date`, `created_at`, `updated_at`, `nationality_id`) VALUES
	(1, 'Bram', 'Stoker', 'Abraham Stoker, better known by his pen name Bram Stoker, was an Irish theatre manager and novelist. He is best known as the author of Dracula, an epistolary Gothic horror novel widely considered a landmark in vampire', '1847-11-08', '2025-09-04 08:21:14', '2025-09-04 08:21:14', 1),
	(3, 'Stephen', 'King', 'Stephen Edwin King is an American author. Dubbed the King of Horror, he is widely known for his horror novels and has also explored other genres, among them suspense, crime, science-fiction, fantasy, and mystery.', '1978-08-21', '2025-09-04 14:53:21', '2025-09-04 14:53:21', 1);

-- Dumping structure for table book_management_api.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(17) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `description` text,
  `page_count` int DEFAULT NULL,
  `cover_path` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Authors_id` int NOT NULL,
  `publishers_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn_UNIQUE` (`isbn`),
  KEY `fk_books_Authors1_idx` (`Authors_id`),
  KEY `fk_books_publishers1_idx` (`publishers_id`),
  CONSTRAINT `fk_books_Authors1` FOREIGN KEY (`Authors_id`) REFERENCES `authors` (`id`),
  CONSTRAINT `fk_books_publishers1` FOREIGN KEY (`publishers_id`) REFERENCES `publishers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.books: ~2 rows (approximately)
INSERT INTO `books` (`id`, `title`, `isbn`, `publication_date`, `description`, `page_count`, `cover_path`, `created_at`, `updated_at`, `Authors_id`, `publishers_id`) VALUES
	(1, 'Dracula', '9781794030046', '1897-05-26', 'Dracula is an 1897 Gothic horror novel by Irish author Bram Stoker. The narrative is related through letters, diary entries, and newspaper articles.', 432, NULL, '2025-09-04 08:27:56', '2025-09-04 08:58:07', 1, 1),
	(2, 'Dracula\'s Guest', '9781427046482', '1972-09-04', '"Dracula\'s Guest" is a short story by Bram Stoker, first published in the short story collection Dracula\'s Guest and Other Weird Stories. Scholars are divided on whether the story is the excised first chapter of the novel Dracula', 192, 'uploads\\book-covers\\book_1757026379848.jpg', '2025-09-04 08:57:59', '2025-09-04 22:52:59', 1, 1);

-- Dumping structure for table book_management_api.books_has_categorys
CREATE TABLE IF NOT EXISTS `books_has_categorys` (
  `books_id` int NOT NULL,
  `categorys_id` int NOT NULL,
  PRIMARY KEY (`books_id`,`categorys_id`),
  KEY `fk_books_has_categorys_categorys1_idx` (`categorys_id`),
  KEY `fk_books_has_categorys_books1_idx` (`books_id`),
  CONSTRAINT `fk_books_has_categorys_books1` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`),
  CONSTRAINT `fk_books_has_categorys_categorys1` FOREIGN KEY (`categorys_id`) REFERENCES `categorys` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.books_has_categorys: ~2 rows (approximately)
INSERT INTO `books_has_categorys` (`books_id`, `categorys_id`) VALUES
	(1, 5),
	(1, 6),
	(2, 6);

-- Dumping structure for table book_management_api.categorys
CREATE TABLE IF NOT EXISTS `categorys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.categorys: ~2 rows (approximately)
INSERT INTO `categorys` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
	(5, 'Science fiction', 'Science fiction is the genre of speculative fiction that imagines advanced and futuristic scientific progress ', '2025-09-04 08:17:24', '2025-09-04 08:17:24'),
	(6, 'Horror', 'Horror is a genre of speculative fiction that is intended to disturb, frighten, or scare an audience.', '2025-09-04 08:17:44', '2025-09-04 08:17:44');

-- Dumping structure for table book_management_api.nationality
CREATE TABLE IF NOT EXISTS `nationality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nationality_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.nationality: ~1 rows (approximately)
INSERT INTO `nationality` (`id`, `nationality_name`) VALUES
	(1, 'Irish');

-- Dumping structure for table book_management_api.publishers
CREATE TABLE IF NOT EXISTS `publishers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `established_year` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_publishers_address1_idx` (`address_id`),
  CONSTRAINT `fk_publishers_address1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.publishers: ~1 rows (approximately)
INSERT INTO `publishers` (`id`, `name`, `contact_email`, `established_year`, `created_at`, `updated_at`, `address_id`) VALUES
	(1, 'simon & schuster', 'simon.schuster.email.com', 1924, '2025-09-04 08:24:48', '2025-09-04 08:24:48', 1);

-- Dumping structure for table book_management_api.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` tinyint NOT NULL,
  `comment` text,
  `review_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `books_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reviews_books1_idx` (`books_id`),
  KEY `fk_reviews_users1_idx` (`users_id`),
  CONSTRAINT `fk_reviews_books1` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`),
  CONSTRAINT `fk_reviews_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.reviews: ~0 rows (approximately)
INSERT INTO `reviews` (`id`, `rating`, `comment`, `review_date`, `created_at`, `updated_at`, `books_id`, `users_id`) VALUES
	(1, 5, 'test comment', '2025-09-05', '2025-09-04 20:46:31', '2025-09-04 20:46:31', 1, 1),
	(3, 5, 'test review comment', '2025-09-05', '2025-09-04 22:32:54', '2025-09-04 22:32:54', 2, 2),
	(4, 5, 'test review comment', '2025-09-05', '2025-09-04 22:36:15', '2025-09-04 22:36:15', 2, 2);

-- Dumping structure for table book_management_api.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `registration_date` date NOT NULL,
  `user_role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_user_role_idx` (`user_role_id`),
  CONSTRAINT `fk_users_user_role` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password_hash`, `full_name`, `registration_date`, `user_role_id`) VALUES
	(1, 'kv', '123', 'kavindu kodikara', '2025-09-05', 1),
	(2, 'pn18', '$2b$12$O3drT5YK7m7nGbkj4KX7r.JiaYpc/R7Qrl1u8waZcdcOUrlMvpBja', 'Pathum Nissanka', '2025-09-05', 1);

-- Dumping structure for table book_management_api.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_role_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table book_management_api.user_role: ~0 rows (approximately)
INSERT INTO `user_role` (`id`, `user_role_name`) VALUES
	(1, 'User'),
	(2, 'Admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
