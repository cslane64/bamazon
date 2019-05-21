CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(10) auto_increment NOT NULL,
    product_name VARCHAR(150),
    department_name VARCHAR (100),
    price DECIMAL(13,2),
    stock_quantity INT(6),
    PRIMARY KEY(item_id)
)