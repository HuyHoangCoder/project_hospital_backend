const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodelogin'
});

con.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('✅ Connected to database');
  }
});

// Đăng ký tài khoản
module.exports.signup = function(username, email, password, status, callback) {
  const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';

  con.query(checkEmailQuery, [email], function(err, result) {
    if (err) return callback(err);

    if (!result || result.length === 0) {
      const insertQuery = 'INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)';
      con.query(insertQuery, [username, email, password, status], callback);
    } else {
      // Email đã tồn tại
      return callback(new Error('Email already exists.'));
    }
  });
};

// Lưu token xác minh
module.exports.verify = function(username, email, token, callback) {
  const query = 'INSERT INTO verify (username, email, token) VALUES (?, ?, ?)';
  con.query(query, [username, email, token], callback);
};

// Lấy user ID qua email
module.exports.getuserid = function(email, callback) {
  const query = 'SELECT * FROM verify WHERE email = ?';
  con.query(query, [email], callback);
};


module.exports.matchtoken = function(id, token, callback) {
  const query = "SELECT * FROM verify WHERE id = ? AND token = ?";
  con.query(query, [id, token], callback);
};


module.exports.updateverify = function(email, email_status, callback) {
  const query = "UPDATE users SET email_status = ? WHERE email = ?";
  con.query(query, [email_status, email], callback);
};

module.exports.findOne = function(email, callback){
  var query = "SELECT * FROM users WHERE email = '" + email + "'";
  con.query(query,callback);
  console.log(query);
}

module.exports.temp = function(id, email, token, callback) {
  var query = "INSERT INTO `temp`(`id`, `email`, `token`) VALUES(?, ?, ?)";
  con.query(query, [id, email, token], callback);
  console.log(query);
};
//add_doctor (Thêm bác sĩ)
module.exports.add_doctor = function(first_name, last_name, email, dob, gender, address, phone, image, department, biogragphy, callback) {
  var query = "INSERT INTO `doctor`(`first_name`, `last_name`, `email`, `gender`, `address`, `phone`, `image`,  `department`, `biogragphy`,) VALUES(?, ?, ?, ?, ?, ?,?,?,?)";
  con.query(query, callback);
  console.log(query);
};
//getAllDoc (Lấy tất cả bác sĩ)
module.exports.getAllDoc = function(callback){
  const query = "SELECT * FROM doctor"
  con.query(query, callback);
  console.log(query); 
}
//getDocbyId (Lấy bác sĩ theo ID)
module.exports.getDocbyId = function(id, callback){
  const query = "SELECT * FROM doctor WHERE id = '"+id+"'"
  con.query(query, callback);
  console.log(query);
}
//editDoc (Cập nhật thông tin bác sĩ)
module.exports.editDoc = function(id, first_name, last_name, email, dob, gender, address, phone, image, department, biography, callback) {
  var query = "UPDATE `doctor` SET `first_name` = ?, `last_name` = ?, `email` = ?, `dob` = ?, `gender` = ?, `address` = ?, `phone` = ?, `image` = ?, `department` = ?, `biography` = ? WHERE `id` = ?";
  con.query(query, [first_name, last_name, email, dob, gender, address, phone, image, department, biography, id], callback);
  console.log(query);  
};
//deleteDoc (Xóa bác sĩ)
module.exports.deleteDoc = function(id, callback){
  var query = "DELETE FROM doctor WHERE id = '" + id;
  con.query(query, callback);
  console.log(query);
};
//searchDoc (Tìm kiếm bác sĩ)
module.exports.searchDoc = function(id, callback){
  var query = "SELECT FROM WHERE first_name LIKE '%" + key + "%'";
  con.query(query, callback);
  console.log(query);
};
//getalldept (Lấy tất cả phòng ban)
module.exports.getalldept = function(callback){
  var query = "SELECT * FROM departments";
  con.query(query, callback);
  console.log(query);
};



//Lấy thông tin của một đơn nghỉ phép dựa trên id của đơn
module.exports.getleavebyid= function(id, callback){
  var query = "select * from leaves where id="+id;
  con.query(query, callback)
}
module.exports.getAllleave = function(callback){
  const query = "SELECT * FROM leaves"
  con.query(query, callback)
}
// Thêm một đơn nghỉ phép mới vào bảng leaves
module.exports.add_leave= function(name, id, type, from, to, reason, callback){
  var query="INSERT into `leaves`(`employee`, `emp_id`, `leave_type`. `date_from`, `date_to`, `reason`) VALUES(?,?,?,?,?,?)";
  console.log(query);
  com.query(con, callback);
  }

  // Xóa một đơn nghỉ phép dựa trên id
