import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string
  onChange: (value: string) => void
  afterSlot?: React.ReactNode
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, disabled, type = 'text', ...props }, ref) => {
    const hasAfterSlot =
      afterSlot !== undefined && afterSlot !== null && afterSlot !== false && afterSlot !== ''

    return (
      <div
        className={classNames(styles.inputWrapper, className, {
          [styles.inputWrapper_disabled]: disabled,
        })}
      >
        <input
          {...props}
          type={type}
          ref={ref}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={classNames(styles.input, { [styles.input_withAfter]: hasAfterSlot })}
        />
        {hasAfterSlot && <div className={styles.inputAfterSlot}>{afterSlot}</div>}
      </div>
    )
  },
)
export default Input
