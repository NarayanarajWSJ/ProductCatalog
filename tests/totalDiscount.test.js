const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const db = require("../models");
const Cart = db.cart;
const Product = db.products;
const ProductDiscount = db.productDiscount;
const TotalDiscount = db.totalDiscount;
describe.only('Test Products Discount', () => {
    let product1;
    beforeAll(async () => {
        product1 = await Product.create({name: 'Product C', price: 10.00,});
    })
    it('post Product Discount', async done => {
        // Do your async tests here
        const response = await request
        .post('/api/total_discount')
        .send({
            price_above: 100.00,
            price_below: 200.00,
            discount_price: 20.0,
        })
        expect(response.status).toBe(201)
        expect(response.body.price_above).toBe(100.00)
        expect(response.body.price_below).toBe(200.00)
        expect(response.body.discount_price).toBe(20.00)
        done()
    })
    it('get Product Discount', async done => {
        // Do your async tests here
        const response = await request.get('/api/total_discounts')
        expect(response.status).toBe(200)
        expect(response.body[0].price_above).toBe(100.00)
        expect(response.body[0].price_below).toBe(200.00)
        expect(response.body[0].discount_price).toBe(20.00)
        done()
    })
    it('put Product', async done => {
        // Do your async tests here
        let totalDiscount = await TotalDiscount.findAll({where : {discount_price:20.00}})
        const response = await request
        .put(`/api/total_discount/${totalDiscount[0].id}`)
        .send({
            price_above: 120.00,
            price_below: 220.00,
            discount_price: 25.00,
        })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('TotalDiscount was updated successfully.')

        let totalDiscount_updated = await TotalDiscount.findAll({where : {discount_price:25.00}})
        expect(totalDiscount_updated[0].price_above).toBe(120.00)
        expect(totalDiscount_updated[0].price_below).toBe(220.00)
        expect(totalDiscount_updated[0].discount_price).toBe(25.00)
        done()
    })
    afterAll(async () => {
        await TotalDiscount.sync({ force: true });
    });
})