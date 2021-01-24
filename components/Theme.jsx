import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { red } from '@material-ui/core/colors'

// Create a theme instance.
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#556cd6'
		},
		secondary: {
			main: '#19857b'
		},
		error: {
			main: red.A400
		},
		background: {
			default: '#fff'
		}
	}
})

const Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
