const Article = require('../models/article');

const articleService = {
    createBlankArticle(req) {
        var article = {};
        article.author_id = req.user.id;
        article.author_name = req.user.username;
        article.author_email = req.user.email;
        article.title = req.body.title;
        article.html_content = "";
        article.publish_time = null;
        article.last_modified_time = new Date();
        article.is_published = false;
        article.up_count = 0;
        article.down_count = 0;
        return Article.create(article); 
    }
}

module.exports = articleService;