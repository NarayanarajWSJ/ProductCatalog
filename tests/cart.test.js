const app = require('../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const db = require("../models");
const Cart = db.cart;
const Product = db.products;
const ProductDiscount = db.productDiscount;
const TotalDiscount = db.totalDiscount;
describe('Test Products cart', () => {
   
   describe('without Discount', () => {
      let product1, product2;
      beforeAll(async () => {
         product1 = await Product.create({name: 'Product 1', price: 10.00,});
         product2 = await Product.create({name: 'Product 2', price: 12.00,});
      })
      it('post Cart to add new item for product 1', async done => {
         // Do your async tests here
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product1.id, 
            count: 3
         })
         expect(response.status).toBe(201)
         expect(response.body.message).toBe('New Items Added to the Cart')
         done()
      })
      it('post Cart to add new item for product 2', async done => {
         // Do your async tests here
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product2.id, 
            count: 4
         })
         expect(response.status).toBe(201)
         expect(response.body.message).toBe('New Items Added to the Cart')
         done()
      })
      it('post Cart to add Existing item', async done => {
         // Do your async tests here
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product1.id, 
            count: 4
         })
         expect(response.status).toBe(201)
         expect(response.body.message).toBe('Existing Items Added to the Cart')
         done()
      })
      it('Cart Get', async done => {
         // Do your async tests here
         const response = await request.get('/api/carts')
         expect(response.status).toBe(200)
         expect(response.body.length).toBe(2)
         expect(response.body[0].count).toBe(4)
         expect(response.body[0].discount_price).toBe(0)
         expect(response.body[0].total_price).toBe(48)
         expect(response.body[1].count).toBe(7)
         expect(response.body[1].discount_price).toBe(0)
         expect(response.body[1].total_price).toBe(70)
         done()
      })
      it('post Cart to add zero count item for product 2', async done => {
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product2.id, 
            count: 0
         })
         expect(response.status).toBe(400)
         expect(response.body.message).toBe('product_id and count can not be empty!')
         done()
      })
      it('post Cart to add negative count item for product 2', async done => {
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product2.id, 
            count: -1
         })
         expect(response.status).toBe(400)
         expect(response.body.message).toBe('product count can not be Zero or Negative!')
         done()
      })
      afterAll(async () => {
         await Product.sync({ force: true });
         await Cart.sync({ force: true });
      });
   })

   describe('with Discount', () => {
      let product1, productDiscount1,totalDiscount1,totalDiscount2;
      beforeAll(async () => {
         await Product.sync({ force: true });
         await Cart.sync({ force: true });
         await ProductDiscount.sync({ force: true });
         await TotalDiscount.sync({ force: true });
         product1 = await Product.create({name: 'Product 1', price: 10.00,});
         productDiscount1 = await ProductDiscount.create({
            product_id: product1.id,
            discount_count: 5,
            discount_price: 30.00
         });
      })
      it('post Cart to add new item for product 1', async done => {
         // Do your async tests here
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product1.id, 
            count: 3
         })
         expect(response.status).toBe(201)
         expect(response.body.message).toBe('New Items Added to the Cart')
         done()
      })
      it('post Cart to add Existing item', async done => {
         // Do your async tests here
         const response = await request
         .post('/api/cart')
         .send({
            product_id: product1.id, 
            count: 4
         })
         expect(response.status).toBe(201)
         expect(response.body.message).toBe('Existing Items Added to the Cart')
         done()
      })
      it('Cart Get', async done => {
         // Do your async tests here
         const response = await request.get('/api/carts')
         expect(response.status).toBe(200)
         expect(response.body.length).toBe(1)
         expect(response.body[0].count).toBe(7)
         expect(response.body[0].discount_price).toBe(20)
         expect(response.body[0].total_price).toBe(50)
         done()
      })
      it('Get Total Discount without total discount', async done => {
         // Do your async tests here
         const response = await request.post('/api/checkout')
         expect(response.status).toBe(200)
         expect(response.body.acutal_price).toBe(70)
         expect(response.body.price).toBe(50)
         expect(response.body.discounted_price).toBe(20)
         expect(response.body.message).toBe('Discount applied')
         done()
      })
      it('Get Total Discount with total discount', async done => {
         // Do your async tests here
         totalDiscount1 = await TotalDiscount.create({
            price_above: 100,
            price_below: 150,
            discount_price: 10.00
         });
         const response = await request.post('/api/checkout')
         expect(response.status).toBe(200)
         expect(response.body.acutal_price).toBe(70)
         expect(response.body.price).toBe(50)
         expect(response.body.discounted_price).toBe(20)
         expect(response.body.message).toBe('Discount applied')
         done()
      })
      it('Get Total Discount with total discount', async done => {
         // Do your async tests here
         totalDiscount2 = await TotalDiscount.create({
            price_above: 20,
            price_below: 100,
            discount_price: 10.00
         });
         const response = await request.post('/api/checkout')
         expect(response.status).toBe(200)
         // expect(response.body.cart_items).toBe(7)
         expect(response.body.acutal_price).toBe(70)
         expect(response.body.price).toBe(40)
         expect(response.body.discounted_price).toBe(30)
         expect(response.body.message).toBe('Discount applied')
         done()
      })
      afterAll(async () => {
         await Product.sync({ force: true });
         await Cart.sync({ force: true });
         await ProductDiscount.sync({ force: true });
         await TotalDiscount.sync({ force: true });
      });
   })


 })