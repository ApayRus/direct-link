import ytdl from 'ytdl-core'

// for public api
export default async (req, res) => {
	const {
		query: { videoId }
	} = req
	const response = await getVideoInfo(videoId)
	res.json(response)
}

// for use on this server, instead of fetch
export async function getVideoInfo(videoId) {
	let info
	try {
		info = await ytdl.getInfo(videoId)
	} catch (err) {
		console.log(err)
	}
	const { url: urlVideo } = info.formats.find(elem => elem.itag === 18)
	const { url: urlAudio } = info.formats.find(elem => elem.itag === 140)
	const {
		videoDetails: { title, description = {}, keywords = [], thumbnails = [] },
		player_response: {
			captions: {
				playerCaptionsTracklistRenderer: { captionTracks = [] } = []
			} = []
		}
	} = info
	const response = {
		urlVideo,
		urlAudio,
		title,
		description,
		keywords,
		captionTracks,
		thumbnails
	}
	return response
}
