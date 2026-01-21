const tg = window.Telegram.WebApp
tg.expand()


fetch('/api/products')
.then(res => res.json())
.then(products => {
const grid = document.getElementById('grid')
products.forEach(p => {
grid.innerHTML += `
<div class="card">
<img src="/${p.image}">
<div class="info">
<b>${p.name}</b><br>
Цвет: ${p.color}<br>
Цена: ${p.price} ₽
</div>
</div>
`
})
})