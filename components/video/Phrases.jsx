import styles from './Phrases.module.css'
import PlayIcon from '@material-ui/icons/PlayArrow'
import { IconButton } from '@material-ui/core'

const Phrases = props => {
	const { selectedLangs, captions } = props

	const phrasesSelectedLangs = selectedLangs.map(lang => captions[lang].phrases)

	const multilangPhraseBundles = phrasesSelectedLangs[0].map((_, colIndex) =>
		phrasesSelectedLangs.map(row => row[colIndex])
	)

	return (
		<div className={styles.root}>
			{multilangPhraseBundles.map((bundle, phraseIndex) => {
				return (
					<div className={styles.phraseContainer} key={`bundle-${phraseIndex}`}>
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
						<div className={styles.playButton}>
							<IconButton
								style={{ fontSize: '0.7rem', padding: 1, color: 'silver' }}
							>
								<PlayIcon style={{ fontSize: '0.7rem' }} /> {phraseIndex + 1}
							</IconButton>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Phrases
