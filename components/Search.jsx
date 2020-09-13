import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import ytdl from 'ytdl-core'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
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
	}
}))

export default function CustomizedInputBase() {
	const classes = useStyles()
	const [url, setUrl] = useState('')
	const router = useRouter()

	const onSearchChange = (event) => {
		setUrl(event.target.value)
	}

	const onSearchClear = (event) => {
		setUrl('')
	}

	const onSearchClick = () => {
		try {
			const videoId = ytdl.getVideoID(url)
			router.push(`/video/[videoId]`, `/video/${videoId}`)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Paper component='form' className={classes.root}>
			<IconButton
				className={classes.iconButton}
				aria-label='search'
				onClick={onSearchClick}
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
		</Paper>
	)
}
