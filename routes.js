const fs = require('fs')

const requestHandler = (request, response) => {
  if (request.url === '/') {
    response.write(`
      <html>
        <head>
          <title>Enter Message</title>
        </head>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message">
            <button>send</button>
          </form>
        </body>
      </html>`
    )
    response.end()
    return
  }

  if (request.url === '/message') {
    const body = []
    request.on('data', chunk => {
      body.push(chunk)
    })
    
    request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      fs.writeFile('message.txt', message, error => {
        response.statusCode = 302
        response.setHeader('Location', '/')
        response.end()
        return
      })
    })
  }
}

exports = requestHandler
