import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const DisplayModeSwitcher = props => {
	const { displayMode, setDisplayMode } = props

	return (
		<nav>
			<ButtonGroup
				size='small'
				color='primary'
				aria-label='small outlined button group'
			>
				<Button
					variant={displayMode === 'info' ? 'contained' : 'outlined'}
					onClick={() => setDisplayMode('info')}
				>
					All Info
				</Button>
				<Button
					variant={displayMode === 'transcript' ? 'contained' : 'outlined'}
					onClick={() => setDisplayMode('transcript')}
				>
					Transcript
				</Button>
			</ButtonGroup>
		</nav>
	)
}

export default DisplayModeSwitcher
