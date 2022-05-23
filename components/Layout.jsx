import { Container } from '@material-ui/core'
import Heading from './Heading'
import Footer from './Footer'
import Head from './Head'

const Layout = ({ children, headProps = {}, displayMode = 'info' }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
				alignItems: 'center'
			}}
		>
			{/* meta props */}
			<Head {...headProps} />
			<Container maxWidth={displayMode === 'info' ? 'sm' : 'xs'}>
				{displayMode === 'info' && <Heading />}
			</Container>
			<main style={{ width: '100%' }}>{children}</main>
			{displayMode === 'info' && <Footer />}
		</div>
	)
}

export default Layout
