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
//Route GET cho trang chính (Hiển thị danh sách lịch hẹn)
router.get('/', function(req, res){
  db.getallappointment(function(err,result){
    console.log(result);
    res.render('appointment.ejs', {list:result});
  });
})
//Route GET và POST để thêm lịch hẹn mới
router.get('/add_appointment', function(req, res){
    res.render('add_appointment.ejs')
  })
  router.post('/add_appointment', function(req, res){
    db.add_appointment(req.body.p_name, req.body.department, req.body.d_name,req.body.date, req.body.time, req.body.email, req.body.phone, 
        funciton(err, result){
            res.redirect('/appointment')
        }
    )
  })
//Route GET và POST để chỉnh sửa lịch hẹn
  router.get('/edit_appointment/:id', function(req, res){
    var id = req.params.id;
    db.getallappointmentbyid(id, function(err, result){
      console.log(result);
      res.render('edit_appointment.ejs', {list:result});
    })
  })
  
router.get('/add_appointment', function(req, res){
    res.render('add_appointment.ejs')
  })
  router.post('/add_appointment/:id', function(req, res){
    db.add_editappointment(req.body.p_name, req.body.department, req.body.d_name,req.body.date, req.body.time, req.body.email, req.body.phone, 
        funciton(err, result){
            res.redirect('/appointment')
        }
    )
  })
//Route GET và POST để xóa lịch hẹn
  router.get('/delete_appointment/:id', function(req, res){
    var id = req.params.id;
    db.getallappointmentbyid(id, function(err,result){
      console.log(results);
      res.render('delete_appointment.ejs', {list:result});
    })
  })

  router.post('/delete_appointment/:id', function(req, res){
    var id = req.params.id;
    db.deleteappointment(id, function(err, result){
      res.redirect('/appointment')
    })
  })

  module.exports = router;