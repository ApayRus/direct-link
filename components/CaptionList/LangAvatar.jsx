import { Badge, Avatar } from '@material-ui/core'
import { useContext } from 'react'
import { CaptionContext } from '../VideoArticle'

export default function LangAvatar({ langOrder, languageCode, sources }) {
	const { langAvatarClickHandler } = useContext(CaptionContext)

	return langOrder ? (
		<Badge badgeContent={langOrder} color='primary'>
			<Avatar
				style={{ cursor: 'pointer' }}
				onClick={() => langAvatarClickHandler(languageCode, sources)}
			>
				{languageCode}
			</Avatar>
		</Badge>
	) : (
		<Avatar
			style={{ cursor: 'pointer' }}
			onClick={() => langAvatarClickHandler(languageCode, sources)}
			color='primary'
		>
			{languageCode}
		</Avatar>
	)
}
