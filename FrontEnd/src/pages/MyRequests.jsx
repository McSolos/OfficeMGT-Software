// src/pages/MyRequests.jsx

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Your auth context
import axios from 'axios';
import { motion } from 'framer-motion';

const MyRequests = () => {
  const { user } = useAuth();
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/requisitions/my-requests', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRequisitions(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch requisitions.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequisitions();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Requisitions</h1>

      {requisitions.length === 0 ? (
        <div className="text-center text-gray-500">No requisitions found.</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Requisition ID</th>
                <th className="py-3 px-6 text-left">Engineer Name</th>
                <th className="py-3 px-6 text-left">Site</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {requisitions.map((req) => (
                <tr key={req.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{req.id}</td>
                  <td className="py-3 px-6">{req.engineer_name}</td>
                  <td className="py-3 px-6">{req.site}</td>
                  <td className="py-3 px-6">{new Date(req.provide_on_or_before).toLocaleDateString()}</td>
                  <td className="py-3 px-6 capitalize">{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default MyRequests;
