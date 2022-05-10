import { useEffect, useState } from 'react'
import ShowingModeSwitcher from './DisplayModeSwitcher'
import SubtitleFileLinks from './video/SubtitleFileLinks'

const VideoTranscript = props => {
	const {
		title,
		keywords,
		captionTracks,
		urlVideo,
		urlAudio,
		thumbnails,
		description,
		image: poster,
		setDisplayMode,
		displayMode
	} = props

	const [captions, setCaptions] = useState('')

	useEffect(() => {
		const [captionTrack] = captionTracks
		if (captionTrack) {
			const { baseUrl } = captionTrack
			fetch(`${baseUrl}&fmt=vtt`).then(response => {
				response.text().then(text => {
					setCaptions(text)
				})
			})
		}
	}, [captionTracks])

	return (
		<div>
			<div>Transcript </div>
			<ShowingModeSwitcher
				displayMode={displayMode}
				setDisplayMode={setDisplayMode}
			/>
			<SubtitleFileLinks captionTracks={captionTracks} showLabel={false} />
			<pre style={{ whiteSpace: 'pre-line' }}>{captions}</pre>
		</div>
	)
}

export default VideoTranscript
