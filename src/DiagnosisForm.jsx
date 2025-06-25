import { useState } from "react";
import { postDiagnosisKesehatan, getDiagnosisKesehatan } from './SupabaseService'; 

export default function DiagnosisForm() {
  const [form, setForm] = useState({
    nama: "",
    gender: "",
    warna_mata: "",
    ekspresi_wajah: "",
    warna_bibir: "",
    kondisi_bibir: "",
    postur_tubuh: "",
  });

  const [label, setlabel] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setShowModal(true);
  setLoading(true);

  try {
    const result = diagnose(form);
    setlabel(result);

    const dataToPost = {
      ...form,
      label: result, // tambahkan label diagnosis ke data yang akan dikirim
    };

    await postDiagnosisKesehatan(dataToPost); // ⬅ kirim ke Supabase
  } catch (error) {
    console.error("Gagal simpan ke Supabase:", error);
    setlabel("Terjadi kesalahan saat mendiagnosis");
  } finally {
    setLoading(false);
  }
};


  const diagnose = (data) => {
    const { warna_mata, ekspresi_wajah, kondisi_bibir, warna_bibir, postur_tubuh } =
      data;

    if (warna_mata === "Putih") {
      if (ekspresi_wajah === "Ceria") return "Sehat";
      if (ekspresi_wajah === "Lemas") return "Kurang Sehat";
      if (ekspresi_wajah === "Normal") return "Sehat";
    }

    if (warna_mata === "Merah") {
      if (kondisi_bibir === "Lembab") return "Sehat";
      if (kondisi_bibir === "Kering" || kondisi_bibir === "Pecah-pecah") {
        if (warna_bibir === "Kebiruan") return "Sakit";
        if (warna_bibir === "Hitam" || warna_bibir === "MerahNormal")
          return "Kurang Sehat";
      }
    }

    if (warna_mata === "Kekuningan") {
      if (
        postur_tubuh === "Bungkuk" ||
        postur_tubuh === "Bahu Melorot" ||
        postur_tubuh === "Normal"
      ) {
        return "Kurang Sehat";
      }
    }


    return "Data tidak lengkap";
  };

  const resetForm = () => {
    setForm({
      nama: "",
      gender: "",
      warna_mata: "",
      ekspresi_wajah: "",
      warna_bibir: "",
      kondisi_bibir: "",
      postur_tubuh: "",
    });
    setlabel("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Form Diagnosis Kesehatan
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nama dan Gender */}
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            className="w-full border border-gray-300 rounded-md py-3 px-4 text-base"
            value={form.nama}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-3 px-4 text-base"
            required
          >
            <option value="">-- Pilih Gender --</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          {/* Pilihan diagnosis */}
          {[
            {
              label: "Warna Mata",
              name: "warna_mata",
              options: ["Putih", "Merah", "Kekuningan"],
            },
            {
              label: "Ekspresi Wajah",
              name: "ekspresi_wajah",
              options: ["Ceria", "Lemas", "Normal"],
            },
            {
              label: "Postur Tubuh",
              name: "postur_tubuh",
              options: ["Bungkuk", "Bahu Melorot", "Normal"],
            },
            {
              label: "Kondisi Bibir",
              name: "kondisi_bibir",
              options: ["Lembab", "Kering", "Pecah-pecah"],
            },
            {
              label: "Warna Bibir",
              name: "warna_bibir",
              options: ["Kebiruan", "Hitam", "Merah"],
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="font-semibold text-md mb-1 block">
                {field.label}
              </label>
              <select
                name={field.name}
                className="w-full border border-gray-300 rounded-md py-3 px-4 text-base"
                required
                value={form[field.name]}
                onChange={handleChange}
              >
                <option value="">-- Pilih {field.label} --</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="md:col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-6 py-3 text-base font-semibold rounded-md bg-blue-500"
            >
              Cek Diagnosis
            </button>
          </div>
        </form>
      </div>

      {/* Modal label */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="font-bold text-lg mb-2">label Diagnosis</h3>
            <p className="mb-4">
              <span className="block font-semibold text-gray-700">
                {form.nama} ({form.gender})
              </span>
              <span
                className={`text-2xl font-bold mt-2 block ${
                  label === "Sehat"
                    ? "text-green-600"
                    : label === "Kurang Sehat"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {label}
              </span>
            </p>
            <button
              className="btn btn-success"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
