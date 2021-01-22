import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	pointer: {
		// width: 200,
		height: 40,
		position: 'relative',
		background: 'red',
		paddingLeft: 30,
		paddingRight: 10,

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			bottom: 0,
			width: 0,
			height: 0,
			borderLeft: '20px solid white',
			borderTop: '20px solid transparent',
			borderBottom: '20px solid transparent'
		},
		'&::before': {
			content: '""',
			position: 'absolute',
			right: -20,
			bottom: 0,
			width: 0,
			height: 0,
			borderLeft: '20px solid red',
			borderTop: '20px solid transparent',
			borderBottom: '20px solid transparent'
		}
	}
}))

const Logo = ({ text }) => {
	const classes = useStyles()

	return (
		<div style={{ display: 'inline-block' }}>
			<div className={classes.pointer}>{text}</div>
		</div>
	)
}

export default Logo
