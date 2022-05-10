import { Container } from '@material-ui/core'
import Heading from './Heading'
import Footer from './Footer'
import Head from './Head'

const Layout = ({ children, headProps = {}, displayMode = 'info' }) => {
	return (
		<div>
			{/* meta props */}
			<Head {...headProps} />

			<Container
				maxWidth={displayMode === 'info' ? 'sm' : 'xs'}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					alignItems: 'center'
				}}
			>
				{displayMode === 'info' && <Heading />}
				<main>{children}</main>
				{displayMode === 'info' && <Footer />}
			</Container>
		</div>
	)
}

export default Layout
