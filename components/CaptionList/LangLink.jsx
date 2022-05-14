import { Typography, Link } from '@material-ui/core'

export default function LangLink({ url, text }) {
	return (
		<Link href={`${url}&fmt=vtt`} target='_blank' rel='noopener noreferrer'>
			<Typography style={{ color: 'grey', cursor: 'pointer' }} variant='body1'>
				{text}
			</Typography>
		</Link>
	)
}
