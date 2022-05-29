/**
 * we need wavesurfer instance here to add/remove regions
 */
import { parseSubs } from 'frazy-parser'
import { useEffect, useRef, useState } from 'react'

const prepareCaptionTracks = captionTracksYoutube =>
	captionTracksYoutube.map(track => {
		const {
			name: { simpleText: languageName },
			languageCode,
			...restTrack
		} = track

		const langCode = languageName.includes('auto')
			? languageCode + '-auto'
			: languageCode // we need auto-prefix to avoid double select by similar code

		return {
			...restTrack,
			languageName,
			languageCode: langCode,
			sources: ['youtube']
		}
	})

export default function useCaptions({
	captionTracksYoutube,
	setSnackbar,
	wavesurfer
}) {
	// captionTracks - it's available caption meta info,
	// captions - it's loaded captions: text and parsed phrases

	const initCaptionTracks = prepareCaptionTracks(captionTracksYoutube)

	// MAIN STATE
	const [captionTracks, setCaptionTracks] = useState(initCaptionTracks)
	const [captions, setCaptions] = useState({})
	const [selectedLangs, setSelectedLangs] = useState([])

	const wavesurferRef = useRef(null)

	const loadCaptions = async languageCode => {
		const captionTrack = captionTracks.find(
			elem => elem.languageCode === languageCode
		)
		if (captionTrack) {
			const { baseUrl, languageCode } = captionTrack
			const response = await fetch(`${baseUrl}&fmt=vtt`)
			const text = await response.text()

			setCaptions(oldState => {
				const phrases = parseSubs(text)
				const newState = {
					...oldState,
					[languageCode]: { text, phrases }
				}
				return newState
			})
		}
	}
	// when user choose a local file
	const addCaptions = ({
		languageCode,
		languageName,
		text,
		rtl = false,
		sources = ['local'] // | youtube
	}) => {
		setCaptionTracks(oldState => {
			const newTrack = {
				languageCode,
				languageName,
				rtl,
				sources // | youtube
			}
			return [...oldState, newTrack]
		})

		setCaptions(oldState => {
			const phrases = parseSubs(text)
			return {
				...oldState,
				[languageCode]: { text, phrases }
			}
		})
	}

	const selectLang = languageCode => {
		// unselect
		if (selectedLangs.includes(languageCode)) {
			setSelectedLangs(oldState =>
				oldState.filter(elem => elem !== languageCode)
			)
		}
		// select
		else {
			setSelectedLangs(oldState => [...oldState, languageCode])
		}
	}

	const addSource = (languageCode, source) => {
		setCaptionTracks(oldState => {
			const index = oldState.findIndex(
				elem => elem.languageCode === languageCode
			)
			const element = oldState[index]
			const { sources: oldSources } = element
			const newState = [...oldState]
			newState[index] = { ...element, sources: [...oldSources, source] }
			return newState
		})
	}

	const captionTextEdited = event => {
		const {
			target: { value: text }
		} = event
		const [langCode] = selectedLangs
		const phrases = parseSubs(text)

		setCaptions(oldState => ({
			...oldState,
			[langCode]: { text, phrases }
		}))
	}

	const setRegions = phrases => {
		wavesurfer.clearRegions()
		phrases.forEach(phrase => {
			wavesurfer.addRegion(phrase)
		})
	}
	const clearRegions = () => {
		wavesurfer?.clearRegions()
	}

	const langAvatarClickHandler = async (languageCode, sources) => {
		if (sources.includes('local')) {
			selectLang(languageCode)
		} /*  (!sources.includes('local')) */ else {
			try {
				await loadCaptions(languageCode)
				addSource(languageCode, 'local')
				selectLang(languageCode)
			} catch (e) {
				setSnackbar({
					open: true,
					message: 'cannot download subtitles',
					severity: 'error'
				})
			}
		}
	}

	// when we choose 1st lang, it will be phrases for media file ({start, end})
	// for waveform regions and for playing
	useEffect(() => {
		if (selectedLangs.length >= 1) {
			const [languageCode] = selectedLangs
			const { phrases = [] } = captions[languageCode]
			setRegions(phrases)
		}
		if (selectedLangs.length === 0) {
			clearRegions()
		}
	}, [captions, selectedLangs])

	return {
		captions,
		captionTracks,
		setCaptions,
		selectedLangs,
		addCaptions,
		langAvatarClickHandler,
		captionTextEdited,
		setRegions
	}
}
