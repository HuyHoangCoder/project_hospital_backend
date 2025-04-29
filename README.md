controllers

conplain 

<aside>
💡

```jsx
// Import các module và khai báo router 
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
//Middleware kiểm tra đăng nhập
router.get('*', function(res, req, next){
  if(req.cookies['username']==null){
    res.redirect('/login');
  }else{
    next();
  }
})

router.get('/', function(req, res){
    res.render('complain.ejs');
})  
router.post('/', function(req, res){
    var message = req.body.message;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    db.postcomplain(message, name, email, subject, function(err, result){
      res.redirect('back')
    })
  });
```

</aside>

models

db_controller.js

<aside>
💡

```jsx
  module.exports.postcomplain=function(message, name, email, subject, callback){
    var query = "insert into complain(message,name,email,subject) values (?, ?, ?, ?)";
    con.query(query,callback)
  }
module.exports.getcomplain = funciton(callback){
  const query = "SELECT * FROM complain";
  con.query(query, callback);
}
```

</aside>
