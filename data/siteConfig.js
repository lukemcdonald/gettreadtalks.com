const tailwind = require('../tailwind');

module.exports = {
	siteTitle: 'TREAD Talks',
	siteTagline: 'Weekly sermons to elevate your spiritual heartbeat.',
	siteDescription: 'Weekly sermons to elevate your spiritual heartbeat.',
	siteIcon: 'src/assets/images/favicon.png',
	siteUrl: 'https://gettreadtalks.com',
	socialLinks: [
		{
			label: 'Facebook',
			url: 'https://www.facebook.com/gettreadtalks/',
		},
		{
			label: 'Twitter',
			url: 'https://twitter.com/gettreadtalks',
		},
	],
	copyright: `©TREAD Talks 2018`,
	themeColor: tailwind.colors.brand,
	backgroundColor: tailwind.colors.brand,
};
