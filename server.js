const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.json({'message': 'answer'});
})
app.listen(process.env.PORT || 8080);

module.exports = {app};