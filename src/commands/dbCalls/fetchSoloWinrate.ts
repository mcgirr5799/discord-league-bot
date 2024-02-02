const {MongoClient} = require('mongodb');

export async function fetchSoloWinrate() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('summoners');
        const collection = database.collection('summonerData');

        let soloWinrateMessage = ' \nSolo Queue WR\n\n';  // Make sure to initialize it as an empty string

        const summoners = await collection.find().toArray();

        //sort summoners by winRateSolo
        summoners.sort((a: any, b: any) => (b.winRateSolo > a.winRateSolo) ? 1 : -1);

        for (const summoner of summoners) {
            if (summoner.matchStats[0]) {

                if (summoner.winRateSolo === 0) {
                    soloWinrateMessage += `*${summoner.originalName}*: Placements not complete\n`;
                } else {
                    soloWinrateMessage += `*${summoner.originalName}*: ${summoner.matchStats[0].wins} wins, ${summoner.matchStats[0].losses} losses, ${summoner.winRateSolo}% winrate\n`;
                }

            } else {
                soloWinrateMessage += `*${summoner.originalName}*: Placements not complete\n`;
            }

            console.log(soloWinrateMessage);
        }

        return soloWinrateMessage;
    } finally {
        await client.close();
    }
}

