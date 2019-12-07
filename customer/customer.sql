DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE pokémon_shop(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  pokémon_name VARCHAR(100),
  pokémon_type VARCHAR(100),
  price VARCHAR(100),
  store_quantity INT,
  PRIMARY KEY (id)
);

INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Bulbasaur", "Grass", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Pikachu", "Electric", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Torchic", "Fire", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Charmander", "Fire", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Eevee", "Normal", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Geodude", "Rock", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Squirtle", "Water", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Rattata", "Normal", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Diglett", "Ground", 2500, 100);
INSERT INTO pokémon_shop (pokémon_name, pokémon_type, price, store_quantity)
VALUES ("Magikarp", "Water", 2500, 100);