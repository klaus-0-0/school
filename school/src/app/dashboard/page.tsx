'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type School = {
  id: string;
  name: string;
  address: string;
  city: string;
  imgurl: string;
};

export default function Dashboard() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useRouter();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get('/api/auth/school/allschool');
        console.log("ews = ", res)
        setSchools(res.data);
      } catch (err: any) {
        console.error('Failed to fetch schools:', err);
        setError('Unable to load schools. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user-info");
    navigate.push("/login")
  }
  return (
    <div className="relative min-h-screen bg-cyan-00">
      {/* Background Image */}
      {/* <img
        src="/assets/wall14.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      /> */}

      {/* Foreground Content */}
      <div className="relative z-10 ">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 w-full bg-gray-700 bg-opacity-80 backdrop-blur-md flex justify-between items-center p-4 rounded-b-md shadow-lg">
          {/* Left side */}
          <div className="flex items-center">
            <p className="font-semibold text-white ">0-0</p>
          </div>

          {/* Right side */}
          <div className="flex gap-4 items-center">
            <button className="font-bold p-1 cursor-pointer rounded-xl text-white" onClick={() => handleLogout()}>Logout</button>
            <button className="font-bold p-1 cursor-pointer rounded-xl text-white" onClick={() => navigate.push("/login")}>Login</button>
            <button className="font-bold p-1 cursor-pointer rounded-xl text-white" onClick={() => navigate.push("")}>About</button>
            <button className="bg-green-600 font-bold border-2 p-3 cursor-pointer rounded-xl hover:bg-green-700" onClick={() => navigate.push("/addschool")}>AddSchool</button>
          </div>
        </div>
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold text-gray-700 text-center mt-8 mb-6 drop-shadow-lg">welcome to our School</h1>

        {/* School Cards */}
        {loading ? (
          <div className="text-black text-center text-4xl">Loading schools...</div>
        ) : error ? (
          <div className="text-red-300 text-center">{error}</div>
        ) : schools.length === 0 ? (
          <div className="text-white text-center">No schools found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
            {schools.map(school => (
              <div
                key={school.id}
                className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md rounded-lg hover:shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
              >
                <img
                  src={school.imgurl}
                  alt={school.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{school.name}</h2>
                  <p className="text-gray-600">Address: {school.address}</p>
                  <p className="text-gray-500 text-sm">City: {school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}