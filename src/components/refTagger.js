import { useState, useEffect } from 'react';

const addScript = (setScriptAdded) => {
	setScriptAdded(true);
	const el = document.createElement('script');
	el.type = 'text/javascript';
	el.async = true;
	el.src = 'https://api.reftagger.com/v2/RefTagger.js';
	document.getElementsByTagName('body')[0].appendChild(el);
};

const addRefTagger = ({
	bibleVersion = 'esv',
	dropShadow = false,
	tagChapters = true,
	roundCorners = true,
	socialSharing = [],
	customStyle,
}) => {
	window.refTagger = {
		settings: {
			bibleVersion,
			dropShadow,
			socialSharing,
			tagChapters,
			roundCorners,
			customStyle,
		},
	};
};

export const RefTagger = (props) => {
	const [scriptAdded, setScriptAdded] = useState(false);

	useEffect(() => {
		!scriptAdded && addScript(setScriptAdded);
		window && !window.refTagger && addRefTagger(props);
		window.refTagger && window.refTagger.tag && window.refTagger.tag();

		return () => window.refTagger.tag();
	}, []);

	return null;
};
