import Search from '../components/Search'
import Logo from './Logo'
import DescriptionIcons from './DescriptionIcons'
import { Typography, Container, IconButton } from '@material-ui/core'
import { GitHub as GitHubIcon } from '@material-ui/icons'

import Head from './Head'

const Layout = ({ children, headProps = {} }) => {
	return (
		<div>
			{/* meta props */}
			<Head {...headProps} />

			<main>
				<Container maxWidth='sm'>
					<p />
					<div
						style={{
							textAlign: 'center'
						}}
					>
						<Typography
							variant='h1'
							style={{ fontSize: 35, width: '100%', textAlign: 'center' }}
						>
							<Logo text='Direct links' /> for Youtube's
						</Typography>
						<DescriptionIcons />
					</div>
					<p />
					<Search />
					<p />
					{children}
				</Container>
			</main>

			<footer
				style={{
					// position: 'absolute',
					bottom: 10,
					width: '100%',
					textAlign: 'center'
				}}
			>
				<IconButton
					href='https://github.com/aparus/direct-link'
					target='_blank'
					rel='noopener noreferrer'
				>
					<GitHubIcon />{' '}
				</IconButton>
			</footer>
		</div>
	)
}

export default Layout
