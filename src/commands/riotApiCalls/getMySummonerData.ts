import {riotApiUrlPrefix} from "../../config";

export async function getMySummonerData(): Promise<any> {
    try {
        console.log(`Fetching summoner data for myself`);

        // Encode summonerName to handle spaces
        const encodedSummonerName = encodeURIComponent("STRONGSIDE%20SHAWN-NA1");

        const url = `${riotApiUrlPrefix}/lol/summoner/v4/summoners/by-name/${encodedSummonerName}`;
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
    return {};
}