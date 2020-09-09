import {
	Chip,
	Container,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar
} from '@material-ui/core'

import Head from 'next/head'

const VideoPage = ({
	title,
	description: { simpleText: description = '' },
	keywords,
	urlVideo,
	urlAudio,
	captionTracks
}) => {
	const keywordsBlock = (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords.join(', ')} />
			</Head>

			{keywords.map((elem, index) => {
				const colors = [
					'#115293',
					'#9a0036',
					'#d32f2f',
					'#f57c00',
					'#1976d2',
					'#388e3c'
				]
				const randomIndex = Math.floor(Math.random() * colors.length)
				const randomColor = colors[randomIndex]
				return (
					<Chip
						key={'chip-' + index}
						style={{ marginLeft: 5, marginTop: 5, color: randomColor }}
						label={elem}
						variant='outlined'
						size='small'
					/>
				)
			})}
		</div>
	)

	const subtitlesFileLinks = (
		<List>
			{captionTracks.map((elem, index) => {
				const {
					baseUrl,
					languageCode,
					name: { simpleText: label }
				} = elem
				return (
					<ListItem key={`subtitles-${label}-${index}`}>
						<ListItemAvatar>
							<Avatar color='primary'>{languageCode}</Avatar>
						</ListItemAvatar>
						<a
							href={`${baseUrl}&fmt=vtt`}
							target='_blank'
							rel='noopener noreferrer'
						>
							{label}
						</a>
					</ListItem>
				)
			})}
		</List>
	)

	const subtitlesTracksForVideo = captionTracks.map((elem, index) => {
		const {
			baseUrl,
			languageCode,
			name: { simpleText: label }
		} = elem
		return (
			// doesn't work because of 'crosorigin' problems
			<track
				key={`${label}-${index}`}
				kind='captions'
				src={`${baseUrl}&fmt=vtt`}
				srcLang={languageCode}
				label={label}
			></track>
		)
	})

	return (
		<div>
			<Container maxWidth='sm'>
				<article>
					<p />
					<Typography style={{ fontSize: 30 }} variant='h1'>
						{title}
					</Typography>
					<p />
					{keywordsBlock}
					<p />
					<video controls src={urlVideo}>
						{subtitlesTracksForVideo}
					</video>
					<p />
					<audio controls src={urlAudio}></audio>
					<p />
					<Typography variant='subtitle1'> Available subtitles:</Typography>
					{subtitlesFileLinks}
					<p />
					<Typography style={{ whiteSpace: 'pre-line' }} variant='body2'>
						{description}
					</Typography>
					<p />
				</article>
			</Container>
		</div>
	)
}

export async function getServerSideProps({ query }) {
	const { videoId } = query
	const res = await fetch(`${process.env.DOMAIN}/api/video/${videoId}`)
	const info = await res.json()

	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			...info
		}
	}
}

export default VideoPage
