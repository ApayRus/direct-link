import { Typography } from '@material-ui/core'
import CaptionList from './CaptionList'
import Keywords from './video/Keywords'
import Video from './video/Video'
import Thumbnails from './video/Thumbnails'
import ShowingModeSwitcher from './DisplayModeSwitcher'
import Phrases from './video/Phrases'
import { useRef, useEffect, createContext } from 'react'
import useCaptions from './useCaptions'
import usePlayer from './usePlayer'
import peaks from './peaks'
import initWavesurfer from '../wavesurfer'
import EditCaptionTextarea from './EditCaptionTextarea'

export const CaptionContext = createContext()

const VideoInfo = props => {
	const {
		title,
		keywords,
		captionTracks: captionTracksYoutube,
		urlVideo,
		urlAudio,
		thumbnails,
		description,
		image: poster,
		setDisplayMode,
		displayMode
	} = props

	const captionContextValue = useCaptions(captionTracksYoutube)

	const { captions, selectedLangs } = captionContextValue

	const mediaRef = useRef(null)
	const audioRef = useRef(null)
	const waveformRef = useRef(null)
	const timelineRef = useRef(null)
	const wavesurferRef = useRef(null)

	const { phrases: mainPhrases } = captions[selectedLangs[0] || 'en'] || {}

	const { onTimeUpdate, currentPhraseNum } = usePlayer({
		media: mediaRef.current,
		waveformContainer: waveformRef.current,
		phrases: mainPhrases
	})

	useEffect(() => {
		const initWavesurfer0 = async () => {
			const wavesurfer = await initWavesurfer({
				waveformContainer: waveformRef.current,
				timelineContainer: timelineRef.current,
				regions: mainPhrases,
				mediaElement: mediaRef.current,
				peaks
			})
			wavesurferRef.current = wavesurfer
			console.log('wavesurfer')
			console.log(wavesurfer)
		}
		initWavesurfer0()
	}, [])

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
		<video
			ref={mediaRef}
			controls
			src={urlVideo}
			// src='http://localhost:3000/videoplayback.m4a'
			// src='http://localhost:3000/nevzuk.mp4'
			poster={poster}
			style={{ width: '100%' }}
			onTimeUpdate={onTimeUpdate}
		></video>
	)

	const audioBlock = (
		<div style={styles.block}>
			<audio ref={audioRef} controls src={urlAudio} style={{ width: '100%' }} />
		</div>
	)

	const captionsBlock = (
		<div style={styles.block}>
			<Typography style={{ fontSize: 20 }} variant='h3'>
				Captions/Subtitles:
			</Typography>
			<CaptionList />
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

	const transcriptBlock = <Phrases mediaRef={mediaRef.current} />

	return (
		<div>
			<CaptionContext.Provider value={captionContextValue}>
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
						<div ref={waveformRef} />
						<div ref={timelineRef} />
						<div style={styles.block}>
							<ShowingModeSwitcher
								displayMode={displayMode}
								setDisplayMode={setDisplayMode}
							/>
						</div>
						{displayMode === 'transcript' && <div>{transcriptBlock}</div>}
						{displayMode === 'edit' && (
							<div>
								<EditCaptionTextarea />
							</div>
						)}
					</div>
					{displayMode === 'info' && (
						<div>
							{audioBlock}
							{captionsBlock}
							{thumbnailsBlock}
							{descriptionBlock}
						</div>
					)}
				</article>
			</CaptionContext.Provider>
		</div>
	)
}

const styles = {
	block: { marginBottom: 10, marginTop: 10 }
}

export default VideoInfo
