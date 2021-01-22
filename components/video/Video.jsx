import React from 'react'

function Video({ captionTracks, urlVideo, poster }) {
	const subtitlesTracksForVideo = captionTracks.map((elem, index) => {
		const {
			baseUrl,
			languageCode,
			name: { simpleText: label }
		} = elem
		return (
			// doesn't work because of 'crosorigin' problems
			<track
				key={`${label}-${index}`}
				kind='captions'
				src={`${baseUrl}&fmt=vtt`}
				srcLang={languageCode}
				label={label}
			></track>
		)
	})

	return (
		<video controls src={urlVideo} poster={poster} style={{ width: '100%' }}>
			{subtitlesTracksForVideo}
		</video>
	)
}

export default Video
