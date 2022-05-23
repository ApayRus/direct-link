// import WaveSurfer from 'wavesurfer.js'
// import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import { useEffect, useRef, useState } from 'react'
import initWavesurfer from '../wavesurfer'

export default function usePlayer({
	mediaElementRef,
	waveformContainerRef,
	timelineContainerRef,
	peaks
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
				mediaElement: mediaElementRef.current,
				peaks
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

	const onTimeUpdate = event => {
		//setPlayerState(oldState => ({...oldState, curre}))
		const {
			target: { currentTime }
		} = event
	}

	return {
		onTimeUpdate,
		wavesurfer: wavesurferRef.current,
		isReady: playerState.isReady
	}
}
