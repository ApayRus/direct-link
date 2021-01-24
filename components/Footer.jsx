import { IconButton } from '@material-ui/core'
import { GitHub as GitHubIcon } from '@material-ui/icons'

const Footer = () => {
	return (
		<footer style={{ flex: 1, maxHeight: 100 }}>
			<IconButton
				href='https://github.com/aparus/direct-link'
				target='_blank'
				rel='noopener noreferrer'
			>
				<GitHubIcon />{' '}
			</IconButton>
		</footer>
	)
}

export default Footer
