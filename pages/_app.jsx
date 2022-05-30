import React from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core'
import theme from '../theme'
import SnackbarProvider from '../components/SnackbarProvider'
import Snackbar from '../components/Snackbar'
import '../styles.css'

export default function MyApp(props) {
	const { Component, pageProps } = props

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider>
				<Head>
					<title>My page</title>
					<meta
						name='viewport'
						content='minimum-scale=1, initial-scale=1, width=device-width'
					/>
				</Head>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...pageProps} />
				<Snackbar />
			</SnackbarProvider>
		</ThemeProvider>
	)
}
