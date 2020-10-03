import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Search from '../components/Search'
import {
	Typography,
	Container,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core'
import {
	Subtitles as SubtitlesIcon,
	OndemandVideo as VideoIcon,
	MusicVideo as AudioIcon
} from '@material-ui/icons'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<Container maxWidth='sm'>
					<p />
					<div style={{ textAlign: 'center' }}>
						<Typography variant='h1' style={{ fontSize: 35 }}>
							Direct links for Youtube's
						</Typography>
						<List style={{ display: 'flex', flexDirection: 'row' }}>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon>
									<VideoIcon />
								</ListItemIcon>
								<ListItemText>video</ListItemText>
							</ListItem>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon>
									<AudioIcon />
								</ListItemIcon>
								<ListItemText>audio</ListItemText>
							</ListItem>
							<ListItem style={{ flex: 1 }}>
								<ListItemIcon>
									<SubtitlesIcon />
								</ListItemIcon>
								<ListItemText>subtitles</ListItemText>
							</ListItem>
						</List>
					</div>
					<p />
					<Search />
					<p />
					<div style={{ textAlign: 'center' }}>
						<img
							style={{ border: '1px solid skyblue' }}
							src='https://user-images.githubusercontent.com/1222611/92627876-a85ee000-f2d4-11ea-8dbb-14ab4eb0065a.png'
						/>
					</div>
				</Container>
			</main>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by{' '}
					<img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
				</a>
			</footer>
		</div>
	)
}
