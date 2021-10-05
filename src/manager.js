// Register commands from files
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const glob = require('glob');
const fs = require('fs');

var commands = [];

// Wraps a command so we can pass around it as well as its handler
class CommandWrapper {
    constructor(data, handler) {
        this.data = data;
        this.handler = handler;
    }
}

export function unwrap(wrapped) {
    // Unwrap a wrapped command into its data since Discord will bitch if it has
    // a handler property attached
    return {
        name: wrapped.data.name,
        description: wrapped.data.description,
        options: wrapped.data.options
    };
}

export class CommandManager {
    constructor() {
        this.commands = [];

        // raw command objects since discord.js requrires we trim the category
        // before invoking the REST api
        this.rawCommands = [];
    }

    async registerCommands(clientId, token) {    
        // not async but eh
        try {
            let files = glob.sync('./src/commands/**/*.js', {});

            for (const file of files) {
                const command = require(`.${file}`);

                console.log(command.instance);

                this.rawCommands.push(command.instance);
                this.commands.push(new CommandWrapper(
                    command.instance.getBuilder().toJSON(),
                    command.instance.handler));
            }

            const rest = new REST({ version: '9' }).setToken(token);
            this.rest = rest;

            try {
                const unwrappedCommands = this.commands.map(c => unwrap(c));
                
                // TODO: add support for multiple guilds
                await rest.put(Routes.applicationGuildCommands(clientId, process.env.DISCORD_GUILDS), 
                    { body: unwrappedCommands });
                //await rest.put(Routes.applicationCommands(clientId), { body: commands });
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.log(error);
            console.log('failed to load module, probably not a command lol');
        }
    }

    async findByName(name) {
        // todo: optimize this
        for (const command of this.commands) {
            if (command.data.name == name) {
                return command;
            }
        }
    }
}