import { useState } from "react";

export default function DiagnosisForm() {
  const [form, setForm] = useState({
    warnaMata: "",
    ekspresiWajah: "",
    warnaBibir: "",
    kondisiBibir: "",
    posturTubuh: "",
  });

  const [hasil, setHasil] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const diagnose = () => {
    const { warnaMata, ekspresiWajah, warnaBibir, kondisiBibir, posturTubuh } = form;
    let result = "";

    if (warnaMata === "Putih") result = "Sehat";
    else if (warnaMata === "Merah") {
      if (ekspresiWajah === "Lemas") result = "Sakit";
      else if (ekspresiWajah === "Ceria") result = "Sehat";
      else if (ekspresiWajah === "Normal") {
        if (posturTubuh === "Bungkuk") result = "Sakit";
        else if (posturTubuh === "Tegap") {
          if (kondisiBibir === "Pecah-pecah") result = "Kurang Sehat";
          else if (kondisiBibir === "Lembab") result = "Sehat";
        }
      }
    } else if (warnaMata === "Kekuningan") {
      if (warnaBibir === "Kebiruan") result = "Sakit";
      else if (warnaBibir === "Merah") result = "Sehat";
      else if (warnaBibir === "Hitam") result = "Kurang Sehat";
    }

    setHasil(result);
  };

  const resetForm = () => {
    setForm({
      warnaMata: "",
      ekspresiWajah: "",
      warnaBibir: "",
      kondisiBibir: "",
      posturTubuh: "",
    });
    setHasil("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700">Form Diagnosis Kesehatan</h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Warna Mata</label>
          <select name="warnaMata" onChange={handleChange} value={form.warnaMata} className="mt-1 w-full border rounded p-2">
            <option value="">Pilih</option>
            <option value="Putih">Putih</option>
            <option value="Merah">Merah</option>
            <option value="Kekuningan">Kekuningan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ekspresi Wajah</label>
          <select name="ekspresiWajah" onChange={handleChange} value={form.ekspresiWajah} className="mt-1 w-full border rounded p-2">
            <option value="">Pilih</option>
            <option value="Lemas">Lemas</option>
            <option value="Ceria">Ceria</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postur Tubuh</label>
          <select name="posturTubuh" onChange={handleChange} value={form.posturTubuh} className="mt-1 w-full border rounded p-2">
            <option value="">Pilih</option>
            <option value="Tegap">Tegap</option>
            <option value="Bungkuk">Bungkuk</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kondisi Bibir</label>
          <select name="kondisiBibir" onChange={handleChange} value={form.kondisiBibir} className="mt-1 w-full border rounded p-2">
            <option value="">Pilih</option>
            <option value="Pecah-pecah">Pecah-pecah</option>
            <option value="Lembab">Lembab</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Warna Bibir</label>
          <select name="warnaBibir" onChange={handleChange} value={form.warnaBibir} className="mt-1 w-full border rounded p-2">
            <option value="">Pilih</option>
            <option value="Kebiruan">Kebiruan</option>
            <option value="Merah">Merah</option>
            <option value="Hitam">Hitam</option>
          </select>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-4">
        <button
          onClick={diagnose}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Cek Hasil
        </button>
        <button
          onClick={resetForm}
          className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>

      {/* Hasil */}
      {hasil && (
        <div className="bg-gray-50 border rounded p-4 text-center mt-4">
          <p className="text-sm text-gray-500">Hasil Diagnosis:</p>
          <p
            className={`text-2xl font-bold ${
              hasil === "Sehat" ? "text-green-600" : hasil === "Kurang Sehat" ? "text-yellow-600" : "text-red-600"
            }`}
          >
            {hasil}
          </p>
        </div>
      )}
    </div>
  );
}
