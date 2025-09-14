CREATE TABLE IF NOT EXISTS `role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `type_payment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(90) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role_id` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `FinanceRecords` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) NOT NULL,
  `concept` varchar(100) DEFAULT NULL,
  `type_amount` enum('income','expense') NOT NULL,
  `user_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `type_payment_id` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  KEY `type_payment_id` (`type_payment_id`),
  CONSTRAINT `FinanceRecords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FinanceRecords_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FinanceRecords_ibfk_3` FOREIGN KEY (`type_payment_id`) REFERENCES `type_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `role`
(name, createdAt, updatedAt)
VALUES('adiministrator', '2024-12-29 19:03:41', '2024-12-29 19:03:41');
INSERT INTO `role`
(name, createdAt, updatedAt)
VALUES('manager', '2024-12-29 19:03:41', '2024-12-29 19:03:41');
INSERT INTO `role`
(name, createdAt, updatedAt)
VALUES('user', '2024-12-29 19:03:41', '2024-12-29 19:03:41');

INSERT INTO type_payment
(name, createdAt, updatedAt)
VALUES('Debit Card', '2024-12-30 02:13:48', '2024-12-30 02:13:48');
INSERT INTO type_payment
(name, createdAt, updatedAt)
VALUES('Credit Card', '2024-12-30 02:13:54', '2024-12-30 02:13:54');
INSERT INTO type_payment
(name, createdAt, updatedAt)
VALUES('Cash payment', '2024-12-30 02:14:11', '2024-12-30 02:14:11');

INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Food', '2024-12-30 02:29:03', '2024-12-30 02:29:03');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Food outside the home', '2024-12-30 02:29:30', '2024-12-30 02:29:30');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Water', '2024-12-30 02:29:36', '2024-12-30 02:29:36');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Electricity', '2024-12-30 02:29:42', '2024-12-30 02:29:42');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Gas', '2024-12-30 02:29:46', '2024-12-30 02:29:46');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Clothes', '2024-12-30 02:29:50', '2024-12-30 02:29:50');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Internet', '2024-12-30 02:29:55', '2024-12-30 02:29:55');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Household cleaning supplies', '2024-12-30 02:30:03', '2024-12-30 02:30:03');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Dentist', '2024-12-30 02:30:12', '2024-12-30 02:30:12');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Medicine', '2024-12-30 02:30:17', '2024-12-30 02:30:17');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Online courses', '2024-12-30 02:30:23', '2024-12-30 02:30:23');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Gasoline', '2024-12-30 02:30:32', '2024-12-30 02:30:32');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Uber', '2024-12-30 02:30:36', '2024-12-30 02:30:36');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Taxi', '2024-12-30 02:30:40', '2024-12-30 02:30:40');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Taxes', '2024-12-30 02:30:45', '2024-12-30 02:30:45');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Vehicle maintenance', '2024-12-30 02:30:49', '2024-12-30 02:30:49');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Public transportation', '2024-12-30 02:30:57', '2024-12-30 02:30:57');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Minutes and internet', '2024-12-30 02:31:25', '2024-12-30 02:31:25');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Alcoholic beverages', '2024-12-30 02:31:35', '2024-12-30 02:31:35');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Gifts', '2024-12-30 02:31:41', '2024-12-30 02:31:41');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Pets', '2024-12-30 02:31:45', '2024-12-30 02:31:45');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Daily', '2024-12-30 02:31:49', '2024-12-30 02:31:49');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Monthly expense', '2024-12-30 02:31:55', '2024-12-30 02:31:55');
INSERT INTO category
(name, createdAt, updatedAt)
VALUES('Others', '2024-12-30 02:32:00', '2024-12-30 02:32:00');

INSERT INTO `user`
(first_name, last_name, username, password, role_id, createdAt, updatedAt)
VALUES('volt', 'velter', 'admin', '$2a$10$r0Y9G3x3h3QWCM6tzn1qEeZNmfNYDirjz3Wf.GIIUKlREKkIBg796', 1, '2025-01-25 05:55:20', '2025-01-25 05:55:20');
INSERT INTO `user`
(first_name, last_name, username, password, role_id, createdAt, updatedAt)
VALUES('victus', 'garlic', 'manager', '$2a$10$8Qxh0T6kPw6VZyOGv33X.OxDOvvIZxRhR0ok9tFLSI.6d/I/1Co1q', 2, '2025-02-22 21:49:38', '2025-02-22 21:49:38');