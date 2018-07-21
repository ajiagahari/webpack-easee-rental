const express = require('express')
const app = express()
app.use(express.static('build'));
app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))