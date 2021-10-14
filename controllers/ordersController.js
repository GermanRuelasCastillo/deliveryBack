const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {
    async create(req, res, next){
        try {
            let order = req.body;
            order.status = 'PAGADO';
            const data = await Order.create(order);

            for (const product of order.products){
                await OrderHasProducts.create(data.id,product.id,product.quantity);
            }

            return res.status(201).json({
                success: true,
                message: 'Order has been created',
                data: data.id
            });
        } catch (error) {
            
        }
    }
}