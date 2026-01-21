require('dotenv').config()
const express = require('express')
const multer = require('multer')
const db = require('./db')
const path = require('path')


const app = express()
app.use(express.json())
app.use(express.static('public'))


const upload = multer({ dest: 'public/uploads' })


function isAdmin(req, res, next) {
const id = req.headers['x-telegram-id']
db.get("SELECT id FROM admins WHERE id = ?", [id], (err, row) => {
if (row || id == process.env.MAIN_ADMIN_ID) return next()
res.status(403).send('Not admin')
})
}


app.get('/api/categories', (req, res) => {
db.all("SELECT * FROM categories", [], (e, rows) => res.json(rows))
})


app.get('/api/products', (req, res) => {
db.all("SELECT * FROM products", [], (e, rows) => res.json(rows))
})


app.post('/api/category', isAdmin, upload.single('image'), (req, res) => {
db.run("INSERT INTO categories (name, image) VALUES (?, ?)",
[req.body.name, req.file?.path], () => res.sendStatus(200))
})


app.post('/api/product', isAdmin, upload.single('image'), (req, res) => {
const { name, price, color, category_id } = req.body
db.run("INSERT INTO products (name, price, color, image, category_id) VALUES (?, ?, ?, ?, ?)",
[name, price, color, req.file?.path, category_id], () => res.sendStatus(200))
})


app.post('/api/admin', (req, res) => {
if (req.headers['x-telegram-id'] != process.env.MAIN_ADMIN_ID) return res.sendStatus(403)
db.run("INSERT INTO admins (id) VALUES (?)", [req.body.id], () => res.sendStatus(200))
})


app.listen(3000, () => console.log('Server running on port 3000'))