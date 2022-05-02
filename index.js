const express = require('express')
const app = express()

let port = 80
if (process.env.APP_PORT) {
  port = Number(process.env.APP_PORT)
}

app.all('*', function (req, res) {
  if (req.originalUrl === '/favicon.ico') {
    return res.end()
  }

  // 80:31080/TCP,443:31443/TCP
  let vpnPort = 31080
  if (req.protocol === 'https') {
    vpnPort = 31443
  }

  //console.log(req.originalUrl)
  let hostname = req.hostname
  hostname = 'db.test20220428-2220.pudding.paas.dlll.nccu.edu.tw'

  //console.log(hostname)
  if (hostname.indexOf('.paas.') === -1) {
    console.error('Illegal URL: ' + getFullURL(req))
    res.status(403)
  	   .send('Illegal URL')
    return res.end(); //end the response
  }

  hostname = hostname.replace('.paas.', '.paas-vpn.')

  let toURL = req.protocol + '://' + hostname + ':' + vpnPort + req.originalUrl
  console.log('Redirect from: ' + getFullURL(req) + ' to: ' + toURL) 

  //res.write(toURL); //write a response to the client
  //res.redirect(toURL);

  let html = `<!DOCTYPE html>
  <html>
  <head>Redirect to ${toURL}</head>
  <body>
  
  <h1>Redirect to ${toURL}</h1>
  <p>Before redirecting, <strong style="color: red;">make sure you are now connected to the VPN.</strong></p>
  <p>You will be redirected shortly. Thank you for your patience</p>
  <p><a href="${toURL}">${toURL}</a></p>
  
  <script>
  setTimeout(function () {
    location.href = "${toURL}"
  }, 3000)
  </script>
  </body>
  </html>`

  res.end(); //end the response
})

function getFullURL (req) {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  //const port = process.env.PORT || PORT;

  const fullUrl = `${protocol}://${host}${url}`
  return fullUrl
}

app.listen(port)