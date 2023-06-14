var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var User = require('../models/User');
var Comment = require('../models/Comment');

/* GET users listing. */

router.get('/', async (req, res) => {
  res.render('dashboard');
});
router.get('/login', function (req, res, next) {
  res.render('adminlogin');
});
router.get('/register', function (req, res, next) {
  res.render('adminregister');
});
router.post('/register', async (req, res) => {
  try {
    var admin = await Admin.create(req.body);
    res.redirect('/admin/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;

    if (!email || !password) {
      return res.redirect('/admin/login');
    }
    var admin = await Admin.findOne({ email });
    if (!admin) {
      return res.redirect('/admin/login');
    }
    admin.verifyPassword(password, (result) => {
      if (!result) {
        return res.redirect('/admin/login');
      }
      //presist logged in user
      req.session.adminId = admin.id;
     res.redirect('/admin');
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
