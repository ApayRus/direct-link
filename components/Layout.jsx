import Search from '../components/Search'
import Logo from './Logo'
import DescriptionIcons from './DescriptionIcons'
import { Typography, Container } from '@material-ui/core'
import Footer from './Footer'

import Head from './Head'

const Layout = ({ children, headProps = {} }) => {
	return (
		<div>
			{/* meta props */}
			<Head {...headProps} />

			<Container
				maxWidth='sm'
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					alignItems: 'center'
				}}
			>
				<heading style={{ flex: 1, marginTop: 10 }}>
					<Typography
						variant='h1'
						style={{ fontSize: 35, width: '100%', textAlign: 'center' }}
					>
						<Logo text='Direct links' /> for Youtube's
					</Typography>
					<DescriptionIcons />
					<Search />
				</heading>
				<main>{children}</main>
				<Footer />
			</Container>
		</div>
	)
}

export default Layout
