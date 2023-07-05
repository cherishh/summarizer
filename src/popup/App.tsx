import React, { useState, useEffect } from 'react'
import Browser from 'webextension-polyfill'
import './style.scss'

function App() {
  const [article, setArticle] = useState(null)
  const [test, setTest] = useState('')

  useEffect(() => {
    window.test1 = 1;
    Browser.runtime.onMessage.addListener((message) => {
      setTest('123')
      if (message.action === 'article') {
        setArticle(message.article)
      }
    });
  }, []);

  // return (
  //   <div className='test'>
  //     {article}
  //   </div>
  // )
  return (
    <div className='test'>
      hello world！
      <div>
        {test}
        {article}
      </div>
    </div>
  )
}

export default App;