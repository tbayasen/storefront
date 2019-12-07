DROP DATABASE IF EXISTS pokémon_shop;

CREATE DATABASE pokémon_shop;

USE pokémon_shop;

CREATE TABLE pokémon_list(
  poké_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  pokémon_name VARCHAR(100),
  pokémon_type VARCHAR(100),
  price VARCHAR(100),
  store_quantity INT,
  PRIMARY KEY (poké_id)
);

INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Bulbasaur", "Grass", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Pikachu", "Electric", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Torchic", "Fire", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Charmander", "Fire", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Eevee", "Normal", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Geodude", "Rock", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Squirtle", "Water", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Rattata", "Normal", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Diglett", "Ground", 2500, 100);
INSERT INTO pokémon_list (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Magikarp", "Water", 2500, 100);