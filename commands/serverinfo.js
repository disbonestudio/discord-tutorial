const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    alliases: ['s', 'server'],
    description: '??? ??????? ???????',
    
    execute(message, args) {
        const { guild } = message;

        const embed = new EmbedBuilder()
        .setTitle('server info ')                                                                           // ????? ??????
        .setThumbnail(guild.iconURL())                                                                         // ???? ????? ??????
        .addFields(                                                                                           // ???????
            { name: 'server name', value: `${guild.name}`, inline: true },
            { name: 'server date', value: `${guild.createdAt.toDateString()}`, inline: true },
            { name: 'member count', value: `${guild.memberCount}`, inline: true },
            { name: 'owner server', value: `<@${guild.ownerId}>`, inline: true },

        )
        .setColor('#ff0000')                                                           // ??? ??????
        .setFooter({ text: 'Wick Studio', iconURL:guild.iconURL()  })    // ?????? ?????? ??????
        .setTimestamp();                                                             // ??? ????? ??????

        message.channel.send({ embeds: [embed] }); // ????? ?????? ????? ??? ?????? ??? ?????
    },
};
