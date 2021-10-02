import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';

function write(str) {
    return str;
}

export class EvalCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);

        this._builder.addStringOption(option => 
            option.setName('code')
                .setDescription('Code to evaluate')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const instance = client.instance;
        const code = interaction.options.getString('code');

        try {
            const result = eval(code);

            const embed = new MessageEmbed()
                .setTitle('Eval')
                .setColor(0xff9696)
                .addField('Result', result !== undefined ? result.toString() : 'No output available', false)
                .addField('Status', 'Success :white_check_mark:', false);

            await interaction.reply({ embeds: [embed] });
        } 
        catch (error) {
            const embed = new MessageEmbed()
            .setTitle('Eval')
                .setColor(0xff9696)
                .addField('Error', error.toString())
                .addField('Status', 'Failed :negative_squared_cross_mark:', false);
                
            await interaction.reply({ embeds: [embed] });
        }
    }
}

export const instance = new EvalCommand('eval', 'default', 'Evaluates (dangerous) code');