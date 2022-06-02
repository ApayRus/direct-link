// import WaveSurfer from 'wavesurfer.js'
// import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'

export default async function initWavesurfer({
	waveformContainer,
	timelineContainer,
	regions = [],
	mediaElement
}) {
	const { default: WaveSurfer } = await import('wavesurfer.js')
	const { default: RegionsPlugin } = await import(
		'wavesurfer.js/src/plugin/regions'
	)
	const { default: TimelinePlugin } = await import(
		'wavesurfer.js/src/plugin/timeline'
	)

	const waveformPromise = new Promise((resolve, reject) => {
		const wavesurfer = WaveSurfer.create({
			container: waveformContainer,
			waveColor: '#A8DBA8',
			progressColor: '#3B8686',
			backend: 'MediaElement',
			normalize: true,
			autoCenter: true,
			minPxPerSec: 50,
			height: 100,
			scrollParent: true,
			plugins: [
				RegionsPlugin.create({
					// regionsMinLength: 2,
					regions,
					dragSelection: {
						slop: 5
					},
					contentEditable: true,
					removeButton: true
				}),
				TimelinePlugin.create({
					container: timelineContainer
				})
			]
		})

		wavesurfer.load(mediaElement, [])

		wavesurfer.on('ready', () => {
			resolve(wavesurfer)
		})
		wavesurfer.on('error', error => {
			reject(console.log(error))
		})
	})

	return waveformPromise
}
