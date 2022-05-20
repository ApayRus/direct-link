import { TextareaAutosize } from '@material-ui/core'
import { useContext } from 'react'
import { CaptionContext } from './VideoArticle'
import { parseSubs } from 'frazy-parser'

export default function EditCaptionTextarea() {
	const { captions, selectedLangs, setCaptions } = useContext(CaptionContext)

	return (
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
}
