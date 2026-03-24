import styles from './ApiKeyMissing.module.css'

export function ApiKeyMissing() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>API Key Required</h2>
      <p className={styles.text}>
        Retro Game Hub needs a RAWG API key to fetch game data.
      </p>
      <ol className={styles.steps}>
        <li>
          Get a free API key at{' '}
          <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer">
            rawg.io/apidocs
          </a>
        </li>
        <li>
          Copy <code>.env.example</code> to <code>.env</code>
        </li>
        <li>
          Set <code>VITE_RAWG_API_KEY=your-key</code>
        </li>
        <li>Restart the dev server</li>
      </ol>
    </div>
  )
}
