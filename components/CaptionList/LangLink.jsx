import { Typography, Link, Chip, ButtonBase } from '@material-ui/core'

export default function LangLink({ url, text, sources }) {
	return (
		<div>
			<div>
				<Link href={`${url}&fmt=vtt`} target='_blank' rel='noopener noreferrer'>
					<Typography
						style={{ color: 'grey', cursor: 'pointer' }}
						variant='body1'
					>
						{text}
					</Typography>
				</Link>
			</div>
			<div>
				{sources.map(source => {
					const firstLetter = source[0].toUpperCase()
					return (
						<ButtonBase
							style={{ borderRadius: '50%' }}
							key={`source-${source}`}
						>
							<Chip
								style={{ cursor: 'pointer' }}
								size='small'
								label={firstLetter}
							/>
						</ButtonBase>
					)
				})}
			</div>
		</div>
	)
}
