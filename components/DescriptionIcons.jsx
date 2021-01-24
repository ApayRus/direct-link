import { Typography } from '@material-ui/core'
import {
	Subtitles as SubtitlesIcon,
	OndemandVideo as VideoIcon,
	MusicVideo as AudioIcon,
	Image as ThumbnailIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	mainContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		marginTop: 10
	},
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			width: '34%'
		}
	},
	iconContainer: {
		flex: 1,
		color: theme.palette.grey[600],
		maxWidth: 30,
		alignSelf: 'center'
	},
	textContainer: {
		flex: 1,
		marginLeft: 5
	}
}))

const DescriptionIcons = () => {
	const classes = useStyles()

	const descriptionIconArray = [
		{ text: 'video', icon: <VideoIcon /> },
		{ text: 'audio', icon: <AudioIcon /> },
		{ text: 'subtitles', icon: <SubtitlesIcon /> },
		{ text: 'thumbnails', icon: <ThumbnailIcon /> }
	]

	return (
		<div className={classes.mainContainer}>
			{descriptionIconArray.map(elem => {
				return (
					<div key={`icon-${elem.text}`} className={classes.itemContainer}>
						<div className={classes.iconContainer}>{elem.icon}</div>
						<div className={classes.textContainer}>
							<Typography variant='body1' color='textSecondary'>
								{elem.text}
							</Typography>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default DescriptionIcons
