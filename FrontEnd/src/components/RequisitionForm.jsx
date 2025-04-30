// src/components/RequisitionForm.jsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RequisitionForm = () => {
  const {user} = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    engineerName: '',
    site: '',
    address: '',
    justification: '',
    deadline: '',
    materials: [
      { name: '', quantity: '', description: '' }
    ]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMaterialChange = (index, e) => {
    const updated = [...form.materials];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, materials: updated });
  };

  const addMaterial = () => {
    setForm({
      ...form,
      materials: [...form.materials, { name: '', quantity: '', description: '' }]
    });
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/requisitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Requisition submitted successfully!');
        setForm({
          engineerName: '',
          site: '',
          address: '',
          justification: '',
          deadline: '',
          materials: [
            { name: '', quantity: '', description: '' }
          ]
        });
        setStep(1);
      } else {
        const data = await res.json();
        alert(data.message || 'Error submitting requisition.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-4 bg-white p-6 rounded-lg shadow-lg overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">Requisition Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="engineerName" placeholder="Engineer Name" value={form.engineerName} onChange={handleChange} className="p-2 border rounded" required />
              <input type="text" name="site" placeholder="Site" value={form.site} onChange={handleChange} className="p-2 border rounded" required />
              <input type="text" name="address" placeholder="Site Address" value={form.address} onChange={handleChange} className="p-2 border rounded" required />
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="p-2 border rounded" required />
            </div>
            <textarea name="justification" placeholder="Additional Note" value={form.justification} onChange={handleChange} className="mt-4 w-full p-2 border rounded h-24" required />
            <div className="mt-6 flex justify-end">
              <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">Material Details</h2>

            {form.materials.map((mat, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="text" name="name" placeholder="Material Name" value={mat.name} onChange={(e) => handleMaterialChange(index, e)} className="p-2 border rounded" required />
                <input type="number" name="quantity" placeholder="Quantity" value={mat.quantity} onChange={(e) => handleMaterialChange(index, e)} className="p-2 border rounded" required />
                <input type="text" name="description" placeholder="Description" value={mat.description} onChange={(e) => handleMaterialChange(index, e)} className="p-2 border rounded" />
              </div>
            ))}

            <button type="button" onClick={addMaterial} className="text-blue-600 mb-4 hover:underline">
              + Add Another Material
            </button>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={prevStep} className="px-4 py-2 rounded border">
                Back
              </button>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Submit Requisition
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default RequisitionForm;
