import { useState } from 'react'
import DiagnosisForm from "./pages/DiagnosisForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Diagnosis Kesehatan</h1>
      <DiagnosisForm />
    </div>
  );
}

export default App;

