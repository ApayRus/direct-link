import React, { useState } from 'react'
import { getVideoInfo } from '../api/video/[videoId]'
import VideoArticle from '../../components/VideoArticle'
import { parseSubs } from 'frazy-parser'

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

	const [displayMode, setDisplayMode] = useState('info') // | transcript

	const [captions, setCaptions] = useState({})

	const [selectedLangs, setSelectedLangs] = useState([])

	const loadCaptions = languageCode => {
		const captionTrack = captionTracks.find(
			elem => elem.languageCode === languageCode
		)
		if (captionTrack) {
			const { baseUrl } = captionTrack
			fetch(`${baseUrl}&fmt=vtt`).then(response => {
				response.text().then(text => {
					setCaptions(oldState => ({
						...oldState,
						[languageCode]: { text, phrases: parseSubs(text) }
					}))
				})
			})
		}
	}

	const selectLang = languageCode => {
		// unselect
		if (selectedLangs.includes(languageCode)) {
			setSelectedLangs(oldState =>
				oldState.filter(elem => elem !== languageCode)
			)
		}
		// select
		else {
			setSelectedLangs(oldState => [...oldState, languageCode])
		}
	}

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
