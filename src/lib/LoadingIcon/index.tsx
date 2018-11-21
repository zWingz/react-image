import * as React from 'react'
import './style.scss'
export default function({ size = '' }) {
  return (
    <div className={['lds-ring', size].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
