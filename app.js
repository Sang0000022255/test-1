// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAg7HbLCCLoFwwQmDLLjK-sqBTcbp6hSQo",
  authDomain: "test-1-93a76.firebaseapp.com",
  projectId: "test-1-93a76",
  storageBucket: "test-1-93a76.firebasestorage.app",
  messagingSenderId: "688438692249",
  appId: "1:688438692249:web:3c2f367de34ee2e5036b08",
  measurementId: "G-XV3M2GBJT9"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Hàm gửi dữ liệu
function submitData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Lưu dữ liệu vào Firebase
    database.ref("users").push({
        name: name,
        email: email
    }).then(() => {
        alert("Dữ liệu đã được lưu!");
    }).catch((error) => {
        console.error("Lỗi khi lưu dữ liệu:", error);
    });
}
