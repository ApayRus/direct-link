import Layout from '../components/Layout'

export default function Home() {
	const headProps = {
		title:
			'Youtube downloader for its videos, audios, subtitles and thumbnails',
		description:
			'Put link to youtube video and get everything you want from it',
		keywords: ['youtube', 'downloader', 'next.js', 'opensource', 'aparus'],
		image:
			'https://user-images.githubusercontent.com/1222611/92627876-a85ee000-f2d4-11ea-8dbb-14ab4eb0065a.png'
	}

	return <Layout headProps={headProps}></Layout>
}
