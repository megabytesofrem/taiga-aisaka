import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';


function findCommand(instance, name) {
    return instance.manager.commands.filter(c => c.data.name == name);
}

export class HelpCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);

        this._builder.addStringOption(option => 
            option.setName('command')
                .setDescription('Command to view help for')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const instance = client.instance;
        const cmd = interaction.options.getString('command');

        console.log('CMD IS ' + cmd);
        console.log(findCommand(instance, cmd));

        if (findCommand(instance, cmd).length > 0) {
            let match = findCommand(instance, cmd)[0];
            let options = match.data.options;

            let usage = `${match.data.name} `;

            const embed = new MessageEmbed()
                .setTitle(cmd + '')
                .setColor(0xff9696)
                .addField('Description', match.data.description, false);

            options.map(opt => {
                usage += opt.required ? `<${opt.name}>` : `[${opt.name}}`;
            });

            embed.addField('Usage', usage, false);
            await interaction.reply({ embeds: [embed] });
        }
    }
}

export const instance = new HelpCommand('help', 'default', 'Self explanatory');