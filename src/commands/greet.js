import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../framework/command';

export class GreetCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);
        // this._builder.addStringOption(option => 
        //     option.setName('input')
        //         .setDescription('Test input to test the command API')
        //         .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        console.log(interaction.options);

        await interaction.reply('Hello senpai~!');
    }
}

export const instance = new GreetCommand('greet', 'default', 'greet description');