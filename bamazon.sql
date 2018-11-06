DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(150) NOT NULL,
department_name VARCHAR(40) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
product_sales DECIMAL (10,2)DEFAULT 0,
PRIMARY KEY(item_id)
);

CREATE TABLE departments(
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100),
over_head_costs DECIMAL (10,2),
PRIMARY KEY (department_id)
);

INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Harry Potter Series", "Books", 120, 50);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Fire TV Stick", "Electronics", 39.99, 100);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Microsoft Office Home & Student 2019", "Software", 120, 50);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Pampers", "Baby", 15.89, 70);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Manhattan Toy Lanky Cats Ziggy", "Toys", 11.29, 1);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Greenworks 20-Inch 12 Amp Corded Lawn Mower", "Garden & Outdoor", 180.63, 30);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Nordic Ware Haunted Skull Cakelet Pan", "Home & Kitchen", 27.63, 110);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("AmazonBasics Rubber Encased Hex Dumbbell", "Sports", 29.99, 35);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("Kenmore 70719 Compact Countertop Microwave", "Appliances", 73.91, 5);
INSERT INTO products(product_name, department_name,price, stock_quantity) VALUES("L'Oréal Paris Colour Riche Lipstick", "Beauty & Personal Care", 5.99, 3);

SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales, product_sales-over_head_costs as total_profit
FROM departments
INNER JOIN products on products.department_name = departments.department_name;

INSERT INTO departments (department_name) SELECT department_name FROM products;


UPDATE departments SET over_head_costs = 170 WHERE department_id = 1;
UPDATE departments SET over_head_costs = 90 WHERE department_id = 2;
UPDATE departments SET over_head_costs = 200 WHERE department_id = 3;
UPDATE departments SET over_head_costs = 200 WHERE department_id = 4;
UPDATE departments SET over_head_costs = 200 WHERE department_id = 5;
UPDATE departments SET over_head_costs = 300 WHERE department_id = 6;
UPDATE departments SET over_head_costs = 120 WHERE department_id = 7;
UPDATE departments SET over_head_costs = 100 WHERE department_id = 8;
UPDATE departments SET over_head_costs = 230 WHERE department_id = 9;
UPDATE departments SET over_head_costs = 160 WHERE department_id = 10;


DROP TABLE products;
DROP TABLE departments;
SELECT * FROM products;
SELECT * FROM departments;