import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';

import _ from 'lodash';
import got from 'got';

export class SubredditCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);

        this._builder.addStringOption(option => 
            option.setName('sub')
                .setDescription('Subreddit to pull a random post from')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const sub = interaction.options.getString('sub');

        const { body } = await got.get(`https://reddit.com/r/${sub}/hot.json?limit=200`);
        const json = JSON.parse(body);

        const children = json['data']['children'];

        for (const child of children) {
            if (child['kind'] == 't3') {
                await interaction.reply(_.sample(children)['data']['url']);
                return;
            }
        }
    }
}

export const instance = new SubredditCommand('reddit', 'shitpost', 'Pull a random post from a subreddit');