import { List, ListItem, ListItemAvatar, Grid } from '@material-ui/core'
import LangAvatar from './LangAvatar'
import LangLink from './LangLink'
import AddCaptionForm from '../AddCaptionsForm'

export default function TrackCaptions(props) {
	const {
		captionTracks,
		loadCaptions,
		selectedLangs,
		selectLang,
		addCaptions
	} = props

	const langAvatarClickHandler = (languageCode, sources) => {
		if (!sources.includes('local')) {
			loadCaptions(languageCode)
		}
		selectLang(languageCode)
	}

	return (
		<>
			<List>
				<Grid container>
					{captionTracks.map((elem, index) => {
						const { baseUrl, languageCode, languageName, sources } = elem

						const langOrder =
							selectedLangs.findIndex(elem => elem === languageCode) + 1 || 0

						return (
							<Grid
								key={`subtitles-${languageCode}-${index}`}
								item
								md={4}
								xs={6}
							>
								<ListItem>
									<ListItemAvatar>
										<LangAvatar
											langOrder={langOrder}
											languageCode={languageCode}
											sources={sources}
											onClickHandler={langAvatarClickHandler}
										/>
									</ListItemAvatar>
									<LangLink
										text={languageName}
										url={baseUrl}
										sources={sources}
									/>
								</ListItem>
							</Grid>
						)
					})}
				</Grid>
			</List>
			<div>
				<AddCaptionForm addCaptions={addCaptions} />
			</div>
		</>
	)
}
