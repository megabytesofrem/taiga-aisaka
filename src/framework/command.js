const { SlashCommandBuilder } = require('@discordjs/builders');

export class Command {
    constructor(name, category, desc) {
        this.name = name;
        this.category = category;
        this.desc = desc;

        this._builder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.desc);
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {

    }
}