import styles from './FilterChips.module.css'

const PLATFORMS = [
  { label: 'All', value: '' },
  { label: 'NES', value: '49' },
  { label: 'SNES', value: '79' },
  { label: 'Genesis', value: '167' },
  { label: 'PS1', value: '27' },
  { label: 'N64', value: '83' },
  { label: 'Arcade', value: '34' },
] as const

interface Props {
  active: string
  onChange: (value: string) => void
}

export function FilterChips({ active, onChange }: Props) {
  return (
    <div className={styles.container}>
      {PLATFORMS.map((p) => (
        <button
          key={p.value}
          className={`${styles.chip} ${active === p.value ? styles.active : ''}`}
          onClick={() => onChange(p.value)}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
