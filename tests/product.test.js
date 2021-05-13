const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const db = require("../models");
const Cart = db.cart;
const Product = db.products;
const ProductDiscount = db.productDiscount;
const TotalDiscount = db.totalDiscount;
describe.only('Test Products', () => {
    it('post Product', async done => {
        // Do your async tests here
        const response = await request
        .post('/api/product')
        .send({
          name: 'Product A',
          price: 10.00,
        })
        expect(response.status).toBe(201)
        expect(response.body.name).toBe('Product A')
        expect(response.body.price).toBe(10.00)
        done()
    })
    it('Products Get', async done => {
        // Do your async tests here
        const response = await request.get('/api/products')
        expect(response.status).toBe(200)
        expect(response.body[0].name).toBe('Product A')
        expect(response.body[0].price).toBe(10.00)
        done()
    })
    it('put Product', async done => {
        // Do your async tests here
        let product = await Product.findAll({where : {name:'Product A'}})
        console.log(' Product Log for test')
        const response = await request
        .put(`/api/product/${product[0].id}`)
        .send({
          name: 'Product 1',
          price: 12.00,
        })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Product was updated successfully.')

        let product_updated = await Product.findAll({where : {name:'Product 1'}})
        expect(product_updated[0].name).toBe('Product 1')
        expect(product_updated[0].price).toBe(12.00)

        done()
    })
})