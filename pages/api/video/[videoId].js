import ytdl from 'ytdl-core'

export default async(req, res) => {
    const { videoId } = req.query
    let info = await ytdl.getBasicInfo(videoId)
    const { url } = info.formats.find((elem) => elem.itag === 18)
    const {
        videoDetails: { title, description = {}, keywords = [] }
    } = info
    res.json({ url, title, description, keywords })
}