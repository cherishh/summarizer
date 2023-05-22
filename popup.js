document.getElementById('summarize').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code: 'document.body.innerText'
  }, function(result) {
    // send the page content to the server
    fetch('https://your-server.com/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: result[0]})
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('summary').innerText = data.summary;
    })
    .catch(error => {
      document.getElementById('summary').innerText = 'Failed to summarize the article.';
    });
  });
});
