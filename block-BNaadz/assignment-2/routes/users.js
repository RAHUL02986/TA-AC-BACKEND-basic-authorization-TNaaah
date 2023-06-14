var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
var Comment = require('../models/Comment');

/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.post('/register', async (req, res) => {
  try {
    var user = await User.create(req.body);
    res.redirect('/users/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.post('/login', async (req, res, next) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      return res.redirect('/users/login');
    }
    var user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (result) => {
      if (!result) {
        // req.flash('error', 'Invalid password!');
        return res.redirect('/users/login');
      }
      req.session.userId = register.id;
      res.render('articleList');
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
