import { parseSubs } from 'frazy-parser'
import { useState } from 'react'

export default function useCaptions(captionTracksYoutube) {
	// captionTracks - it's available caption meta info,
	// captions - it's loaded captions: text and parsed phrases

	const [captionTracks, setCaptionTracks] = useState(
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
	)

	const [captions, setCaptions] = useState({})

	const [selectedLangs, setSelectedLangs] = useState([])

	const loadCaptions = languageCode => {
		const captionTrack = captionTracks.find(
			elem => elem.languageCode === languageCode
		)
		if (captionTrack) {
			const { baseUrl, languageCode } = captionTrack

			fetch(`${baseUrl}&fmt=vtt`).then(response => {
				response.text().then(text => {
					setCaptions(oldState => {
						const phrases = parseSubs(text)
						return {
							...oldState,
							[languageCode]: { text, phrases }
						}
					})
				})
			})
		}
	}

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

	return {
		captions,
		captionTracks,
		setCaptions,
		loadCaptions,
		selectedLangs,
		selectLang,
		addCaptions
	}
}
