import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
	pointer: {
		// width: 200,
		height: 40,
		position: 'relative',
		background: theme.palette.primary.main,
		paddingLeft: 30,
		paddingRight: 10,
		marginRight: 20,

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
			borderLeft: `20px solid ${theme.palette.primary.main}`,
			borderTop: '20px solid transparent',
			borderBottom: '20px solid transparent'
		}
	}
}))

const Logo = ({ text }) => {
	const classes = useStyles()

	return (
		<Link href='/'>
			<div style={{ cursor: 'pointer', display: 'inline-block' }}>
				<div className={classes.pointer}>{text}</div>
			</div>
		</Link>
	)
}

export default Logo
