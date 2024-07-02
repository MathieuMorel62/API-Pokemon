CREATE TABLE `pokemons` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
    `type` varchar(50) DEFAULT NULL,
    `height` int DEFAULT NULL,
    `weight` int DEFAULT NULL,
    `image_url` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
