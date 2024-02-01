import {riotApiUrlPrefix} from "../../config";

export async function getSummonerData(summonerName: string): Promise<any> {
    try {
        console.log(`Fetching summoner data for ${summonerName}`);

        const url = `${riotApiUrlPrefix}/lol/summoner/v4/summoners/by-name/${summonerName}`;
        const headers = {
            'X-Riot-Token': process.env.RIOT_API_KEY || '',
        };

        const response = await fetch(url, { headers });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Error fetching summoner data. Status: ${response.status}, Message: ${await response.text()}`);
            throw new Error(`Error fetching summoner data`);
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        throw error;
    }
    return { name: summonerName, level: 30, /* Add other relevant data */ };
}