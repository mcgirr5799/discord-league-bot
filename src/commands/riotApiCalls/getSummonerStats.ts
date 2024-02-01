import { MongoClient } from 'mongodb';
import { riotApiUrlPrefix } from '../../config';
import {getSummonerData} from "./getSummonerData";


/**
 * Fetches match stats for all summoners in the database and updates the collection.
 * @returns {Promise<number>} A promise that resolves to 1 upon successful execution.
 */
export async function fetchMatchStatsForAllSummoners(): Promise<number> {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('summoners'); // Update the database name accordingly
        const collection = database.collection('summonerData'); // Update the collection name accordingly

        // Step 0: Fetch all summoners from the collection
        const summoners = await collection.find().toArray();

        // Loop through each summoner and fetch match stats
        for (const summoner of summoners) {
            try {
                try {
                    // Step 2: Fetch match stats using the summoner's ID
                    console.log(`Fetching match stats for ${summoner.originalName}`);
                    const url = `${riotApiUrlPrefix}/lol/league/v4/entries/by-summoner/${summoner.id}`;
                    const headers = {
                        'X-Riot-Token': process.env.RIOT_API_KEY || '',
                    };

                    const response = await fetch(url, { headers });

                    // Step 3: Handle response
                    if (response.ok) {
                        const matchStats = await response.json();

                        // Step 4: Update the current entry in the MongoDB collection with the fetched match stats
                        await collection.updateOne(
                            { id: summoner.id },
                            { $set: { matchStats: matchStats } }
                        );

                        console.log(`Match stats for ${summoner.originalName} added to the database.`);
                    } else {
                        console.error(`Error fetching match stats. Status: ${response.status}, Message: ${await response.text()}`);
                        return 0; // Return non-1 value here
                    }
                } catch (error) {
                    console.error(`An error occurred while fetching match stats: ${error.message}`);
                    return 0; // Return non-1 value here
                }
            } catch (error) {
                console.error(`Error fetching summoner data for ${summoner.originalName}: ${error.message}`);
                return 0; // Return non-1 value here
            }
        }

        // Step 5: Return success signal
        return 1;
    } finally {
        // Step 6: Close MongoDB connection
        await client.close();
    }
}