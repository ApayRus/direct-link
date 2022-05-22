import { createContext, useState } from 'react'

export const SnackbarContext = createContext()

export default function SnackbarProvider({ children }) {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' })
	return (
		<SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
			{children}
		</SnackbarContext.Provider>
	)
}
