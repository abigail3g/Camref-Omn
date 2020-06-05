const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const usuario = await connection ('usuario')
        .where('id', id)
        .select('name')
        .first();
        if (!usuario){
            return response.status(400).json({ error: 'not found'});
        }

        return response.json(usuario);
    }
}