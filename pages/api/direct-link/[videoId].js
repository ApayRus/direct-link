import youtubedl from 'youtube-dl'

export default (req, res) => {
    const { videoId } = req.query
    const url = `https://www.youtube.com/watch?v=${videoId}`
    const options = ['--get-url']
    youtubedl.getInfo(url, options, (err, info) => {
        if (err) throw err
        res.json(info)
    })
}