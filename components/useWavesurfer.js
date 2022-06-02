import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import initWavesurfer from '../wavesurfer'

export default function usePlayer({
	mediaElementRef,
	waveformContainerRef,
	timelineContainerRef,
	videoId
}) {
	const [playerState, setPlayerState] = useState({
		isPlaying: false,
		currentTime: 0,
		duration: 0,
		isReady: false,
		playbackRate: 1,
		currentPhraseNum: 0,
		hideVideo: false,
		playOnePhrase: false,
		start: 0,
		end: 1
	})

	const wavesurferRef = useRef(null)

	useEffect(() => {
		const initWavesurfer0 = async () => {
			const wavesurfer = await initWavesurfer({
				waveformContainer: waveformContainerRef.current,
				timelineContainer: timelineContainerRef.current,
				mediaElement: mediaElementRef.current
			})

			wavesurfer.on('region-click', (region, event) => {
				event.stopPropagation()
				region.play()
			})

			wavesurferRef.current = wavesurfer
			setPlayerState(oldState => ({ ...oldState, isReady: true }))
			mediaElementRef.current.controls = true

			//set peaks loaded from the server
			const {
				data: { data: peaks }
			} = await axios(`http://localhost:3001/waveform/?id=${videoId}`)
			wavesurfer.backend.setPeaks(peaks, wavesurfer.getDuration())
			wavesurfer.drawBuffer()

			console.log('wavesurfer')
			console.log(wavesurfer)
		}
		initWavesurfer0()
		return () => {
			wavesurferRef.current.destroy()
		}
	}, [])

	return {
		wavesurfer: wavesurferRef.current,
		isReady: playerState.isReady
	}
}
