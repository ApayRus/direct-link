import React from 'react'
import { List, ListItem, ListItemAvatar, Avatar, Grid } from '@material-ui/core'

function SubtitleFileLinks({ captionTracks }) {
	return (
		<List>
			<Grid container>
				{captionTracks.map((elem, index) => {
					const {
						baseUrl,
						languageCode,
						name: { simpleText: label }
					} = elem
					return (
						<Grid key={`subtitles-${label}-${index}`} item md={4} xs={6}>
							<ListItem>
								<ListItemAvatar>
									<Avatar color='primary'>{languageCode}</Avatar>
								</ListItemAvatar>
								<a
									href={`${baseUrl}&fmt=vtt`}
									target='_blank'
									rel='noopener noreferrer'
								>
									{label}
								</a>
							</ListItem>
						</Grid>
					)
				})}
			</Grid>
		</List>
	)
}

export default SubtitleFileLinks
