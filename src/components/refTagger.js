import React, { Component } from 'react';

export default class RefTagger extends Component {
	constructor(props) {
		super(props);

		const defaultSettings = {
			bibleVersion: 'ESV',
			noSearchClassNames: ['no-reftagger'],
			socialSharing: [],
			tagChapters: true,
			customStyle: {
				heading: {
					backgroundColor: '#222020',
					color: '#ffffff',
				},
				body: {
					backgroundColor: '#ffffff',
					color: '#4a4848',
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
		// window.refTagger.tag();
	}

	addScript() {
		RefTagger.scriptIsAdded = true;

		const script = document.createElement('script');
		script.src = 'https://api.reftagger.com/v2/RefTagger.js';
		script.async = true;
		return document.body.appendChild(script);
	}

	render() {
		return <div style={{ display: 'none' }} />;
	}
}

RefTagger.scriptIsAdded = false;
