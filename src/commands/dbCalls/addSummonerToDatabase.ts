import { MongoClient } from 'mongodb';

export async function addOrUpdateSummonerToDatabase(summonerData: any) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('summoners');
        const collection = database.collection('summonerData');

        // Check if the summoner already exists in the database based on the "id"
        const existingSummoner = await collection.findOne({ id: summonerData.id });

        if (!existingSummoner) {
            // If not exists, insert the summoner data
            const result = await collection.insertOne(summonerData);
            console.log(`Summoner data added with the following id: ${result.insertedId}`);
        } else {
            // If exists, update the summoner data
            const updateResult = await collection.replaceOne({ id: summonerData.id }, summonerData);
            console.log(`Summoner data with id ${summonerData.id} updated. Matched ${updateResult.matchedCount} document(s).`);
        }

        // Add a new field, for example, "hasNoSpaces"
        const addFieldResult = await collection.updateOne(
            { id: summonerData.id },
            { $set: { originalName: summonerData.name } }
        );

        if (addFieldResult.matchedCount === 1) {
            console.log(`New field added to summoner with id ${summonerData.id}.`);
        } else {
            console.log(`New field not added. Matched ${addFieldResult.matchedCount} document(s).`);
        }

        // Remove spaces from the "name" field if they exist
        if (summonerData.name && /\s/.test(summonerData.name)) {
            await collection.updateOne(
                { id: summonerData.id },
                { $set: { name: summonerData.name.replace(/\s/g, '') } }
            );
            console.log(`Spaces removed from the "name" field.`);
        }

    } finally {
        await client.close();
    }
}
