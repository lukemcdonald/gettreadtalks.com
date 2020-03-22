export const parseVideoUrl = (url) => {
	// - Supported YouTube URL formats:
	//   - http://www.youtube.com/watch?v=My2FRPA3Gf8
	//   - http://youtu.be/My2FRPA3Gf8
	//   - https://youtube.googleapis.com/v/My2FRPA3Gf8
	//   - https://m.youtube.com/watch?v=My2FRPA3Gf8
	// - Supported Vimeo URL formats:
	//   - http://vimeo.com/25451551
	//   - http://player.vimeo.com/video/25451551
	// - Also supports relative URLs:
	//   - //player.vimeo.com/video/25451551

	let type = '';

	url.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\S+)?/);

	if (RegExp.$3.indexOf('youtu') > -1) {
		type = 'youtube';
	} else if (RegExp.$3.indexOf('vimeo') > -1) {
		type = 'vimeo';
	}

	return {
		type,
		id: RegExp.$6
	};
}

/**
 * @link https://depone.dev/video/
 */
export const getVideoImage = ( url ) => {
	var videoDetails = parseVideoUrl( url );
	var videoType = videoDetails.type;
	var videoID = videoDetails.id;
	var videoImage = {
		src: '',
	};

	if ( 'youtube' === videoType ) {
		videoImage.src = getYoutubeVideoSrc(videoID);
	}

	if ( 'vimeo' ===  videoType ) {
		videoImage.src = getVimeoImageSrc(videoID);
	}

	return videoImage;
}

const getYoutubeVideoSrc = (videoID) => {
	return `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
}

const getVimeoImageSrc = (videoID) => {
	return fetch(`https://vimeo.com/api/v2/video/${videoID}.json`)
	.then((response) => response.json())
	.then((data) => {
		const thumbSplit = data[0].thumbnail_large.split(/\d{3}(?=.jpg)/);
		return thumbSplit[0] + '1280x720' + thumbSplit[1];
	})
	.catch(error => console.log(error));
}
