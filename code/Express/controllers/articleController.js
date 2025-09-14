const articleService = require('../services/articleService');

const articleController = {
    async createBlankArticle(req, res) {
        try {
            const id = await articleService.createBlankArticle(req);
            res.status(201).json({ message: 'Blank article created', id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = articleController;