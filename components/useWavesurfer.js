import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import initWavesurfer from '../wavesurfer'

export default function usePlayer({
	mediaElementRef,
	waveformContainerRef,
	timelineContainerRef,
	videoId,
	setSnackbar
}) {
	const [playerState, setPlayerState] = useState({
		isPlaying: false,
		currentTime: 0,
		duration: 0,
		isReady: false,
		isPeaksLoaded: false,
		playbackRate: 1,
		currentPhraseId: 0,
		hideVideo: false,
		playOnePhrase: false,
		start: 0,
		end: 1
	})

	const wavesurferRef = useRef(null)
	const peaksRef = useRef(null)

	//
	useEffect(() => {
		const initWavesurfer0 = async () => {
			const wavesurfer = await initWavesurfer({
				waveformContainer: waveformContainerRef.current,
				timelineContainer: timelineContainerRef.current,
				mediaElement: mediaElementRef.current
			})

			wavesurferRef.current = wavesurfer
			setPlayerState(oldState => ({ ...oldState, isReady: true }))
			mediaElementRef.current.controls = true

			console.log('wavesurfer')
			console.log(wavesurfer)
		}
		initWavesurfer0()
		return () => {
			wavesurferRef.current.destroy()
		}
	}, [])

	// load waveform peaks from the server
	useEffect(() => {
		axios(`http://localhost:3001/waveform/?id=${videoId}`)
			.then(response => {
				const {
					data: { data }
				} = response
				peaksRef.current = data
				setPlayerState(oldState => ({ ...oldState, isPeaksLoaded: true }))
			})
			.catch(err => {
				setSnackbar({
					open: true,
					message: `cannot load waveform peaks, ${err.message}`,
					severity: 'error'
				})
			})
	}, [])

	// set (draw) peaks
	useEffect(() => {
		const wavesurfer = wavesurferRef.current
		const { isPeaksLoaded, isReady } = playerState
		if (isPeaksLoaded && isReady) {
			wavesurfer.backend.setPeaks(peaksRef.current, wavesurfer.getDuration())
			wavesurfer.drawBuffer()
		}
	}, [playerState])

	// event handlers
	useEffect(() => {
		const wavesurfer = wavesurferRef.current
		if (playerState.isReady) {
			wavesurfer.on('region-click', (region, event) => {
				event.stopPropagation()
				region.play()
			})

			// wavesurfer.on('region-in', (region, event) => {
			// 	setPlayerState(oldState => ({
			// 		...oldState,
			// 		currentPhraseId: region.id
			// 	}))
			// })
		}
	}, [playerState.isReady])

	return {
		wavesurfer: wavesurferRef.current,
		isReady: playerState.isReady,
		currentPhraseId: playerState.currentPhraseId
	}
}
