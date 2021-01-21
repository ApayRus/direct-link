import { Container, Typography } from '@material-ui/core'
import SubtitleFileLinks from '../../components/video/SubtitleFileLinks'
import Keywords from '../../components/video/Keywords'
import Video from '../../components/video/Video'
import Thumbnails from '../../components/video/Thumbnails'
import Search from '../../components/Search'
import Head from '../../components/Head'
import { getVideoInfo } from '../api/video/[videoId]'

const VideoPage = props => {
	const {
		title,
		description = '',
		keywords,
		urlVideo,
		urlAudio,
		captionTracks,
		thumbnails
	} = props

	const biggestThumbnailUrl = thumbnails[thumbnails.length - 1].url
	const headProps = { title, keywords, image: biggestThumbnailUrl }

	return (
		<div>
			<Head {...headProps} />
			<Container maxWidth='sm'>
				<article>
					<p />
					<Search />
					<p />
					<Typography style={{ fontSize: 30 }} variant='h1'>
						{title}
					</Typography>
					<p />
					<Keywords keywords={keywords} />
					<p />
					<Video captionTracks={captionTracks} urlVideo={urlVideo} />
					<p />
					<audio controls src={urlAudio} style={{ width: '100%' }} />
					<p />
					<Typography style={{ fontSize: 20 }} variant='h3'>
						Captions/Subtitles:
					</Typography>
					<SubtitleFileLinks captionTracks={captionTracks} />
					<p />
					<Typography style={{ fontSize: 20 }} variant='h3'>
						Thumbnails:
					</Typography>
					<p />
					<Thumbnails thumbnails={thumbnails} />
					<p />
					<Typography style={{ fontSize: 20 }} variant='h3'>
						Description:
					</Typography>
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

export async function getServerSideProps({ query: { videoId } }) {
	const info = await getVideoInfo(videoId)
	return {
		props: {
			...info
		}
	}
}

export default VideoPage
