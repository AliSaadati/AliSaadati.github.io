var express = require('express');
var app = express();
var dataFile = require('./data/data.json');
app.set('port', process.env.PORT || 3000);
app.get('/', function (req, res) {
    var info = '';
    dataFile.people.forEach(function (item) {
        info += `
<li>
    <h2>${item.name}</h2>
    <p>${item.title}</p>
    <p>${item.residence}</p>
</li>
`;
    })
    res.send(`
<h1>Our team</h1>
${info}
`);
});
var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});
//var http = require('http');
//var myServer = http.createServer(function (req, res) {
//    res.writeHead(200, {
//        "Content-Type": "text/html"
//    });
//    res.write('<h1>Hello</h1>');
//    res.end();
//});
//myServer.listen(1337);
//console.log('Go to localhost:1337');