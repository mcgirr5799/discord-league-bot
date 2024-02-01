import {Command} from "../types";
import {getSummonerData} from "./riotApiCalls/getSummonerData";

const command: Command = {
    name: "addSummoner",
    execute: async (message, args) => {
        const summonerName = args[1];
        if (!summonerName) {
            return message.channel.send("Please provide a summoner name.");
        }

        // Fetch summoner data from the Riot API
        const summonerData = await getSummonerData(summonerName);

        if (!summonerData) {
            return message.channel.send("Summoner not found. Please check the name and try again.");
        }

        // Add summoner data to the database
        //addSummonerToDatabase(summonerData);

        message.channel.send(`Summoner ${summonerData.name} added to the database.`);
    },
    permissions: ["Administrator"],
    aliases: ["addSummoner"],
};

export default command;