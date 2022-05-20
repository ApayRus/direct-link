import { List, ListItem, ListItemAvatar, Grid } from '@material-ui/core'
import LangAvatar from './LangAvatar'
import LangLink from './LangLink'
import AddCaptionForm from '../AddCaptionsForm'
import { useContext } from 'react'
import { CaptionContext } from '../VideoArticle'

export default function TrackCaptions() {
	const { captionTracks, selectedLangs, addCaptions } =
		useContext(CaptionContext)

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
