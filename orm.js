const getConnection = require('./config/connection');


module.exports = {
    getQuery: async (q, req, res, values = null) => {
        const conn = await getConnection();

        try {
            if (values) {
                const [rows, fields] = await conn.query(q, values);
                res.json(rows);
            } else {
                console.log('else', values);
                const [rows, fields] = await conn.query(q);
                res.json(rows);
            }

        } catch (err) {
            res.json(err);
        } finally {
            conn.end();
        }
    }
}