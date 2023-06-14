var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

router.get('/', async (req, res) => {
  try {
    var article = await Article.find({});
    res.render('articleList', { article });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.get('/new', async (req, res) => {
  try {
    res.render('createArticle');
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.post('/new', async (req, res) => {
  try {
    var article = await Article.create(req.body);
    res.redirect('createArticle', { article });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
