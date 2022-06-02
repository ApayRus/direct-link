import { Container, Typography } from '@material-ui/core'
import CaptionList from './CaptionList'
import Keywords from './video/Keywords'
import Thumbnails from './video/Thumbnails'
import ShowingModeSwitcher from './DisplayModeSwitcher'
import Phrases from './video/Phrases'
import { useRef, createContext, useContext } from 'react'
import useCaptions from './useCaptions'
import useWavesurfer from './useWavesurfer'

import EditCaptionTextarea from './EditCaptionTextarea'
import { SnackbarContext } from './SnackbarProvider'

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
		displayMode,
		videoId
	} = props

	const { setSnackbar } = useContext(SnackbarContext)

	const videoRef = useRef(null)
	const audioRef = useRef(null)
	const waveformContainerRef = useRef(null)
	const timelineContainerRef = useRef(null)

	const { wavesurfer, isReady } = useWavesurfer({
		mediaElementRef: videoRef,
		waveformContainerRef,
		timelineContainerRef,
		videoId
	})

	const captionContextValue = useCaptions({
		captionTracksYoutube,
		setSnackbar,
		wavesurfer
	})

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
			ref={videoRef}
			controls
			src={urlVideo}
			poster={poster}
			style={{ width: '100%' }}
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

	const transcriptBlock = <Phrases mediaRef={videoRef.current} />

	return (
		<div>
			<CaptionContext.Provider value={captionContextValue}>
				<article>
					<Container>
						{displayMode === 'info' && titleBlock}
						{displayMode === 'info' && keywordsBlock}
					</Container>
					<div
						style={{
							position: displayMode === 'transcript' ? 'sticky' : 'unset',
							top: 0,
							zIndex: 1
						}}
					>
						<Container maxWidth={displayMode === 'info' ? 'sm' : 'xs'}>
							{videoBlock}
						</Container>
					</div>
					<div ref={waveformContainerRef} />
					<div ref={timelineContainerRef} />
					<Container>
						<div style={{ margin: 10, textAlign: 'center' }}>
							<ShowingModeSwitcher
								displayMode={displayMode}
								setDisplayMode={setDisplayMode}
							/>
						</div>
						{displayMode === 'transcript' && (
							<Container maxWidth='xs'>{transcriptBlock}</Container>
						)}
						{displayMode === 'edit' && (
							<div>
								<EditCaptionTextarea />
							</div>
						)}
					</Container>
					{displayMode === 'info' && (
						<div>
							<Container maxWidth={displayMode === 'info' ? 'sm' : 'xs'}>
								{audioBlock}
							</Container>
							<Container>{captionsBlock}</Container>
							<Container maxWidth={displayMode === 'info' ? 'sm' : 'xs'}>
								{thumbnailsBlock}
								{descriptionBlock}
							</Container>
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
