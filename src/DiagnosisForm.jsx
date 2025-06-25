import { useState } from "react";
import {
  Plus,
  User,
  Eye,
  Smile,
  Droplets,
  MousePointer,
  Users,
} from "lucide-react";
import {postDiagnosisKesehatan} from "./SupabaseService";


// Mock function untuk menggantikan postDiagnosisKesehatan
// const postDiagnosisKesehatan = async (data) => {
//   // Simulasi API call
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(data), 1000);
//   });
// };

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
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      !form.nama ||
      !form.gender ||
      !form.warna_mata ||
      !form.ekspresi_wajah ||
      !form.warna_bibir ||
      !form.kondisi_bibir ||
      !form.postur_tubuh
    ) {
      alert("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    setLoading(true);
    try {
      const result = diagnose(form);
      setlabel(result);

      const dataToPost = {
        ...form,
        label: result,
      };

      await postDiagnosisKesehatan(dataToPost);
    } catch (error) {
      console.error("Gagal simpan ke Supabase:", error);
      setlabel("Terjadi kesalahan saat mendiagnosis");
    } finally {
      setLoading(false);
    }
  };

  const diagnose = (data) => {
    const {
      warna_mata,
      ekspresi_wajah,
      kondisi_bibir,
      warna_bibir,
      postur_tubuh,
    } = data;

    if (warna_mata === "Putih") {
      if (ekspresi_wajah === "Ceria") return "Sehat";
      if (ekspresi_wajah === "Lemas") return "Kurang Sehat";
      if (ekspresi_wajah === "Normal") return "Sehat";
    }

    if (warna_mata === "Merah") {
      if (kondisi_bibir === "Lembab") return "Sehat";
      if (["Kering", "Pecah-pecah"].includes(kondisi_bibir)) {
        if (warna_bibir === "Kebiruan") return "Sakit";
        if (["Hitam", "Merah"].includes(warna_bibir)) return "Kurang Sehat";
      }
    }

    if (warna_mata === "Kekuningan") {
      if (["Bungkuk", "Bahu Melorot", "Normal"].includes(postur_tubuh))
        return "Kurang Sehat";
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
    setCurrentStep(0);
  };

  const formFields = [
    {
      label: "Warna Mata",
      name: "warna_mata",
      options: ["Putih", "Merah", "Kekuningan"],
      icon: <Eye className="w-5 h-5" />,
      description: "Pilih warna mata yang paling sesuai",
    },
    {
      label: "Ekspresi Wajah",
      name: "ekspresi_wajah",
      options: ["Ceria", "Lemas", "Normal"],
      icon: <Smile className="w-5 h-5" />,
      description: "Bagaimana ekspresi wajah Anda hari ini?",
    },
    {
      label: "Postur Tubuh",
      name: "postur_tubuh",
      options: ["Bungkuk", "Bahu Melorot", "Normal"],
      icon: <Users className="w-5 h-5" />,
      description: "Postur tubuh dalam keadaan normal",
    },
    {
      label: "Kondisi Bibir",
      name: "kondisi_bibir",
      options: ["Lembab", "Kering", "Pecah-pecah"],
      icon: <Droplets className="w-5 h-5" />,
      description: "Kondisi bibir saat ini",
    },
    {
      label: "Warna Bibir",
      name: "warna_bibir",
      options: ["Kebiruan", "Hitam", "Merah"],
      icon: <MousePointer className="w-5 h-5" />,
      description: "Warna bibir yang terlihat",
    },
  ];

  const getHealthColor = (status) => {
    switch (status) {
      case "Sehat":
        return "bg-emerald-100";
      case "Kurang Sehat":
        return "bg-green-100";
      case "Sakit":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case "Sehat":
        return "✅";
      case "Kurang Sehat":
        return "⚠️";
      case "Sakit":
        return "🚨";
      default:
        return "❓";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-emerald-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="animate-pulse mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <Plus
                className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600"
                strokeWidth={3}
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 text-white leading-tight">
            Cek Kesehatan Anda
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-emerald-100 max-w-2xl lg:max-w-3xl mx-auto font-light px-4">
            Diagnosis cepat berdasarkan ciri fisik dengan teknologi AI terdepan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() =>
                document
                  .getElementById("diagnosis-form")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-emerald-600 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Mulai Diagnosis
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <div
            id="diagnosis-form"
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-200"
          >
            {/* Form Header */}
            <div className="bg-emerald-500 p-6 sm:p-8 text-white text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-white rounded-full flex items-center justify-center">
                <Plus
                  className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500"
                  strokeWidth={3}
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Form Diagnosis Kesehatan
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base">
                Isi data diri dan kondisi fisik Anda
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="space-y-6 sm:space-y-8">
                {/* Personal Info Section */}
                <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    Informasi Pribadi
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="nama"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="nama"
                        type="text"
                        name="nama"
                        placeholder="Masukkan nama lengkap Anda"
                        className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 shadow-sm text-sm sm:text-base"
                        value={form.nama}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl py-3 sm:py-4 px-4 sm:px-6 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 shadow-sm text-sm sm:text-base"
                        required
                      >
                        <option value="" disabled>
                          -- Pilih Jenis Kelamin --
                        </option>
                        <option value="Laki-laki">👨 Laki-laki</option>
                        <option value="Perempuan">👩 Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Health Parameters Section */}
                <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <Plus
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        strokeWidth={3}
                      />
                    </div>
                    Parameter Kesehatan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {formFields.map((field, index) => (
                      <div
                        key={field.name}
                        className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                        >
                          <span className="text-green-600">{field.icon}</span>
                          {field.label}
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          {field.description}
                        </p>
                        <select
                          id={field.name}
                          name={field.name}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-sm sm:text-base"
                          required
                          value={form[field.name]}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            -- Pilih {field.label} --
                          </option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4 sm:pt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                        Sedang Mendiagnosis...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        Dapatkan Diagnosis
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Results Section */}
              {label && (
                <div className="mt-8 sm:mt-12 transform animate-fadeIn">
                  <div
                    className={`${getHealthColor(
                      label
                    )} rounded-xl sm:rounded-2xl p-6 sm:p-8 text-black shadow-xl`}
                  >
                    <div className="text-center">
                      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">
                        {getHealthIcon(label)}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                        Hasil Diagnosis
                      </h3>
                      ...
                      <div className="bg-white bg-opacity-20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                        <p className="text-base sm:text-lg font-medium mb-2">
                          {form.nama} ({form.gender})
                        </p>
                        <div className="text-2xl sm:text-4xl font-black">
                          {label}
                        </div>
                      </div>
                      {/* Health Recommendations */}
                      <div className="bg-white bg-opacity-10 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-left">
                        <h4 className="font-semibold mb-3 text-center text-sm sm:text-base">
                          💡 Rekomendasi
                        </h4>
                        {label === "Sehat" && (
                          <p className="text-xs sm:text-sm">
                            Kondisi kesehatan Anda baik! Tetap jaga pola hidup
                            sehat dengan olahraga teratur dan konsumsi makanan
                            bergizi.
                          </p>
                        )}
                        {label === "Kurang Sehat" && (
                          <p className="text-xs sm:text-sm">
                            Perhatikan pola hidup Anda. Perbanyak istirahat,
                            konsumsi air putih, dan konsultasi dengan dokter
                            jika diperlukan.
                          </p>
                        )}
                        {label === "Sakit" && (
                          <p className="text-xs sm:text-sm">
                            Segera konsultasi dengan dokter untuk mendapatkan
                            penanganan yang tepat. Jangan tunda untuk
                            memeriksakan diri.
                          </p>
                        )}
                      </div>
                      <button
                        className="bg-white text-emerald-600 font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
                        onClick={resetForm}
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        Diagnosis Ulang
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            ⚠️ Disclaimer: Hasil diagnosis ini hanya sebagai referensi awal.
            Untuk diagnosis yang akurat, konsultasikan dengan tenaga medis
            profesional.
          </p>
        </div>
      </div>
    </div>
  );
}
