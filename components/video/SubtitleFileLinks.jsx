import React from 'react'
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	Grid,
	Badge,
	Typography,
	Link
} from '@material-ui/core'

function SubtitleFileLinks(props) {
	const { captionTracks, loadCaptions, selectedLangs, selectLang } = props

	const langAvatarClickHandler = languageCode => () => {
		loadCaptions(languageCode)
		selectLang(languageCode)
	}

	return (
		<List>
			<Grid container>
				{captionTracks.map((elem, index) => {
					const {
						baseUrl,
						languageCode,
						name: { simpleText: label }
					} = elem

					const langIndex =
						selectedLangs.findIndex(elem => elem === languageCode) + 1 || 0

					return (
						<Grid key={`subtitles-${label}-${index}`} item md={4} xs={6}>
							<ListItem>
								<ListItemAvatar>
									{langIndex ? (
										<Badge badgeContent={langIndex} color='primary'>
											<Avatar onClick={langAvatarClickHandler(languageCode)}>
												{languageCode}
											</Avatar>
										</Badge>
									) : (
										<Avatar
											onClick={langAvatarClickHandler(languageCode)}
											color='primary'
										>
											{languageCode}
										</Avatar>
									)}
								</ListItemAvatar>
								<Link
									href={`${baseUrl}&fmt=vtt`}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Typography
										style={{ color: 'grey', cursor: 'pointer' }}
										variant='body1'
									>
										{label}
									</Typography>
								</Link>
							</ListItem>
						</Grid>
					)
				})}
			</Grid>
		</List>
	)
}

export default SubtitleFileLinks
