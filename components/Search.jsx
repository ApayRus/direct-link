import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import LinearProgress from '@material-ui/core/LinearProgress'
import ytdl from 'ytdl-core'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%'
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
		marginTop: 10,
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

	const onSearchClear = event => {
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

	const SearchInput = () => (
		<>
			{' '}
			<IconButton
				className={classes.iconButton}
				aria-label='search'
				type='submit'
			>
				<SearchIcon />
			</IconButton>
			<InputBase
				className={classes.input}
				placeholder='Paste here link or id of video'
				inputProps={{ 'aria-label': 'get video id' }}
				onChange={onSearchChange}
				value={url}
			/>
			<Divider className={classes.divider} orientation='vertical' />
			<IconButton
				className={classes.iconButton}
				aria-label='clear'
				onClick={onSearchClear}
			>
				<ClearIcon />
			</IconButton>
		</>
	)

	return (
		<div>
			<Paper component='form' onSubmit={onSubmit} className={classes.root}>
				{isLoading ? <LoadingIndicator /> : <SearchInput />}
			</Paper>
		</div>
	)
}
