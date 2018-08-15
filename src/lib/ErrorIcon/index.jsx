import React from 'react'
import SVG from '../../assets/img-load-error.svg'
const style = {
  border: '1px dashed #dadada',
  backgroundImage: `url(${SVG})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '65% 65%',
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
    >
    </div>
  )
}
