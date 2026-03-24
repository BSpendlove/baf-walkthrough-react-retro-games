import styles from './SearchBar.module.css'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{'\uD83D\uDD0D'}</span>
      <input
        className={styles.input}
        type="text"
        placeholder="Search retro games..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
