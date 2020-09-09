import {
	Chip,
	Container,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	Grid
} from '@material-ui/core'

import Head from 'next/head'

const VideoPage = (props) => {
	const {
		title,
		description: { simpleText: description = '' },
		keywords,
		urlVideo,
		urlAudio,
		captionTracks,
		thumbnails
	} = props

	const biggestThumbnailUrl = thumbnails[thumbnails.length - 1].url

	const header = (
		<Head>
			<title>{title}</title>
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords.join(', ')} />
			{/* For Social media */}
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={biggestThumbnailUrl} />
		</Head>
	)

	const keywordsBlock = (
		<div>
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
			<Grid container>
				{captionTracks.map((elem, index) => {
					const {
						baseUrl,
						languageCode,
						name: { simpleText: label }
					} = elem
					return (
						<Grid item md={4} xs={6}>
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
						</Grid>
					)
				})}
			</Grid>
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
			{header}
			<Container maxWidth='sm'>
				<article>
					<p />
					<Typography style={{ fontSize: 30 }} variant='h1'>
						{title}
					</Typography>
					<p />
					{keywordsBlock}
					<p />
					<video controls src={urlVideo} style={{ width: '100%' }}>
						{subtitlesTracksForVideo}
					</video>
					<p />
					<audio controls src={urlAudio} style={{ width: '100%' }} />
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
