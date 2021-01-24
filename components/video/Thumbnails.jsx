import React from 'react'

function Thumbnails({ thumbnails }) {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			{thumbnails.map((elem, index) => {
				const { width, height, url } = elem
				return (
					<div style={{ textAlign: 'center' }} key={`thumbnail-${index}`}>
						<div style={{ fontSize: 12 }}>
							{width}x{height}
						</div>
						<div>
							<img style={{ maxWidth: 100 }} src={url} alt='thumbnail' />
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Thumbnails
