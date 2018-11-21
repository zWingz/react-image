import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Image } from '../src'
import './style'
const Images = (function() {
  const ret = []
  for(let i = 1; i <= 20; i++) {
    ret.push(require(`../doc/assets/${i}.jpg`))
  }
  return ret
})()

const App = hot(module)(() => (
  <div>
    <div className='container' style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Images.map(each => (
        <Image
          group='multi'
          key={each}
          src={each}
          width={120}
          height={120}
          style={{ margin: '35px' }}
        />
      ))}
      <Image
          group='multi'
          src={'each'}
          width={120}
          height={120}
          style={{ margin: '35px' }}
        />
    </div>
  </div>
))

export default App
