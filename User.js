const Employees = require('../models/employees');
const path = require('path');

const AddUser = (req, res) => {
    let imgFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files.img;
    uploadPath = path.join(__dirname, '../public/images/' + req.body.un + path.extname(imgFile.name));

    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
        if (err)
            res.status(500).send(err);

        const emp = new Employees({
            UserName: req.body.un,
            Password: req.body.pw,
            Image: req.body.un +  path.extname(imgFile.name),
            Type: req.body.type
        })
        emp.save()
            .then(result => {
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            });
    });
};

const GetUser = (req, res) => {
    var query = { UserName: req.body.un, Password: req.body.pw };
    Employees.findOne(query)
        .then(result => {
            req.session.user = result;
            res.redirect('/user/profile');
        })
        .catch(err => {
            console.log(err);
        });
};

const checkUN = (req, res) => {
    var query = { UserName: req.body.UserName };
    Employees.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const editUser = (req, res) => {
    Employees.findByIdAndUpdate(req.session.user._id, { Password: req.body.pw })
        .then(result => {
            req.session.user.Password = req.body.pw;
            res.redirect('/user/profile')
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    AddUser,
    GetUser,
    checkUN,
    editUser
};