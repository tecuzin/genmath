const { CosmosClient } = require('@azure/cosmos');

const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
const database = client.database(process.env.COSMOS_DB_NAME);
const container = database.container('scores');

module.exports = async function (context, req) {
    context.log('Processing scores request.');

    try {
        if (req.method === 'POST') {
            // Sauvegarder un nouveau score
            const score = {
                id: new Date().getTime().toString(),
                score: req.body.score,
                time: req.body.time,
                date: req.body.date
            };

            const { resource: createdScore } = await container.items.create(score);
            
            context.res = {
                status: 201,
                body: createdScore
            };
        } else if (req.method === 'GET') {
            // Récupérer les meilleurs scores
            const querySpec = {
                query: 'SELECT * FROM c ORDER BY c.score DESC, c.time ASC OFFSET 0 LIMIT 10'
            };

            const { resources: scores } = await container.items.query(querySpec).fetchAll();
            
            context.res = {
                status: 200,
                body: scores
            };
        }
    } catch (error) {
        context.log.error('Error processing request:', error);
        
        context.res = {
            status: 500,
            body: { error: 'An error occurred processing your request.' }
        };
    }
}; 