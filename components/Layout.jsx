import { Container } from '@material-ui/core'
import Heading from './Heading'
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
				<Heading />
				<main>{children}</main>
				<Footer />
			</Container>
		</div>
	)
}

export default Layout
