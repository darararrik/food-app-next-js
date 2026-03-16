import React, { type CSSProperties } from 'react'
import classNames from 'classnames'
import styles from './Skeleton.module.scss'

export type SkeletonProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
  style?: CSSProperties
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius, className, style }) => {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        ...style,
      }}
    />
  )
}

export default Skeleton
