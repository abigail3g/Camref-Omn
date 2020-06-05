const crypto = require('crypto');
const connection = require('../database/connection');
module.exports = {
    async index(request,response) { 
        const usuario = await connection('usuario').select('*');
        return response.json(usuario);
    },

    async create(request, response){
        const {name, email } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
     
        await connection('usuario').insert({
            id,
            name,
            email,
        })
     
        return response.json({ id });
    }
};