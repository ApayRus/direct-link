import { Container, Typography } from '@material-ui/core'
import SubtitleFileLinks from '../../components/video/SubtitleFileLinks'
import Keywords from '../../components/video/Keywords'
import Video from '../../components/video/Video'
import Search from '../../components/Search'
import Head from '../../components/Head'
import { getVideoInfo } from '../api/video/[videoId]'

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
	const headProps = { title, description, keywords, image: biggestThumbnailUrl }

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
					<Typography variant='subtitle1'> Available subtitles:</Typography>
					<SubtitleFileLinks captionTracks={captionTracks} />
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
