const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    alliases: ['u', 'ui'],
    description: 'Get user info',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.mentions.members.first() || message.member;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${user.username}`, iconURL: user.displayAvatarURL() })
            .setTitle('Member Info')
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: 'Username', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Created At', value: user.createdAt.toLocaleString(), inline: true },
                { name: 'Bot?', value: user.bot ? 'Yes' : 'No', inline: true },
                { name: 'Status', value: user.presence ? user.presence.status : 'Offline', inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', ') || 'No Roles', inline: true }
            );

        message.channel.send({ embeds: [embed] });
    }
};
