import { Typography } from '@material-ui/core'
import SubtitleFileLinks from './video/SubtitleFileLinks'
import Keywords from './video/Keywords'
import Video from './video/Video'
import Thumbnails from './video/Thumbnails'
import ShowingModeSwitcher from './DisplayModeSwitcher'

const VideoInfo = props => {
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
		displayMode,
		captions,
		loadCaptions,
		selectedLangs,
		selectLang
	} = props

	const titleBlock = (
		<div style={styles.block}>
			<Typography style={{ fontSize: 40, textAlign: 'center' }} variant='h1'>
				{title}
			</Typography>
		</div>
	)

	const keywordsBlock = (
		<div style={styles.block}>
			<Keywords keywords={keywords} />
		</div>
	)

	const videoBlock = (
		<Video captionTracks={captionTracks} urlVideo={urlVideo} poster={poster} />
	)

	const audioBlock = (
		<div style={styles.block}>
			<audio controls src={urlAudio} style={{ width: '100%' }} />
		</div>
	)

	const captionsBlock = (
		<div style={styles.block}>
			<Typography style={{ fontSize: 20 }} variant='h3'>
				Captions/Subtitles:
			</Typography>
			<SubtitleFileLinks
				captionTracks={captionTracks}
				loadCaptions={loadCaptions}
				selectedLangs={selectedLangs}
				selectLang={selectLang}
			/>
			<p />
		</div>
	)

	const thumbnailsBlock = (
		<div style={styles.block}>
			<Typography style={{ fontSize: 20 }} variant='h3'>
				Thumbnails:
			</Typography>
			<p />
			<Thumbnails thumbnails={thumbnails} />
		</div>
	)

	const descriptionBlock = (
		<div style={styles.block}>
			<Typography style={{ fontSize: 20 }} variant='h3'>
				Description:
			</Typography>
			<p />
			<Typography
				style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
				variant='body2'
			>
				{description}
			</Typography>
		</div>
	)

	const transcriptBlock = (
		<pre style={{ maxWidth: 360 }}>
			xxx{/* {JSON.stringify(captions, null, 2)} */}
		</pre>
	)

	return (
		<>
			<article>
				{displayMode === 'info' && titleBlock}
				{displayMode === 'info' && keywordsBlock}
				{videoBlock}
				<ShowingModeSwitcher
					displayMode={displayMode}
					setDisplayMode={setDisplayMode}
				/>
				{displayMode === 'transcript' && transcriptBlock}
				{JSON.stringify(selectedLangs)}
				{displayMode === 'info' && audioBlock}
				{displayMode === 'info' && captionsBlock}
				{displayMode === 'info' && thumbnailsBlock}
				{displayMode === 'info' && descriptionBlock}
			</article>
		</>
	)
}

const styles = {
	block: { marginBottom: 10, marginTop: 10 }
}

export default VideoInfo
