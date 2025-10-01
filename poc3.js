(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27'; // đổi thành endpoint của bạn
  const AUTO_RUN = true;

  function sendComment() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', ACTION_URL, true);
    xhr.withCredentials = true; // <-- gửi cookie/credentials kèm theo
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function(){ console.log('POST status:', xhr.status, 'response:', xhr.responseText); };
    xhr.onerror = function(){ console.error('Request error'); };
    var body = JSON.stringify({ text: "-------------", mentions: [] });
    xhr.send(body);
  }

  if (AUTO_RUN) {
    setTimeout(()=> { try { sendComment(); } catch(e) { console.error(e); } }, 50);
  } else {
    window.sendComment = sendComment;
  }
})();
