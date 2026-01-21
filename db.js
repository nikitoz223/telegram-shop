const sqlite3 = require('sqlite3').verbose()


const db = new sqlite3.Database('./shop.db')


db.serialize(() => {
db.run(`CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
image TEXT
)`)


db.run(`CREATE TABLE IF NOT EXISTS products (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
price REAL,
color TEXT,
image TEXT,
category_id INTEGER
)`)


db.run(`CREATE TABLE IF NOT EXISTS admins (
id INTEGER PRIMARY KEY
)`)
})


module.exports = db