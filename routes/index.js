var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var fs = require('fs');
  var list = []
  fs.readdir(__dirname, function(err, files) {
    if (err) return;
    files.forEach(function(f) {
          var a = f.substring(0,f.length-3)
          if(a != 'index')
            list.push(a)
    });
    res.render('index', {title:'wow', contant : list});
});

});

module.exports = router;
