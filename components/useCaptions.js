import { parseSubs } from 'frazy-parser'
import { useState } from 'react'

export default function useCaptions(captionTracksYoutube) {
	// captionTracks - it's available caption meta info,
	// captions - it's loaded captions: text and parsed phrases


	const [captions, setCaptions] = useState({})

	const [selectedLangs, setSelectedLangs] = useState([])

	const loadCaptions = languageCode => {
		const captionTrack = captionTracks.find(
			elem => elem.languageCode === languageCode
		)
		if (captionTrack) {
			const {
				baseUrl,
				name: { simpleText: label }
			} = captionTrack

			const langCode = label.includes('auto')
				? languageCode + '-auto'
				: languageCode

			fetch(`${baseUrl}&fmt=vtt`).then(response => {
				response.text().then(text => {
					setCaptions(oldState => {
						const phrases = parseSubs(text)
						return {
							...oldState,
							[langCode]: { text, phrases }
						}
					})
				})
			})
		}
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

	return {
		captions,
		loadCaptions,
		selectedLangs,
		selectLang
	}
}
