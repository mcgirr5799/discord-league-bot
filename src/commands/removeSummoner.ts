import {Command} from "../types";
import {getSummonerData} from "./riotApiCalls/getSummonerData";
import {deleteSummonerFromDatabase} from "./dbCalls/deleteSummonerFromDatabase";

const command: Command = {
    name: "removeSummoner",
    execute: async (message, args) => {
        var summonerName = args[1];
        if (!summonerName) {
            return message.channel.send("Please provide a summoner name.");
        }

        //remove spaces in name
        const summonerNameNoSpaces = summonerName.replace(/\s/g, '');



        //delete summoner from the database
        await deleteSummonerFromDatabase(summonerNameNoSpaces);

        return
    },
    permissions: ["Administrator"],
    aliases: ["addSummoner"],
};

export default command;