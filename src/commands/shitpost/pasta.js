import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';

import glob from 'glob';
import path from 'path';
import fs from 'fs';

export class PastasCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);

        this._builder.addStringOption(option => 
            option.setName('pasta')
                .setDescription('Pasta to send')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const instance = client.instance;
        const pasta = interaction.options.getString('pasta');

        try {
            const sauce = fs.readFileSync(__dirname + `/pastas/${pasta}.txt`, {});
            await interaction.reply(sauce.toString());
        } 
        catch (error) {
            let pastas = [];
            let files = glob.sync(__dirname + '/pastas/**/*.txt', {});

            files.map(file => {
                pastas.push(path.basename(file));
            });
            
            const embed = new MessageEmbed()
                .setTitle('404 Sauce Not Found')
                .setColor(0xff9696)
                .setDescription('I couldn\'t find the sauce for that pasta!')
                .addField('Available sauces', pastas.join(','), false);

            await interaction.reply({ embeds: [embed] });
        }
    }
}

export const instance = new PastasCommand('pasta', 'shitpost', 'Sends a copypasta in chat');