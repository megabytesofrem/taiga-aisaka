import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';

import { MessageEmbed } from 'discord.js';

import _ from 'lodash';
import got from 'got';

export class UrbanDictionaryCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);

        this._builder.addStringOption(option => 
            option.setName('term')
                .setDescription('Term to lookup on Urban Dictionary')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const term = interaction.options.getString('term');

        const { body } = await got.get(`https://api.urbandictionary.com/v0/define?term=${term}`);
        const json = JSON.parse(body);

        let sample = _.sample(json['list']);

        const embed = new MessageEmbed()
            .setTitle('Random definition for ' + term)
            .setColor(0xff9696)
            .setDescription(sample['definition'])
            .addField('Example', sample['example'], false)
            .addField('Thumbs up', `${sample['thumbs_up']} :thumbsup:`, false)
            .addField('See the rest of the results', `https://www.urbandictionary.com/define.php?term=${term}`, false);

        await interaction.reply({ embeds: [embed] });       
    }
}

export const instance = new UrbanDictionaryCommand('urban', 'shitpost', 'Lookup a term on Urban Dictionary');