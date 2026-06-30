<!-- ex)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); -->

CREATE TABLE item_list (
    id SERIAL PRIMARY KEY,
    item_number INTEGER NOT NULL UNIQUE REFERENCES stock_list(item_number),
    item_name VARCHAR(30) NOT NULL, 
    price INTEGER  NOT NULL,
    detail TEXT
);

//seed
INSERT INTO item_list (item_number, item_name, price, detail)
VALUES 
(101, 'Banana', 1234, 'yellow'),
(102, 'Strawberry', 5678, 'red'),
(103, 'Watermellon', 9012, 'green & stripe black');



CREATE TABLE stock_list (
    id SERIAL PRIMARY KEY,
    item_number INT NOT NULL UNIQUE REFERENCES item_list(item_number),
    item_name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    delivery_date TIMESTAMP NOT NULL
);

//seed
INSERT INTO stock_list (item_number, item_name, quantity, delivery_date)
VALUES 
(101, 'Banana', 10, '2026-01-23'),
(102, 'Strawberry', 20, '2026-02-01'),
(103, 'Watermellon', 30, '2026-03-21');




CREATE TABLE sales_list (
    id SERIAL PRIMARY KEY,
    total_price INT NOT NULL,
    total_items INT NOT NULL,
    sales_number INT NOT NULL UNIQUE REFFERENCE item_list(xxxxx),
    sales_datetime TIMESTAMP NOT NULL,
    about_items JSON NOT NULL
);

//seed
INSERT INTO sales_list (total_price, total_items, sales_number, sales_datetime, about_items)
VALUES 
(12340, 10, 1, '2026-01-23 10:10:00', '[{"Banana": 10}]'),
(56780, 10, 2, '2026-02-01 20:20:00', '[{"Strawberry": 10}]'),
(90120, 10, 3, '2026-03-03 13:33:00', '[{"Watermellon": 10}]');



CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    total_price INT NOT NULL,
    total_items INT NOT NULL,
    keep_items JSON NOT NULL
);

//seed
INSERT INTO cart (total_price, total_items, keep_items)
VALUES 
(1234, 1, '[{"Banana": 1}]'),
(5678, 1, '[{"Strawberry": 1}]'),
(9012, 1, '[{"Watermellon": 1}]');


CREATE TABLE purchase_list (
    id SERIAL PRIMARY KEY,
    total_price INTEGER NOT NULL,
    total_quantity INTEGER NOT NULL,
    purchase_number BIGINT NOT NULL,
    purchase_datetime TIMESTAMP NOT NULL,
    about_items JSONB NOT NULL
);

***** 6/13
CREATE TABLE expense_master (
    id SERIAL PRIMARY KEY REFFERENCE expense_list(expsense_id),
    expense_name VARCHAR(30) NOT NULL,
    category VARCHAR(30) NOT NULL,
    is_active BOOLEAN NOT NULL
);

//seed
INSERT INTO expense_master (id, expense_name, category, is_active)
VALUES 
(1, '家賃', '固定費', TRUE),
(2, '電気代', '光熱費', TRUE);



CREATE TABLE expense_list (
    id SERIAL PRIMARY KEY,
    expense_id INTEGER NOT NULL REFFERENCE,
    amount INTEGER NOT NULL,
    payment_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    memo TEXT
);

//seed
INSERT INTO expense_list (id, expense_id, amount, payment_date, created_at, memo)
VALUES 
(1, 2, 3000, '2026-07-01', '2026-06-03 11:11:11', '電気代');


CREATE TABLE company_setting (
    opening_cash BIGINT NOT NULL,
    minimum BIGINT NOT NULL
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    roll VARCHAR(20) NOT NULL DEFAULT 'User',
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, email, password_hash, roll)
VALUES(
'Admin', 'admin@shokudo.ne.jp', 'admin'
)

INSERT INTO users (
    username,
    email,
    password_hash,
    role
)
VALUES (
    'Brother',
    'aaa@email.com',
    '$2b$10$T.pcvu.dGh4fOntM5xFNyOjOykDQzkyykSKwuWwAxdVOz7rQrTkzO',
    'Admin'
);

=============================================

//\. "$HOME/.nvm/nvm.sh"
// psql postgres     --Posgreに入る
// \c postgres  --DBへ接続
// \d   --テーブル一覧
// SELECT current_database();


//sDROP TABLE expense_list;

// ※※カラム名
//ALTER TABLE item_list
// RENAME COLUMN item_name TO product_name;

// ※※カラム型
// ALTER TABLE item_list
// ALTER COLUMN price TYPE BIGINT;

// ※※カラム削除
// ALTER TABLE item_list
// DROP COLUMN stock;

// ※＊NOT NUll追加
// ALTER TABLE item_list
// ALTER COLUMN item_name SET NOT NULL;

// ※＊NOT NUll削除
// ALTER TABLE item_list
// ALTER COLUMN item_name DROP NOT NULL;

//UPDATE sales_list 
//SET about_items = ‘[{"item_number":102,"item_name":"Strawberry","quantity":3}]’
//WHERE id = 2;


シーケンスを作る
CREATE SEQUENCE expense_list_id_seq;


テーブル構造を変える → ALTER TABLE
データを追加する → INSERT
データを更新する → UPDATE
データを削除する → DELETE


idと紐付ける
ALTER TABLE expense_list
ALTER COLUMN id
SET DEFAULT nextval('expense_list_id_seq');

| 型         | 記述                    |
| --------- | --------------------- |
| INT       | 123                   |
| BIGINT    | 123                   |
| DECIMAL   | 123.45                |
| BOOLEAN   | TRUE                  |
| VARCHAR   | 'Banana'              |
| TEXT      | 'Hello'               |
| DATE      | '2026-01-23'          |
| TIMESTAMP | '2026-01-23 10:10:00' |
| JSONB     | '[{"Banana":10}]'     |



INSERT INTO sales_list (
    total_price,
    total_items,
    sales_number,
    purchase_datetime,
    about_items
)
VALUES (
    12340,
    10,
    1,
    CURRENT_TIMESTAMP,
    '[{"Banana":10}]'
);

