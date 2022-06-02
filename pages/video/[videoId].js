import React, { useState } from 'react'
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
		thumbnails,
		videoId
	} = props

	const [displayMode, setDisplayMode] = useState('info') // | transcript

	const biggestThumbnailUrl = thumbnails[thumbnails.length - 1].url
	const headProps = { title, keywords, image: biggestThumbnailUrl, description }

	const videoArticleProps = {
		...headProps,
		urlVideo,
		urlAudio,
		thumbnails,
		captionTracks,
		displayMode,
		setDisplayMode,
		videoId
	}

	return (
		<Layout headProps={headProps} displayMode={displayMode}>
			<VideoArticle {...videoArticleProps} />
		</Layout>
	)
}

export async function getServerSideProps({ query: { videoId } }) {
	const info = await getVideoInfo(videoId)
	return {
		props: {
			videoId,
			...info
		}
	}
}

export default VideoPage
