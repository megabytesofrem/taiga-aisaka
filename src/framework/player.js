import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";

import ytdl from 'ytdl-core-discord';

export async function playQueue(queue, voiceChannel, interaction) {
    var connection;

    try {
        connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });
    } catch (error) {
        console.error(error);
        return;
    }

    let audioPlayer = null;

    async function playerIdle() {
        if (queue.playing) {
            queue.playing = false;
            queue.songs.shift();
        }

        if  (queue.songs.length > 0) {
            await play(queue.songs[0]);
        }
    }

    async function play(item) {
        if (!audioPlayer) {
            audioPlayer = createAudioPlayer();
            audioPlayer.on(AudioPlayerStatus.Idle, playerIdle);
            connection.subscribe(audioPlayer);
        }

        const stream = await ytdl(item.url);
        const audioResource = createAudioResource(stream);
        queue.playing = true;

        audioPlayer.play(audioResource);
    }

    if (queue.songs.length > 0) {
        play(queue.songs[0]);
    }
}