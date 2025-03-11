const requestHandler = (request, response) => {
  if (request.url === '/') {
    response.write(`
      <html>
        <head>
          <title>Users Registration Api</title>
        </head>
        <body>
          <h3>Welcome to our Users Registration Api</h3>
          <p>Click in the buttons below in order to register a new user, or see the registered users!</p>
          <div style="display: flex; justify-content: flex-start; flex-direction: row">
            <form action="/create-user" method="POST" style="margin-right: 4px">
              <input type="text" name="username">
              <button>Register</button>
            </form>
            <form action="/users" method="POST">
              <button>See the list</button>
            </form>
          </div>
        </body>
      </html>` 
    )
    response.end()
    return
  }

  if (request.url === '/users') {
    response.write(`
      <html>
        <head>
          <title>Users Registration Api</title>
        </head>
        <body>
          <h3>You can see below our registered Users</h3>
          <ul>
            <li>Maria da Silva</li>
            <li>Mario Alberto</li>
            <li>Pedro Almeida</li>
            <li>Gilberto Rossi</li>
            <li>Carlos Gomes de Oliveira</li>
          </ul>
          <form action="/" method="POST">
            <button>Return</button>
          </form>
        </body>
      </html>` 
    )
    response.end()
    return
  }

  if (request.url === '/create-user') {
    const body = []
    request.on('data', chunk => {
      body.push(chunk)
    })
    request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const username = parsedBody.split('=')[1]
      console.log(username)
      response.setHeader('Location', '/')
      response.end
      return
    })
  }
}

module.exports = requestHandler
