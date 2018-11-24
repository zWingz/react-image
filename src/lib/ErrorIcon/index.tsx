import * as React from 'react'
import SVG from '../../assets/img-load-error.svg'

const style: React.CSSProperties = {
  border: '1px dashed #dadada',
  backgroundImage: `url(${SVG})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '65% 65%',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  backgroundPosition: 'center'
}
export default function(props) {
  return (
    <div
      style={{
        ...style,
        ...props.style
      }}
    />
  )
}
