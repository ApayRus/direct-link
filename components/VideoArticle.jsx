import { TextareaAutosize, Typography } from '@material-ui/core'
import SubtitleFileLinks from './video/SubtitleFileLinks'
import Keywords from './video/Keywords'
import Video from './video/Video'
import Thumbnails from './video/Thumbnails'
import ShowingModeSwitcher from './DisplayModeSwitcher'
import Phrases from './video/Phrases'
import { parseSubs } from 'frazy-parser'

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
		setCaptions,
		loadCaptions,
		selectedLangs,
		selectLang,
		addCaptions
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
				addCaptions={addCaptions}
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
		<Phrases selectedLangs={selectedLangs} captions={captions} />
	)

	const editBlock = (
		<TextareaAutosize
			style={{ width: '100%' }}
			defaultValue={captions[selectedLangs?.[0]]?.text}
			onBlur={event => {
				const {
					target: { value: text }
				} = event
				const [langCode] = selectedLangs
				const phrases = parseSubs(text)

				setCaptions(oldState => ({
					...oldState,
					[langCode]: { text, phrases }
				}))
			}}
		/>
	)

	return (
		<>
			<article>
				{displayMode === 'info' && titleBlock}
				{displayMode === 'info' && keywordsBlock}

				<div>
					<div
						style={{
							position: displayMode === 'transcript' ? 'sticky' : 'unset',
							top: 0,
							zIndex: 1
						}}
					>
						{videoBlock}
					</div>
					<div style={styles.block}>
						<ShowingModeSwitcher
							displayMode={displayMode}
							setDisplayMode={setDisplayMode}
						/>
					</div>
					{displayMode === 'transcript' && <div>{transcriptBlock}</div>}
					{displayMode === 'edit' && <div>{editBlock}</div>}
				</div>
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
