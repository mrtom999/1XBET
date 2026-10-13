const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// আপনার ফায়ারবেজ কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyDgpnL-J0SxEEZhpjGWTZdpAFTvS1ww9QA",
  authDomain: "xbet-85104.firebaseapp.com",
  projectId: "xbet-85104",
  storageBucket: "xbet-85104.firebasestorage.app",
  messagingSenderId: "839557510948",
  appId: "1:839557510948:web:a80ebd160402b78087e5b1"
};

// ফায়ারবেজ ইনিশিয়ালাইজ করা
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// টেস্ট রুট
app.get('/', (req, res) => {
    res.json({ status: "success", message: "1XBET Casino API Backend with Firebase is Running!" });
});

// ক্যাসিনো এপিআই বা ডাটা সংরক্ষণের জন্য রাউট
app.post('/api/casino', async (req, res) => {
    try {
        // এখানে ফায়ারবেজে ডাটা সেভ বা এপিআই লজিক যোগ করতে পারেন
        res.json({ success: true, message: "API endpoint active and connected to Firebase" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
