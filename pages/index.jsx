import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Search from '../components/Search'
import { Typography, Container } from '@material-ui/core'

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
						<Typography variant='body1'>video</Typography>{' '}
						<Typography variant='body1'>audio</Typography>
						<Typography variant='body1'>subtitles</Typography>
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
