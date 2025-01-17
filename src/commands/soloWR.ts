import {Command} from "../types";
import {fetchMatchStatsForAllSummoners} from "./riotApiCalls/getSummonerStats";
import {fetchSoloWinrate} from "./dbCalls/fetchSoloWinrate";


const command: Command = {
    name: "soloWR",
    execute: async (message, args) => {
        const fetchedSuccess = await fetchMatchStatsForAllSummoners();

        if (fetchedSuccess === 0) {
            return message.channel.send("An error occurred while fetching match stats.");
        }

        const soloQueueWinrate = await fetchSoloWinrate()
        return message.channel.send(soloQueueWinrate);
    },
    permissions: ["Administrator"],
    aliases: ["addSummoner"],
};

export default command;