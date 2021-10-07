import { Argument, Command, CommandArg } from './command';
import _ from 'lodash';

export class ArgumentParser {
    public namedArgs!: Record<string, Argument>;

    constructor() {
    }

    setNamedArguments(namedArgs: Record<string, Argument>) {
        this.namedArgs = namedArgs;
    }

    async getArgument(name: string): Promise<Argument> {
        return new Promise((resolve, reject) => {
            try {
                return resolve(this.namedArgs[name]);
            } catch (err) {
                return reject(err);
            }
        });
    }

    // Parse and extract arguments from the array
    parseArgs(array: string[]): Argument[] {
        // Parse the arguments out
        let args: Argument[] = [];
        for (const it of array) {
            if (it.match(/<@[&|!]?(\d+)>/g)) {
                let match = it.match(/<@[&|!]?(\d+)>/g);
                args.push({ type: 'MENTION', match: match![0] });
            }
            else if (it.match(/^(\d+)/g)) {
                let match = it.match(/(\d+)/g);
                args.push({ type: 'NUMBER', match: match![0] });
            }
            else {
                let arg = { type: 'STRING', match: it };
                args.push(arg);
                // TODO: handle quoted strings

                // for (const s of it.split(' ')) {
                //     let arg = { type: 'STRING', match: s };
                //     args.push(arg);
                // }
            }
        }

        console.log('args = ')
        console.log(args);

        return args;
    }
}