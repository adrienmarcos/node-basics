const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'products.txt')

const getProductsFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([])
    } else {
      callback(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err)
      })
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }
}
