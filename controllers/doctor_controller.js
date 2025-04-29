const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require.main.require('./models/db_controller');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
//Middleware Kiểm Tra Cookie
router.get('*', function(res, req, next) {
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});
//Cấu Hình Multer (Upload File)
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets/images/upload_images");
    },
    filename: function(params) {

        filename: function(req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    }
});

const upload = multer({
    storage: storage
});
//Tạo và Xử Lý Các Tuyến Đường (Routes)
router.get('/', function(req, res) {
    if (err)
        throw err;
    res.render('doctors.ejs', {
        list: result
    })
});

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

//Thêm Bác Sĩ (Add Doctor)
router.get('/add_doctor', function(req, res){
    db.getalldept(function(err, result){
        res.render('add_doctor.ejs',{list:result})
    })
});

router.post('/add_doctor', upload.single("image"), function(req,res){
    db.add_doctor(req.body.first_name, req.body.last_name, req.body.email,
        req.body.dob, req.body.gender, req.body.address, req.body.phone, req.file.filename, req.body.department, req.body.biogragphy)
        if(db.add_doctor){
            console.log('1 doctor inserted')
        }
        res.render('add_doctor');
    });
    //Chỉnh Sửa Bác Sĩ (Edit Doctor)
    router.get('/edit_doctor/:id', function(req, res){
        const id = req.params.id;
        db.getDocbyId(id, function(err,result){
            res.render('edit_doctor.ejs', {list:result})
        })
    });
    router.post('/edit_doctor/:id', function(res, req){
        const id = req.params.id;
        db.editDoc(req.body.first_name, req.body.last_name, req.body.email,
            req.body.dob, req.body.gender, req.body.address, req.body.phone, req.body.department, res.body.biography,
            function(err, result){
                if(err) throw err;
                res.redirect('back');            
            }
        )
    });

    //Xóa Bác Sĩ (Delete Doctor)
    router.get('/delete_doctor/:id', function(req, res){
        const id = req.params.id;
        db.getDocbyId(id, function(err, result){
          res.render('delete_doctor.ejs', {list:result});
        })
      });

      router.post('/delete_doctor/:id', function(req, res){
        const id = req.params.id;
        db.getDocbyId(id, function(err, result){
          res.redirect('doctor');
        })
      });

      router.get('/', function(req, res){
        db.getAllDoc(function(err, result){
          if(err)
            throw err;
          res.render('doctor.ejs', {list:result})
        })
      });
      //Tìm Kiếm Bác Sĩ (Search Doctor)
      router.post('/search', function(req, res){
        var key = req.body.search;
        db.searchDoc(key, function(err, result){
          console.log(result);
          res.render('doctor.ejs', {list:result})
        })
      });

module.exports = router;