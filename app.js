// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAg7HbLCCLoFwwQmDLLjK-sqBTcbp6hSQo",
  authDomain: "test-1-93a76.firebaseapp.com",
  databaseURL: "https://test-1-93a76-default-rtdb.firebaseio.com",
  projectId: "test-1-93a76",
  storageBucket: "test-1-93a76.firebasestorage.app",
  messagingSenderId: "688438692249",
  appId: "1:688438692249:web:90ab1ff480864e8f036b08",
  measurementId: "G-NWH14HXDSY"
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
