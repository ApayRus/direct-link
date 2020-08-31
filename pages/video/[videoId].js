import fetch from 'isomorphic-unfetch'
import { Chip, Container, CssBaseline, Typography } from '@material-ui/core'
import { palette } from '@material-ui/system'

const VideoPage = ({
	title,
	description: { simpleText: description = '' },
	keywords,
	url
}) => {
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
						color={randomColor}
						style={{ marginLeft: 5, marginTop: 5, color: randomColor }}
						label={elem}
						variant='outlined'
						size='small'
					/>
				)
			})}
		</div>
	)

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
					<video controls src={url}></video>
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
	const res = await fetch(`http://localhost:3000/api/video/${videoId}`)
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
