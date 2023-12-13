DROP TABLE IF EXISTS user_scores;

CREATE TABLE user_scores (
  `user` CHAR(3) NOT NULL,
  `score` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`));

INSERT INTO user_scores (user, score) VALUES ("BOB", "1234");
INSERT INTO user_scores (user, score) VALUES ("ALC", "29989");
INSERT INTO user_scores (user, score) VALUES ("JRD", "1994");
INSERT INTO user_scores (user, score) VALUES ("CRL", "202");
INSERT INTO user_scores (user, score) VALUES ("DRW", "0");
INSERT INTO user_scores (user, score) VALUES ("ERL", "99999");
INSERT INTO user_scores (user, score) VALUES ("FOG", "12389");
INSERT INTO user_scores (user, score) VALUES ("GOG", "1246");
INSERT INTO user_scores (user, score) VALUES ("HII", "15609");
INSERT INTO user_scores (user, score) VALUES ("ILL", "12");

INSERT INTO user_scores (user, score) VALUES ("ABC", "12234");
INSERT INTO user_scores (user, score) VALUES ("BCD", "3999");
INSERT INTO user_scores (user, score) VALUES ("CDE", "1995");
INSERT INTO user_scores (user, score) VALUES ("DEF", "2000");
INSERT INTO user_scores (user, score) VALUES ("EFG", "400");
INSERT INTO user_scores (user, score) VALUES ("FGH", "23232");
INSERT INTO user_scores (user, score) VALUES ("GHI", "1238");
INSERT INTO user_scores (user, score) VALUES ("HIJ", "1256");
INSERT INTO user_scores (user, score) VALUES ("IJK", "1560");
INSERT INTO user_scores (user, score) VALUES ("JKL", "1200");

INSERT INTO user_scores (user, score) VALUES ("CRL", "1234");
INSERT INTO user_scores (user, score) VALUES ("JOE", "3899");
INSERT INTO user_scores (user, score) VALUES ("JHN", "13695");
INSERT INTO user_scores (user, score) VALUES ("MAR", "2003");
INSERT INTO user_scores (user, score) VALUES ("LIS", "4010");
INSERT INTO user_scores (user, score) VALUES ("TRY", "23232");
INSERT INTO user_scores (user, score) VALUES ("POP", "1239");
INSERT INTO user_scores (user, score) VALUES ("GOP", "12586");
INSERT INTO user_scores (user, score) VALUES ("BOP", "1565");
INSERT INTO user_scores (user, score) VALUES ("HOP", "12000");