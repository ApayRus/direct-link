import { Badge, Avatar } from '@material-ui/core'

export default function LangAvatar({
	langOrder,
	languageCode,
	onClickHandler,
	sources
}) {
	return langOrder ? (
		<Badge badgeContent={langOrder} color='primary'>
			<Avatar
				style={{ cursor: 'pointer' }}
				onClick={() => onClickHandler(languageCode, sources)}
			>
				{languageCode}
			</Avatar>
		</Badge>
	) : (
		<Avatar
			style={{ cursor: 'pointer' }}
			onClick={() => onClickHandler(languageCode, sources)}
			color='primary'
		>
			{languageCode}
		</Avatar>
	)
}
