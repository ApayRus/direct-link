import {
	Button,
	Checkbox,
	FormControlLabel,
	TextField
} from '@material-ui/core'
import { useState } from 'react'

export default function AddCaptionsForm(props) {
	const { addCaptions } = props
	const [showForm, setShowForm] = useState(false)
	const [text, setText] = useState()
	const [languageCode, setLanguageCode] = useState()
	const [languageName, setLanguageName] = useState()
	const [rtl, setRtl] = useState(false)

	const handleAdd = () => {
		addCaptions({ languageCode, languageName, rtl, text })
		toggleShow()
	}

	const toggleShow = () => {
		setShowForm(oldState => !oldState)
	}

	const readFile = e => {
		e.preventDefault()
		const reader = new FileReader()

		reader.onload = e => {
			const text = e.target.result
			setText(text)
		}

		reader.readAsText(e.target.files[0])
	}

	return (
		<div>
			<Button
				variant='contained'
				color='primary'
				onClick={toggleShow}
				style={{ display: showForm ? 'none' : 'block' }}
			>
				Add Captions/Subtitles
			</Button>
			<form style={{ display: showForm ? 'block' : 'none' }}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						label='lang code'
						style={{ width: 100, marginRight: 10 }}
						onChange={event => setLanguageCode(event.target.value)}
					/>
					<TextField
						label='lang name'
						onChange={event => setLanguageName(event.target.value)}
					/>
					<input
						accept='.txt, .vtt, .srt, .ass'
						type='file'
						onChange={readFile}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={rtl}
								size='small'
								onChange={event => setRtl(event.target.checked)}
								color='primary'
							/>
						}
						label='rtl'
						title='writing direction Right to Left'
					/>
				</div>
				<div style={{ marginTop: 20 }}>
					<Button
						component='span'
						variant='contained'
						color='primary'
						onClick={handleAdd}
					>
						Add
					</Button>
					<Button component='span' variant='contained' onClick={toggleShow}>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	)
}
