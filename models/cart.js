const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.txt')

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent)
      }
      const productIndex = cart.products.findIndex(product => product.id === id)
      if (productIndex !== -1) {
        cart.products[productIndex].qty += 1
      } else {
        cart.products.push({ id, qty: 1 })
      }
      cart.totalPrice += parseFloat(price)

      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.error('Erro ao salvar o carrinho:', err)
      })
    })
  }

  static removeProduct(id) {}
}
