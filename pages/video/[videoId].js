import React, { useState } from 'react'
import { getVideoInfo } from '../api/video/[videoId]'
import VideoArticle from '../../components/VideoArticle'
import Layout from '../../components/Layout'
import useCaptions from '../../components/useCaptions'

const VideoPage = props => {
	const {
		title,
		description = '',
		keywords,
		urlVideo,
		urlAudio,
		captionTracks: captionTracksYoutube,
		thumbnails
	} = props

	const {
		captionTracks,
		captions,
		setCaptions,
		loadCaptions,
		selectedLangs,
		selectLang
	} = useCaptions(captionTracksYoutube)

	const [displayMode, setDisplayMode] = useState('info') // | transcript

	const biggestThumbnailUrl = thumbnails[thumbnails.length - 1].url
	const headProps = { title, keywords, image: biggestThumbnailUrl, description }

	const videoArticleProps = {
		...headProps,
		captionTracks,
		urlVideo,
		urlAudio,
		thumbnails,
		displayMode,
		setDisplayMode,
		captions,
		setCaptions,
		loadCaptions,
		selectedLangs,
		selectLang
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
			...info
		}
	}
}

export default VideoPage
