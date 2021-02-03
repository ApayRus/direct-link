import Search from '../components/Search'
import Logo from './Logo'
import DescriptionIcons from './DescriptionIcons'
import { Typography } from '@material-ui/core'

const Heading = () => {
	return (
		<heading style={{ flex: 1, width: '100%', marginTop: 10 }}>
			<Typography
				variant='h1'
				style={{ fontSize: 35, width: '100%', textAlign: 'center' }}
			>
				<Logo text='Direct links' /> for Youtube's
			</Typography>
			<DescriptionIcons />
			<Search />
		</heading>
	)
}

export default Heading
