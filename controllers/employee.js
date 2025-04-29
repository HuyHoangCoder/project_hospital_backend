//Import các module cần thiết
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require.main.require('./models/db_controller');
const { check, validationResult } = require('express-validator');

//Middleware kiểm tra đăng nhập
router.get('*', function(req,res,next){
    if(req.cookies['username']==null){
        res.redirect('/login');
    }else{
        next();
    }
});
// Trang hiển thị danh sách nhân viên
router.get('/', function(req,res){
    db.getAllEmployee(function(err, result){
        res.render('employee.ejs', {employee: result});
    });
});
//Thêm nhân viên mới
router.get('/add', function(req, res){
    res.render('add_employee.ejs')
});

router.post('/add', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const join_date = req.body.date;
    const role = req.body.role;
    const salary = req.body.salary;
    db.add_employee(name, email, contact, join_date,role, salary,
      function(err, result){
        console.log('employee details are added to database');
        res.redirect('/employee');
      })
  });
  //Chức năng nghỉ phép
  router.get('/leave', function(req, res){
    db.getAllleave(function(err, result){
      res.render('leave.ejs', {user:result})
    })
  })
  
  //Sửa, xóa đơn nghỉ phép
  router.get('/add_leave', function(req, res){
    res.render('add_leave.ejs');
  });
  
  router.get('/edit_leave/:id', function(req, res){
    const id = req.params.id
    db.getleavebyid(id, function(err, result){
      res.render('edit_leave.ejs', {user:result})
    })
  })
  router.post('/edit_leave/:id', function(req, res){
    const id = req.params.id;
    db.edit_leave(id, req.body.name, req.body.leave_type,
      req.body.from, req.body.to, req.body.reason, function(err, result){
        res.redirect('/employee/leave');
      });
  });
  
  router.get('/delete_leave/:id', function(req, res){
    const id = req.params.id;
    db.getleavebyid(id, function(err, result){
      res.render('delete_leave.ejs', {user:result})
    })
  })

  router.post('/delete_leave/:id', function(req, res){
    const id = req.params.id;
    db.deleteleave(id, function(err, result){
      res.redirect('/employee/leave');
    })
  })
  


  //Chức năng chỉnh sửa nhân viên

  router.get('/edit_employee/:id', function(req, res){
    const id = req.params.id
    db.getEmpbyId(id, function(err, result){
      res.render('edit_employee.ejs', {list:result})
    })
  })

  router.post('/edit_employee/:id', function(req, res){
    const id = req.params.id
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const join_date = req.body.date;
    const role = req.body.role;
    const salary = req.body.salary;
    db.editEmp(name, email, contact, join_date,role, salary,
      function(err, result){
        console.log('employee details edited');
        res.redirect('/employee');
      })
  });
//Xóa nhân viên
  router.get('/delete_employee/:id', function(req, res){
    const id = req.params.id;
    db.getEmpbyId(id, function(err, result){
      res.render('delete_employee.ejs', {list: result});
    })
  })

  router.post('/delete_employee/:id', function(req, res){
    const id = req.params.id;
    db.deleteEmp(id, function(err, result){
      res.redirect('/employee');
    })
  })
  //Tìm kiếm nhân viên
  router.post('/search', function(req, res){
    const key = req.body.search;
    db.searchEmp(key, function(err, result){
      console.log(result);
      res.render('employee.ejs', {employee:result});
    });
  });
//Validate và xử lý thêm đơn nghỉ phép
router.post('/add_leave', [
    check('name').notEmpty().withMessage('Name is required'),
    check('id').notEmpty().withMessage('Employee ID is required'),
    check('leave_type').notEmpty().withMessage('Leave type is required'),
    check('from').notEmpty().withMessage('Please select a start date'),
    check('to').notEmpty().withMessage('Please select an end date'),
    check('reason').notEmpty().withMessage('Please specify a reason for the leave')
  ], function(req, res) {
    // Kiểm tra lỗi validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() }); // Nếu có lỗi validation, trả về 422 và thông báo lỗi
    }
  
    // Lấy dữ liệu từ form gửi lên
    const { name, id, leave_type, from, to, reason } = req.body;
  
    // Thêm đơn nghỉ phép vào cơ sở dữ liệu
    db.add_leave(id, leave_type, from, to, reason, function(err, result) {
      if (err) {
        console.error('Error adding leave: ', err);
        return res.status(500).send('Server error');
      }
  
      console.log('Leave request added to database');
      res.redirect('/employee/leave'); // Redirect về danh sách đơn nghỉ phép
    });
  });
  
  module.exports=router;