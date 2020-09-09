import ytdl from 'ytdl-core'

export default async(req, res) => {
    const { videoId } = req.query
    let info = await ytdl.getInfo(videoId)
    const { url: urlVideo } = info.formats.find((elem) => elem.itag === 18)
    const { url: urlAudio } = info.formats.find((elem) => elem.itag === 140)
    const {
        videoDetails: { title, description = {}, keywords = [], thumbnail: { thumbnails = [] } },
        player_response: {
            captions: {
                playerCaptionsTracklistRenderer: { captionTracks = [] } = []
            } = []
        }
    } = info
    res.json({ urlVideo, urlAudio, title, description, keywords, captionTracks, thumbnails })
}