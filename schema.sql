DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (

    item_id INTEGER AUTO_INCREMENT NOT NULL,

    product_name VARCHAR (20),

    department_name VARCHAR(20),

    price  DECIMAL (10,2),

    stock_quantity INTEGER(100), 

    PRIMARY KEY (item_id),
) 

SELECT * FROM products

INSERT INTO products (product_name, department_name, price, stock_quantity )


values ("skateboard", "sporting", 25.50, 18 ),
       ("skates", "sporting", 15.50, 30 ),
       ("bicycle", "sporting", 55.50, 10 ),
       ("fishing rod", "sporting", 55.00, 15 ),
       ("basketball", "sporting", 18.00, 14 ),
       ("baseball", "sporting", 10.00, 45 ),
       ("volleyball", "sporting", 13.75, 14 ),
       ("baseball bat", "sporting", 30.00, 35 ),
       ("baseball glove", "sporting", 25.00, 15 ),
       ("tennis racket", "sporting", 45.00, 24 )











