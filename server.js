const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ফায়ারবেজ কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyDgpnL-J0SxEEZhpjGWTZdpAFTvS1ww9QA",
  authDomain: "xbet-85104.firebaseapp.com",
  projectId: "xbet-85104",
  storageBucket: "xbet-85104.firebasestorage.app",
  messagingSenderId: "839557510948",
  appId: "1:839557510948:web:a80ebd160402b78087e5b1"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// মেগানোডস এপিআই কনফিগারেশন
const MEGANODES_BASE_URL = "https://api-prd-v2.meganodes.net";
const API_TOKEN = process.env.API_TOKEN || "YOUR_MEGANODES_API_TOKEN"; // রেন্ডারের Environment Variable এ এটি সেট করতে হবে

// টেস্ট রুট
app.get('/', (req, res) => {
    res.json({ status: "success", message: "1XBET Casino Backend with MegaNodes API is Running!" });
});

// ১. গেম লঞ্চ করার রাউট (Get Game Launch URL)
app.post('/api/launch-game', async (req, res) => {
    try {
        const { user_code, provider_code, game_symbol, lang, return_url } = req.body;

        const response = await axios.post(`${MEGANODES_BASE_URL}/game/game-url`, {
            user_code,
            provider_code,
            game_symbol,
            lang: lang || "en",
            return_url: return_url || "https://your-frontend-domain.com",
            win_ratio: 95
        }, {
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.response ? error.response.data : error.message 
        });
    }
});

// ২. ইউজার তৈরি বা সিংক করার রাউট
app.post('/api/create-user', async (req, res) => {
    try {
        const { name } = req.body;

        const response = await axios.post(`${MEGANODES_BASE_URL}/user/create`, {
            name
        }, {
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
