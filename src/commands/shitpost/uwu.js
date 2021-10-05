import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';

import _ from 'lodash';

function stutter(orig) {
    // pick words from the original message to stutter
    let words = _.sampleSize(orig.split(' '), 3);
    let stutters = words.map(w => {
        const f = w[0];
        return `${f}-${f}-${w}`
    });

    words.forEach(word => {
        orig = orig.replace(word, stutters.find(x => x.startsWith(word[0])));
    });

    return orig;
}

export class UwuCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);
        this._builder.addStringOption(option => 
            option.setName('message')
                .setDescription('Message to uwu-ify')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        console.log(interaction.options);

        let message = interaction.options.getString('message');

        // Replace basic vowels
        message = message.replace(/l/g, 'w');

        console.info(message);

        // Randomly add stuttering between words
        let transformed = stutter(message);

        // Add a random emote to the end of it
        transformed += ' ' + _.sample(['>.<', '>w<', '>//<', 'uwu', 'n-n']);
        await interaction.reply(transformed);
    }
}

export const instance = new UwuCommand('uwu', 'shitpost', 'Converts a message to weeb');