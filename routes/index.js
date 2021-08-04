var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  console.log(`case 1 - ${ip}`);
  res.render('index', { title: 'Express' });
});

router.get('/raindrop', function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  console.log(`case 2 - ${ip}`);
  res.render('raindrop', { title: 'Express' });
});

module.exports = router;
