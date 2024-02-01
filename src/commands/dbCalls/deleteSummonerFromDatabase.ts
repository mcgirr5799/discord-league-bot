const {MongoClient} = require('mongodb');

export async function deleteSummonerFromDatabase(requestedSummonerName: string) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('summoners');
        const collection = database.collection('summonerData');

        // Delete the summoner with the provided accountId
        const deletionResult = await collection.deleteOne({ name: requestedSummonerName });

        if (deletionResult.deletedCount === 1) {
            console.log(`${requestedSummonerName} removed successfully.`);
        } else {
            console.log(`${requestedSummonerName} not found in the database.`);
        }
    } finally {
        await client.close();
    }
}
