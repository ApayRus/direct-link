import { useContext } from 'react'
import { SnackbarContext } from './SnackbarProvider'
import SnackbarMUI from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default function Snackbar() {
	const { snackbar, setSnackbar } = useContext(SnackbarContext)
	const { open, message, severity } = snackbar

	const handleClose = () => {
		setSnackbar({ open: false, message: '' })
	}

	return (
		<SnackbarMUI
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			open={open}
			autoHideDuration={4000}
			onClose={handleClose}
		>
			<Alert /* elevation={6} */ variant='filled' severity={severity}>
				{message}
				<IconButton
					size='small'
					aria-label='close'
					color='inherit'
					onClick={handleClose}
				>
					<CloseIcon fontSize='small' />
				</IconButton>
			</Alert>
		</SnackbarMUI>
	)
}
