import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../framework/command';

import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';
import { child } from "child_process";

function ttsStream(text) {
    const espeak = child.spawn("espeak", ["-s", "125", "-v", "en+f5", text, "--stdout"])
    const ffmpeg = child.spawn("ffmpeg", ["-i", "-", "-ar", "44100", "-ac", "2", "-ab", "192k", "-f", "mp3", "-"])
    espeak.stdout.pipe(ffmpeg.stdin)

    return ffmpeg.stdout
}

export class TTSCommand extends Command {
    constructor(name, category, desc) {
        super(name, category, desc);
        this._builder.addStringOption(option => 
            option.setName('input')
                .setDescription('Test input to test the command API')
                .setRequired(true));
    }

    getBuilder() {
        return this._builder;
    }

    async handler(client, interaction) {
        const chan = interaction.member.voice.channel;

        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
            channelId: chan.id,
            guildId: chan.guild.id,
            adapterCreator: chan.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(ttsStream(interaction.options.getString("input")));
        connection.subscribe(player);
        player.play(resource);

        await interaction.reply('Hello senpai~!');
    }
}

export const instance = new TTSCommand('tts', 'media', 'play description');