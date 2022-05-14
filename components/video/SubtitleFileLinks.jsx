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
					const { baseUrl, languageCode, languageName } = elem

					const langCode = languageName.includes('auto')
						? languageCode + '-auto'
						: languageCode // we need auto to avoid double select by similar code

					const langIndex =
						selectedLangs.findIndex(elem => elem === langCode) + 1 || 0

					return (
						<Grid key={`subtitles-${languageCode}-${index}`} item md={4} xs={6}>
							<ListItem>
								<ListItemAvatar>
									{langIndex ? (
										<Badge badgeContent={langIndex} color='primary'>
											<Avatar onClick={langAvatarClickHandler(langCode)}>
												{langCode}
											</Avatar>
										</Badge>
									) : (
										<Avatar
											onClick={langAvatarClickHandler(langCode)}
											color='primary'
										>
											{langCode}
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
										{languageName}
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
