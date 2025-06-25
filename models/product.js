const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'products.txt')

const getProductsFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return callback([])
    }

    try {
      const data = fileContent.length === 0 ? [] : JSON.parse(fileContent)
      return callback(data)
    } catch (error) {
      console.error('Erro ao fazer parse do arquivo:', error)
      return callback([])
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
    this.id = Math.random().toString()
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          return console.error('Erro ao salvar o produto', err)
        }
        console.log('Produto salvo com sucesso')
      })
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }

  static find(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id)
      return callback(product)
    })
  }
}
