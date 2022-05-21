// import WaveSurfer from 'wavesurfer.js'
// import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import { useEffect, useRef, useState } from 'react'
import initWavesurfer from '../wavesurfer'

export default function usePlayer({
	mediaElementRef,
	phrases = [],
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
				regions: phrases,
				mediaElement: mediaElementRef.current,
				peaks
			})
			wavesurferRef.current = wavesurfer
			console.log('wavesurfer')
			console.log(wavesurfer)
		}
		initWavesurfer0()
	}, [])

	const wafesurferRef = useRef(null)

	const { currentPhraseNum } = playerState

	const onTimeUpdate = event => {
		//setPlayerState(oldState => ({...oldState, curre}))
		const {
			target: { currentTime }
		} = event

		const { end: currentPhaseEnd } = phrases[currentPhraseNum] || {}

		if (
			currentTime > currentPhaseEnd &&
			currentPhraseNum < phrases.length - 1
		) {
			setPlayerState(prevState => ({
				...prevState,
				currentPhraseNum: currentPhraseNum + 1
			}))
		}
	}

	return { onTimeUpdate, currentPhraseNum, wavesurfer: wafesurferRef.current }
}
