const express = require('express');
const app = express();
const PORT = process.env.PORT || 1234;


const Dictionary = require('./Dictionary.js');

app.set('view engine', 'ejs');

app.listen(PORT,() => {
  console.log('Connected to port ' + PORT);
})

//  GET
app.get('/',(request,response) => {
  response.sendFile(__dirname + '/index.html');
})

app.get('/hu.dir/:url',(request,response) => {
  const URL = Dictionary.getShortenLinkFromURL(request.params.url);

    if(URL){
      response.render('Loading',{
        URL
      })
    }
    else
      response.send('<h1>Invalid URL </h1>')
})


// POST
app.post('/',(request,response) => {


    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', false);

  const result = Dictionary.fetchAll();
  console.log(result);
  response.send(result);
})

app.post('/check/:id',(request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', false);
  const decodedURL = request.params.id.replace(/_/g, '/');
  response.send(Dictionary.getShortenLinkFromURL(decodedURL));
})

app.post('/generate/:id',(request,response) => {
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', false);

  const decodedURL = request.params.id.replace(/_/g, '/');
  Dictionary.addItem(decodedURL);
  response.send(Dictionary.fetchAll());
})
