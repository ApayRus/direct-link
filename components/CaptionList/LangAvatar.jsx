import { Badge, Avatar } from '@material-ui/core'

export default function LangAvatar({
	langOrder,
	languageCode,
	onClickHandler
}) {
	return langOrder ? (
		<Badge badgeContent={langOrder} color='primary'>
			<Avatar
				style={{ cursor: 'pointer' }}
				onClick={() => onClickHandler(languageCode)}
			>
				{languageCode}
			</Avatar>
		</Badge>
	) : (
		<Avatar
			style={{ cursor: 'pointer' }}
			onClick={() => onClickHandler(languageCode)}
			color='primary'
		>
			{languageCode}
		</Avatar>
	)
}
