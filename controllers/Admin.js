const Employees = require('../models/employees');
const path = require('path');
const fs = require('fs');

const GetAllUsers = (req, res) => {
  Employees.find()
    .then(result => {
      res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
    });
};

const GetUser = (req, res) => {
  var query = { "_id": req.params.id };
  Employees.findOne(query)
    .then(result => {
      res.render('emp', { emp: result, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
    });
};

const DeleteUser = (req, res) => {
  Employees.findByIdAndDelete(req.params.id)
    .then(result => {
      fs.unlink(path.join(__dirname, '../public/images/' + req.params.img), (err) => {
        if (err) {
          throw err;
        }
        res.redirect('/admin/viewAll');
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const toAdmin = (req, res) => {
  Employees.findByIdAndUpdate(req.params.id, { Type: 'admin' })
      .then(result => {
          res.redirect('/admin/viewAll')
      })
      .catch(err => {
          console.log(err);
      });
};

const toClient = (req, res) => {
  Employees.findByIdAndUpdate(req.params.id, { Type: 'client' })
      .then(result => {
          res.redirect('/admin/viewAll')
      })
      .catch(err => {
          console.log(err);
      });
};

module.exports = {
  GetAllUsers,
  GetUser,
  DeleteUser,
  toAdmin,
  toClient
};