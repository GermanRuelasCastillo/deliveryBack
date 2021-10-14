const mercadopago = require('mercadopago');
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const User = require('../models/user');

mercadopago.configure({
    sandbox:true,
    access_token:'TEST-7493313499794129-042320-e674a517e066b83432af570eea368dd0-427354191'
});

module.exports = {
    async createPaymentCreditCard(req, res, next){
        let payment = req.body;
        const payment_data = {
            description: payment.description,
            transaction_amount: payment.transaction_amount,
            installments: payment.installments,
            payment_method_id: payment.payment_method_id,
            token: payment.token,
            payer: {
                email:payment.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number,
                }
            }
        };
        const data = await mercadopago.payment.create(payment_data).catch((err) => {
            console.log(err);
            return res.status(501).json({
               message: 'Error al crear el pago',
               success:false,
               error: err.toString()
            });
        });

        if(data){
            console.log("si hay data");
            if(data !== undefined){
                const payment_type_id = module.exports.validatePaymentMethod(payment.payment_type_id);
                payment.id_payment_method = payment_type_id;

                let order = payment.order;
                order.status = 'PAGADO';
                const data1 = await Order.create(order);

                for (const product of order.products){
                    await OrderHasProducts.create(data1.id,product.id,product.quantity);
                }

                return res.status(201).json(data1.response);
            }
        }
    },
    validatePaymentMethod(status){
        if(status === 'credit_cart'){
            status = 1;
        }
        if(status === 'bank_transfer'){
            status = 2;
        }
        if(status === 'ticket'){
            status = 3;
        }
        if(status === 'upon_delivery'){
            status = 4;
        }
        return status;
    }
}