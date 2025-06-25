import axios from 'axios';

// 🔐 Supabase API Key dan Base URL
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZnZtcWh4enJscnRya2l3c2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTM1MjYsImV4cCI6MjA2NjQyOTUyNn0.VqhizD5QGcgeQLaFVElh1aJRWVvTHeXD4kRc7QKJQ98";

const BASE_URL_DIAGNOSIS = "https://kifvmqhxzrlrtrkiwslv.supabase.co/rest/v1/input_data_kesehatan";

// 🔧 Header request
const HEADERS = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation", // agar Supabase mengembalikan data yang disimpan
};

/**
 * ✅ POST data diagnosis ke tabel `input_data_kesehatan` dengan delay 1 detik
 */
export async function postDiagnosisKesehatan(data) {
  try {
    console.log("📤 Mengirim data ke Supabase:", data);

    const response = await axios.post(BASE_URL_DIAGNOSIS, data, { headers: HEADERS });

    console.log("✅ Data berhasil disimpan ke Supabase:", response.data);

    // ⏱️ Tambahkan delay 1 detik
    return new Promise((resolve) => {
      setTimeout(() => resolve(response.data), 1000);
    });
  } catch (error) {
    const status = error?.response?.status;
    const detail = error?.response?.data;

    console.error("❌ Gagal menyimpan data ke Supabase:", {
      status,
      detail,
      originalError: error.message,
    });

    throw new Error(detail?.message || error.message || "Unknown error");
  }
}
