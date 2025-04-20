// src/pages/MakeRequest.jsx
import RequisitionForm from '../components/RequisitionForm';

const MakeRequest = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Make a New Requisition</h1>
      <RequisitionForm />
    </div>
  );
};

export default MakeRequest;
