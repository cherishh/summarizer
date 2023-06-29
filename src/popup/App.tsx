import React, { useEffect } from 'react'
import Browser from 'webextension-polyfill'
import './style.scss'

function App() {
  const [article, setArticle] = React.useState(null)

  useEffect(() => {
    Browser.runtime.onMessage.addListener((message) => {
      if (message.action === 'readability') {
        console.log(message.article)
        setArticle(message.article)
      }
    });
  }, []);

  return (
    <div className='test'>
      {article}
    </div>
  )
  return (
    <div className='test'>
      hello world
    </div>
  )
}

export default App;