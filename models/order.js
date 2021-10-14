const db = require('../config/config');

const Order = {};

Order.getAll = () => {
    const sql = `SELECT * FROM orders`;
    return db.manyOrNone(sql);
}

Order.create = (order) => {
    const sql = `INSERT INTO users(email,name,lastname,phone,password,image,created_at,updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

    return db.oneOrNone(sql,[
        order.email,order.name,order.lastname,order.phone,order.password,order.image,new Date(),new Date()
    ]);
}

module.exports = Order;