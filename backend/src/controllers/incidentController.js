const connection = require('../database/connection');

module.exports = {
    async index(request, response){
       const {page = 1} = request.query;

     const [count] = await connection('incidents').count();
     console.log(count);

        const incidents = await connection('incidents')
        .join('usuario', 'usuario.id', '=', 'incidents.usuario_id')
        .limit(5)
        .offset((page -1)*5)
        .select([
            'incidents.*', 
            'usuario.name', 
            'usuario.email'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response){
        const {title, local, descricao} = request.body;
        const usuario_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            local,
            descricao,
            usuario_id,
        });

    return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const usuario_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('usuario_id')
        .first();

        if(incident.usuario_id != usuario_id){
            return response.status(401).json({error:'Operation not permitted.'});
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};