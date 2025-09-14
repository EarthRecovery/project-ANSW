const db = require('../utils/db');

const Article = {
    async create({ author_id, author_name, author_email, title, html_content,publish_time,last_modified_time,is_published,up_count,down_count }) {
        const [result] = await db.execute(
            `INSERT INTO article (author_id, author_name, author_email, title, html_content, publish_time, last_modified_time, is_published, up_count, down_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [author_id, author_name, author_email, title, html_content, publish_time, last_modified_time, is_published, up_count, down_count]
        );
        return result.insertId;
    },
}

module.exports = Article;