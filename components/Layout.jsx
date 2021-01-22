import styles from '../styles/Home.module.css'
import Search from '../components/Search'
import Logo from './Logo'
import {
	Typography,
	Container,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton
} from '@material-ui/core'
import {
	Subtitles as SubtitlesIcon,
	OndemandVideo as VideoIcon,
	MusicVideo as AudioIcon,
	Image as ThumbnailIcon,
	GitHub as GitHubIcon
} from '@material-ui/icons'

import Head from './Head'

const Layout = ({ children, headProps = {} }) => {
	return (
		<div>
			{/* meta props */}
			<Head {...headProps} />

			<main>
				<Container maxWidth='sm'>
					<p />
					<div style={{ textAlign: 'center' }}>
						<Typography variant='h1' style={{ fontSize: 35 }}>
							<Logo text='Direct links' /> for Youtube's
						</Typography>
						<List style={{ display: 'flex', flexDirection: 'row' }}>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon style={{ minWidth: 30 }}>
									<VideoIcon />
								</ListItemIcon>
								<ListItemText>video</ListItemText>
							</ListItem>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon style={{ minWidth: 30 }}>
									<AudioIcon />
								</ListItemIcon>
								<ListItemText>audio</ListItemText>
							</ListItem>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon style={{ minWidth: 30 }}>
									<SubtitlesIcon />
								</ListItemIcon>
								<ListItemText>subtitles</ListItemText>
							</ListItem>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon style={{ minWidth: 30 }}>
									<ThumbnailIcon />
								</ListItemIcon>
								<ListItemText>thumbnails</ListItemText>
							</ListItem>
						</List>
					</div>
					<p />
					<Search />
					<p />
					{children}
				</Container>
			</main>

			<footer className={styles.footer}>
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
