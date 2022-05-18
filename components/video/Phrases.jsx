import styles from './Phrases.module.css'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import { IconButton } from '@material-ui/core'
import { formatSecondsToTime } from 'frazy-parser'

const Phrases = props => {
	const { selectedLangs, captions, mediaRef } = props

	const phrasesSelectedLangs = selectedLangs.map(lang => captions[lang].phrases)

	const multilangPhraseBundles = phrasesSelectedLangs[0].map((_, colIndex) =>
		phrasesSelectedLangs.map(row => row[colIndex])
	)

	return (
		<div className={styles.root}>
			{multilangPhraseBundles.map((bundle, phraseIndex) => {
				const { start, end } = bundle[0]

				return (
					<div className={styles.phraseContainer} key={`bundle-${phraseIndex}`}>
						<div className={styles.phraseTopInfo}>
							<div className={styles.langCode}>
								{`${formatSecondsToTime(start)}-${formatSecondsToTime(end)}`}
								&nbsp;
							</div>
							<div className={styles.playButton}>
								<IconButton
									onClick={() => {
										if (mediaRef.paused) {
											mediaRef.currentTime = start
											mediaRef.play()
										} else {
											mediaRef.pause()
										}
									}}
									style={{ fontSize: '0.7rem', padding: 1, color: 'silver' }}
								>
									<PlayIcon style={{ fontSize: '0.7rem' }} /> {phraseIndex + 1}
								</IconButton>
							</div>
						</div>
						{bundle.map((phrase, langIndex) => {
							const lang = selectedLangs[langIndex]
							const langOrder = langIndex => {
								if (langIndex === 0) return 'firstLang'
								if (langIndex === selectedLangs.length - 1) return 'lastLang'
								return 'middleLang'
							}

							return (
								<div
									className={`${styles.phraseSingleLang} ${
										styles[langOrder(langIndex)]
									}`}
									key={phrase?.id}
								>
									<div className={styles.langCode}>{lang}&nbsp;</div>
									<div className={`${styles.cueText} ${styles[lang] || ''}`}>
										{phrase?.body?.[0]?.text}
									</div>
								</div>
							)
						})}
					</div>
				)
			})}
			<div className={styles.controlsPanel}>
				{/* 				<IconButton onClick={() => mediaRef.pause()}>
					<PauseIcon />
				</IconButton> */}
				<IconButton
					onClick={() => (mediaRef.paused ? mediaRef.play() : mediaRef.pause())}
				>
					<PlayIcon />
				</IconButton>
			</div>
		</div>
	)
}

export default Phrases
