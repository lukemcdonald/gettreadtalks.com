import React, { Component } from 'react';

export default class RefTagger extends Component {
	constructor(props) {
		super(props);

		const defaultSettings = {
			bibleVersion: 'ESV',
			noSearchClassNames: ['no-reftagger'],
			socialSharing: [],
			tagChapters: true,
			roundCorners: true,
			customStyle: {
				heading: {
					backgroundColor: '#111827',
					color: '#ffffff',
				},
				body: {
					backgroundColor: '#ffffff',
					color: '#4b5563',
				},
			},
		};

		if (typeof window !== 'undefined' && window !== null) {
			if (window.refTagger == null) {
				window.refTagger = {
					settings: {
						...defaultSettings,
						...props.settings,
					},
				};
			}
		}
	}

	componentDidMount() {
		if (!RefTagger.scriptIsAdded) {
			return this.addScript();
		}
		window.refTagger.tag();
	}

	componentDidUpdate() {
		window.refTagger.tag();
	}

	addScript() {
		RefTagger.scriptIsAdded = true;

		const scriptElem = document.createElement('script');
		const scriptTag = document.getElementsByTagName('script')[0];
		scriptElem.src = '//api.reftagger.com/v2/RefTagger.js';
		scriptTag.parentNode.insertBefore(scriptElem, scriptTag);
	}

	render() {
		return <div className="hidden" />;
	}
}

RefTagger.scriptIsAdded = false;
