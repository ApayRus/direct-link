import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import EnterIcon from '@material-ui/icons/ChangeHistory'
import LinearProgress from '@material-ui/core/LinearProgress'
import ytdl from 'ytdl-core'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
	form: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 15,
		marginTop: 5,
		minHeight: 48
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	},
	loadingProgressContainer: {
		textAlign: 'center',
		width: '100%'
	}
}))

export default function CustomizedInputBase() {
	const classes = useStyles()
	const [url, setUrl] = useState('')
	const [isLoading, setIsLoading] = useState()
	const router = useRouter()

	const onSearchChange = event => {
		setUrl(event.target.value)
	}

	const onSearchClear = () => {
		setUrl('')
	}

	const onSubmit = e => {
		e.preventDefault()
		try {
			const videoId = ytdl.getVideoID(url)
			router.push(`/video/[videoId]`, `/video/${videoId}`)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		//possible params: (url, { shallow })
		const handleRouteChangeStart = () => setIsLoading(true)
		const handleRouteChangeComplete = () => setIsLoading(false)

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
		}
	}, [])

	const LoadingIndicator = () => (
		<div className={classes.loadingProgressContainer}>
			<LinearProgress />
		</div>
	)

	const EnterButton = () => (
		<IconButton aria-label='search' type='submit'>
			<EnterIcon color='primary' style={{ transform: 'rotate(90deg)' }} />
		</IconButton>
	)

	const ClearButton = () => (
		<IconButton aria-label='clear' onClick={onSearchClear}>
			<ClearIcon style={{ fontSize: 18 }} />
		</IconButton>
	)

	const SearchInput = () => (
		<>
			<InputBase
				className={classes.input}
				placeholder='Paste here id of video'
				inputProps={{ 'aria-label': 'get video id' }}
				onChange={onSearchChange}
				value={url}
			/>
			<ClearButton />
			<EnterButton />
		</>
	)

	return (
		<form onSubmit={onSubmit} className={classes.form}>
			{isLoading ? <LoadingIndicator /> : <SearchInput />}
		</form>
	)
}
