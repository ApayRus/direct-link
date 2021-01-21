import React from 'react'
import HeadNext from 'next/head'

function Head({ title, description, keywords, image }) {
	return (
		<HeadNext>
			<title>{title}</title>
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords.join(', ')} />
			{/* For Social media */}
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:meta' content={image} />
		</HeadNext>
	)
}

export default Head