module.exports.deleteleave= function(id, callback){
  var query = "delete from leaves where id="+id;
  con.query(query, callback)
}
//Lấy tất cả thông tin nhân viên.
module.exports.getAllemployee = function(callback){
  const query = "SELECT * FROM employee"
  con.query(query, callback)
}
module.exports.add_employee= function(name, email, contact, join_date, role, salary, callback){
  var query="INSERT into `leaves`(`name`, `email`, `contact`. `join_date`, `role`, `salary`) VALUES(?,?,?,?,?,?)";
  console.log(query);
  com.query(con, callback);
}
//Tìm kiếm nhân viên theo tên (key).

  module.exports.searchEmp=function(key, callback){
    var query = "SELECT * from employee where name like '%"+key+"%'";
    con.query(query,callback);
    console.log(query);
  };
  // Xóa một nhân viên dựa trên id.
  module.exports.deleteEmp = function(id, callback){
    const query = "DELETE FROM employee WHERE id = " +id;
    con.query(query, callback);
  }
  //Cập nhật thông tin của một nhân viên.
  module.exports.editEmp = function(id, name, contact, join_date, role, callback) {
    const query = `
      UPDATE employees
      SET name = ?, contact = ?, join_date = ?, role = ?
      WHERE id = ?
    `;
    con.query(query, callback);
  };
//Lấy thông tin của một nhân viên dựa trên id
  module.exports.getEmpbyId=function(id, callback){
    var query = "select * from employee where id ="+id;
    con.query(query, callback)
  }
  module.exports.edit_leave = function(id, name, leave_type, from, to, reason, callback) {
    const query = "UPDATE `leaves` employees = '"+name+"', `leave_type` = '"+leave_type+"', `date_from` = '"+from+"', `date_to` = '"+to+"' , `reason` = '"+reason+"' SET WHERE ";
    con.query(query, callback);
  };

  
  module.exports.add_appointment = function(p_name, department, d_name, date,time, email, phone, callback) {
    var query = "INSERT INTO appointment (patient name, department, doctor name, date, time, email, phone) VALUES('"+p_name+"','"+department+"','"+d_name+"','"+date+"','"+time+"','"+email+"','"+phone+"','"+callback+"')";
    con.query(query, callback)

  }
  module.exports.getallappointment = function(callback){
    var query = "select * from appointment";
    con.query(query, callback)
  }
  module.exports.editappointment = funciton (id, p_name, department, d_name, date, time, email,phone, callback){
      const query = "UPDATE `appointment` SET `patient_name` = '"+p_name+"'', `department` = "'+department+'", `doctor_name` = '"+d_name+"'', `date` = '"+date+"'', `email` = '"+email+"'', `phone` = '"+phone+"'' WHERE id = " + id;
      con.query(query, callback);
  }

  module.exports.deleteappointment = function(id, callback){
    var query = "delete FROM appointment where id="+id
    con.query(query, callback)
  }





  module.exports.getallmed= function(callback){
    var query = "SELECT * FROM store order by id desc";
    console.log(query)
    con.query(query, callback)
  }
  
  module.exports.addMed=function(name, p_date, expire, e_date, price, quantity, callback){
    var query = "INSERT INTO `store` (name, p_date,expire, expire_end, price, quantity) VALUES (?,  ?,  ?,  ?,  ?,  ?)";
    con.query(query, callback)
  }


  module.exports.getMedbyId = function(id, callback){
    var query = "SELECT * FROM store where id="+id;
    con.query(query, callback)
  }

  module.exports.editmed = function(id, name, p_date, expire, e_date, price, quantity, callback){
    var query = "UPDATE store SET name='"+name+"', p_date='"+p_date+"', expire='"+expire+"', expire_end='"+e_date+"', price="+price+", quantity="+quantity+" WHERE id="+id;
    con.query(query, callback)
  }

  module.exports.deletemed = function(id, callback){
    var query = "delete from store where id="+id;
    con.query(query, callback)
  }

  module.exports.searchmed=function(key,callback){
    var query = 'SELECT * from store where name like "%'+key+'%"';
    con.query(query, callback)
  }

  module.exports.postcomplain=function(message, name, email, subject, callback){
    var query = "insert into complain(message,name,email,subject) values (?, ?, ?, ?)";
    con.query(query,callback)
  }
module.exports.getcomplain = funciton(callback){
  const query = "SELECT * FROM complain";
  con.query(query, callback);
}


module.exports.con = con; 