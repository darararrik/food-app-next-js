import React from 'react'
import classNames from 'classnames'
import styles from './Loader.module.scss'

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l'
  /** Дополнительный класс */
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'm', className }) => {
  return <div className={classNames(styles.loader, styles[`loader_size-${size}`], className)} />
}

export default Loader
