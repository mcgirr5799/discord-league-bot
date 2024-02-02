const {MongoClient} = require('mongodb');

export async function fetchFlexWinrate() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('summoners');
        const collection = database.collection('summonerData');

        let flexWinrateMessage = ' \nFlex Queue WR\n\n';  // Make sure to initialize it as an empty string

        const summoners = await collection.find().toArray();

        //sort summoners by winRateFlex
        summoners.sort((a: any, b: any) => (b.winRateFlex > a.winRateFlex) ? 1 : -1);

        for (const summoner of summoners) {
            if (summoner.matchStats[0]) {

                if (summoner.winRateSolo === 0) {
                    flexWinrateMessage += `*${summoner.originalName}*: Placements not complete\n`;
                } else {
                    flexWinrateMessage += `*${summoner.originalName}*: ${summoner.matchStats[0].wins} wins, ${summoner.matchStats[0].losses} losses, ${summoner.winRateFlex}% winrate\n`;
                }

            } else {
                flexWinrateMessage += `*${summoner.originalName}*: Placements not complete\n`;
            }

            console.log(flexWinrateMessage);
        }

        return flexWinrateMessage;
    } finally {
        await client.close();
    }
}

