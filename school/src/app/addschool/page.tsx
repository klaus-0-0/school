'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type TokenPayload = {
  userId: string;
};

export default function AddSchool() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [userid, setUserid] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const navigation = useRouter();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info") || '{}');
    console.log("user", userInfo.userid)
    setUserid(userInfo.userid)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const reader = new FileReader();
    reader.readAsDataURL(image);      // reads image complete data and then after store in reader.results

    reader.onloadend = async () => {  // reader.onloadend as data onload ends on reader.result this function runs
      const base64 = reader.result;

      try {
        const res = await axios.post('/api/uploadImage', {
          name,
          image: base64,
        });

        console.log('Uploaded to:', res.data.url);
        setImgurl(res.data.url);

        const school = await axios.post("/api/auth/school", {
          name,
          address,
          city,
          imgurl: res.data.url,
          userid,
        });
        setName("");
        setAddress("");
        setCity("");
        setImage(null);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Background Image */}
      <img
        src="/assets/wall3.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-md border-b border-white/20 shadow-md px-6 py-3 flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold tracking-wide">School Admin Panel</h1>
        <button
          onClick={() => navigation.push("/dashboard")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md cursor-pointer transition"
        >
          Dashboard
        </button>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center pt-20 pb-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-black/10 backdrop-blur-md border border-white/20 shadow-xl rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-white text-center">Add School</h2>

          <input
            type="text"
            placeholder="School Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/10 text-white placeholder-white/70 border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-black/10 text-white placeholder-white/70 border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-black/10 text-white placeholder-white/70 border border-white/30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full bg-black/10 text-white border border-white/30 rounded-md p-2 file:text-white file:bg-blue-600 file:border-none file:rounded-md file:px-3 file:py-1 file:cursor-pointer"
          />

          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md cursor-pointer transition"
            >
              Upload
            </button>
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-md cursor-pointer transition"
              onClick={() => console.log("Cancel")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}