import { Command } from './core/command';
import glob from 'glob';

export class CommandManager {
    commands: Command[];

    constructor() {
        this.commands = [];
    }

    async findCommand(name: string): Promise<Command> {
        return this.commands.filter(c => c.name == name)[0];
    }

    async registerCommands() {
        try {
            // console.log('./src/commands/**/*.ts');
            let files = glob.sync(__dirname + '/commands/**/*.js', {});
            for (const file of files) {
                console.log(file);
                const commandClass = await import(`${file}`);
                const command: Command = new commandClass.default();

                this.commands.push(command);
            }

            for (const com of this.commands) {
                console.log(com);
            }
        } catch (err) {
            console.error(err);
        }
    }
}