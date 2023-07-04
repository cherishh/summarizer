import React, { useEffect } from 'react'
import Browser from 'webextension-polyfill'
import './style.scss'

function App() {
  const [article, setArticle] = React.useState(null)

  // useEffect(() => {
  //   window.test1 = 1;
  //   Browser.runtime.onMessage.addListener((message) => {
  //     console.log(message, 'message');
  //     window.test = message;
  //     if (message.action === 'getArticle') {
  //       setArticle(message.article)
  //     }
  //   });
  // }, []);

  // return (
  //   <div className='test'>
  //     {article}
  //   </div>
  // )
  return (
    <div className='test'>
      hello world！
      <div>
        {article}
      </div>
    </div>
  )
}

export default App;