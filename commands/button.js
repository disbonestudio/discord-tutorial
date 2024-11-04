const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Ban a user',

	async execute(message, args) {
		const target = message.mentions.users.first();
		const reason = args.slice(1).join(' ') || 'No reason provided';

		// Ensure a user was mentioned
		if (!target) {
			return message.reply('Please mention a user to ban.');
		}

		const confirmButton = new ButtonBuilder()
			.setCustomId('confirm-ban')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(confirmButton);

		const confirmationMessage = await message.reply({
			content: `Are you sure you want to ban ${target.tag} for reason: ${reason}?`,
			components: [row],
		});

		// Set up a collector to wait for the button click
		const filter = (interaction) => interaction.customId === 'confirm-ban' && interaction.user.id === message.author.id;
		const collector = confirmationMessage.createMessageComponentCollector({ filter, time: 15000 }); // 15-second timeout

		collector.on('collect', async (interaction) => {
			// Check if the bot has permission to ban the user
			if (!message.guild.members.cache.get(target.id).bannable) {
				await interaction.reply({ content: `I can't ban ${target.tag}.`, ephemeral: true });
				return;
			}

			try {
				// Ban the user with the specified reason
				await message.guild.members.ban(target, { reason });
				await interaction.reply({ content: `${target.tag} has been banned! Reason: ${reason}`, ephemeral: true });
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: `Failed to ban ${target.tag}.`, ephemeral: true });
			}
		});

		collector.on('end', collected => {
			// Remove buttons if no one confirmed within the time limit
			if (collected.size === 0) {
				confirmationMessage.edit({ content: 'Ban confirmation timed out. No action was taken.', components: [] });
			}
		});
	},
};
