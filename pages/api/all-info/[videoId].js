import ytdl from '@distube/ytdl-core'

export default async (req, res) => {
	const { videoId } = req.query
	let info = await ytdl.getBasicInfo(videoId)

	res.json(info)
}
