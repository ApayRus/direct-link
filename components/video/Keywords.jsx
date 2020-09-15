import React from 'react'
import { Chip } from '@material-ui/core'

function Keywords({ keywords }) {
	return (
		<div>
			{keywords.map((elem, index) => {
				const colors = [
					'#115293',
					'#9a0036',
					'#d32f2f',
					'#f57c00',
					'#1976d2',
					'#388e3c'
				]
				const randomIndex = Math.floor(Math.random() * colors.length)
				const randomColor = colors[randomIndex]
				return (
					<Chip
						key={'chip-' + index}
						style={{ marginLeft: 5, marginTop: 5, color: randomColor }}
						label={elem}
						variant='outlined'
						size='small'
					/>
				)
			})}
		</div>
	)
}

export default Keywords
