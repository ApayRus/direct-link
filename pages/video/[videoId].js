import { getVideoInfo } from '../api/video/[videoId]'
import VideoArticle from '../../components/VideoArticle'

import Layout from '../../components/Layout'

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
	const headProps = { title, keywords, image: biggestThumbnailUrl, description }
	const videoArticleProps = {
		...headProps,
		captionTracks,
		urlVideo,
		urlAudio,
		thumbnails
	}

	return (
		<Layout headProps={headProps}>
			<VideoArticle {...videoArticleProps} />
		</Layout>
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
