import {Command} from "../types";
import {fetchMatchStatsForAllSummoners} from "./riotApiCalls/getSummonerStats";


const command: Command = {
    name: "soloWR",
    execute: async (message, args) => {
        const fetchedSuccess = await fetchMatchStatsForAllSummoners();

        if (fetchedSuccess === 1) {
            return message.channel.send("Match stats fetched successfully.");
        } else {
            return message.channel.send("An error occurred while fetching match stats.");
        }
    },
    permissions: ["Administrator"],
    aliases: ["addSummoner"],
};

export default command;