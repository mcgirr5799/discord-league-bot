import {Command} from "../types";
import {fetchMatchStatsForAllSummoners} from "./riotApiCalls/getSummonerStats";
import {fetchFlexWinrate} from "./dbCalls/fetchFlexWinrate";



const command: Command = {
    name: "flexWR",
    execute: async (message, args) => {
        const fetchedSuccess = await fetchMatchStatsForAllSummoners();

        if (fetchedSuccess === 0) {
            return message.channel.send("An error occurred while fetching match stats.");
        }

        const flexQueueWinrate = await fetchFlexWinrate()
        return message.channel.send(flexQueueWinrate);
    },
    permissions: ["Administrator"],
    aliases: ["addSummoner"],
};

export default command;