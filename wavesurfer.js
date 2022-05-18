// import WaveSurfer from 'wavesurfer.js'
// import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'

export default async function initWavesurfer({
	waveformContainer,
	timelineContainer,
	regions = [],
	mediaElement,
	peaks
}) {
	const { default: WaveSurfer } = await import('wavesurfer.js')
	const { default: RegionsPlugin } = await import(
		'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
	)
	const { default: TimelinePlugin } = await import(
		'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
	)

	console.log('regions')
	console.log(regions)

	const waveformPromise = new Promise((resolve, reject) => {
		const wavesurfer = WaveSurfer.create({
			container: waveformContainer,
			waveColor: '#A8DBA8',
			progressColor: '#3B8686',
			backend: 'MediaElement',
			normalize: true,
			autoCenter: false,
			// minPxPerSec: 5,
			scrollParent: true,
			/* 			
				xhr: {
					cache: 'default',
					mode: 'cors',
					method: 'GET',
					credentials: 'same-origin',
					redirect: 'follow',
					referrer: 'client',
					headers: [{ key: 'Authorization', value: 'my-token' }]
				}, */
			plugins: [
				RegionsPlugin.create({
					// regionsMinLength: 2,
					regions,
					dragSelection: {
						slop: 5
					}
				}),
				TimelinePlugin.create({
					container: timelineContainer
				})
			]
		})

		wavesurfer.load(mediaElement, peaks)

		wavesurfer.on('region-click', (region, event) => {
			event.stopPropagation()
			region.play()
		})

		wavesurfer.on('ready', () => {
			resolve(wavesurfer)
		})
	})

	return waveformPromise
}
