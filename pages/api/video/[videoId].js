import ytdl from 'ytdl-core'

// import httpsProxyAgent from 'https-proxy-agent'
// const proxy = 'https://208.81.193.205:80' // US free proxy from https://www.us-proxy.org/
// const agent = httpsProxyAgent(proxy)

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
	let info = await ytdl.getInfo(videoId, {
		requestOptions: { 'X-Forwarded-For': '54.37.1.193' /* agent  */ }
	})
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
