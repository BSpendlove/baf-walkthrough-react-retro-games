import type { ApiErrorType } from '../types/game'
import styles from './ErrorMessage.module.css'

const ERROR_TITLES: Record<ApiErrorType, string> = {
  auth: 'Invalid API Key',
  'rate-limit': 'Rate Limit Exceeded',
  network: 'Network Error',
  unknown: 'Something Went Wrong',
}

interface Props {
  message: string
  type?: ApiErrorType
  onRetry?: () => void
}

export function ErrorMessage({ message, type = 'unknown', onRetry }: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{ERROR_TITLES[type]}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}
