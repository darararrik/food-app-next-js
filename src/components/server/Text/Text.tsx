import classNames from 'classnames'
import * as React from 'react'

import styles from './Text.module.scss'

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  /** Дополнительный класс */
  className?: string
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14'
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span'
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold'
  /** Контент */
  children?: React.ReactNode
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent'
  /** Максимальное кол-во строк */
  maxLines?: number
}

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
  ...props
}) => {
  return (
    <Tag
      className={classNames(
        styles.text,
        view && styles[`text_view-${view}`],
        weight && styles[`text_weight-${weight}`],
        color && styles[`text_color-${color}`],
        className,
      )}
      style={{ WebkitLineClamp: maxLines }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Text
