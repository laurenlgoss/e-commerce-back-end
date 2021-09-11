# e-commerce-back-end

## Description

Back-end JavaScript application that allows the user to interact with an e-commerce database.

## Table of Contents

* [Installation](#Installation)
* [Usage](#Usage)
* [Tests](#Tests)
* [Questions](#Questions)

## Installation

Required packages:
  * Node.js
  * MySQL2
  * dotenv
  * Express.js
  * Sequelize

## Usage

### Installation

For first time users, the `.env` file must be populated with their MySQL database name, username, and password. The user will then have to install all dependencies using `npm i`.

Then the user must run these commands in the terminal:

```bash
mysql> source db/schema.sql
node seeds
npm start
```

The database will then be created and populated, the server will be started, and the user can interact with the e-commerce database.

### Database

The database consists of four tables, with the `product-tag` table displaying a many-to-many relationship between products and tags:

* `category`
    * `category_name`
* `product`
    * `product_name`
    * `price`
    * `stock`
* `product_tag`
* `tag`
    * `tag_name`

### Routes

To interact with the `category` table, use the `/api/categories` endpoint. To interact with the `product` table, use the `api/products` endpoint. To interact with the `tag` table, use the `api/tags` endpoint.

Each route offers a `GET`, `POST`, `PUT`, and `DELETE` HTTP method.

To `POST` or `PUT` a new product, the request body should be formatted as follows:

```bash
{
    "product_name": "Basketball",
    "price": 200.00,
    "stock": 3,
    "tagIds": [1, 2, 3, 4]
}
```

To `POST` or `PUT` a new tag, the request body should be formatted as follows:

```bash
{
    "tag_name": "Yellow",
    "productIds": [1, 2, 3]
}
```

## Tests

[![Routes Test](./images/e-commerce-test.gif)](https://drive.google.com/file/d/1weFyU24poOl2QGk6X0vcS_KtJTUd8FZ5/view)

## Questions

Do you have questions? Contact me here:

* [GitHub](https://github.com/laurenlgoss)
* [Email](laurenlgoss98@gmail.com)