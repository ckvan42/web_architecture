const date = require('./modules/utils');
let http = require('http');
let url = require('url');

http.createServer(function(req, res){
  let q = url.parse(req.url, true);
  let qdata = q.query;
  res.writeHead(200, {"Content-Type": "text/html"});
  let name = qdata.name;
  if (!name)
  {
    name = "PERSON~!!";
  }
  let style = '"color: blue; font-family: Arial, Helvetica, sans-serif;"';
  let response = `<p style=${style}>Hello awesome ${name}, What a beautiful day.
  Server current date and time is: ${date.getDate()}</p>`;
  res.end(response);
}).listen(8000);

