import React, { useEffect, useRef, useState } from 'react';


const CaptainDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [profilePic, setProfilePic] = useState('');
  const [filledFields, setFilledFields] = useState(3); // out of 6 for example
  const totalFields = 6;

  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const captain = {
    name: 'Captain Jack',
    email: 'jack@ocean.com',
    phone: '9876543210',
    vehicleType: 'Sedan',
    plateNumber: 'AB123CD',
    licenseNumber: 'DL123456',
    rating: 4.8,
    totalRides: 42,
    earnings: 25000,
    location: 'Port X',
    distanceTravelled: '150 km',
  };

  const rides = new Array(10).fill(0).map((_, i) => ({
    id: i + 1,
    userName: `User ${i + 1}`,
    pickup: 'Location A',
    drop: 'Location B',
    time: '10:00 AM',
    fare: `₹${100 + i * 10}`,
    rating: (4 + (i % 2)).toFixed(1),
    userImage: `/assets/user-${i + 1}.jpg`, // Example path for user images
  }));

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const [form, setForm] = useState({
    name: captain.name || '',
    email: captain.email || '',
    phone: captain.phone || '',
    location: captain.location || '',
    vehicleType: captain.vehicleType || '',
    vehicleNumber: captain.vehicleNumber || '',
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleProfileUpdate = async (formData, imageFile) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('location', formData.location);
    data.append('vehicleType', formData.vehicleType);
    data.append('vehicleNumber', formData.vehicleNumber);
    if (imageFile) data.append('profilePicture', imageFile);
  
    try {
      const res = await fetch('/api/update-captain-profile', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      alert('Profile updated successfully!');
      console.log(result);
    } catch (err) {
      console.error('Profile update failed:', err);
      alert('Failed to update profile.');
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const completionPercent = Math.round((filledFields / totalFields) * 100);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6">Welcome to Your Dashboard, Captain!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <img src="/assets/earnings.jpg" alt="Earnings" className="w-full h-36 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Total Earnings</h3>
                <p className="text-3xl font-bold text-yellow-500">₹{captain.earnings}</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <img src="/assets/total-rides.jpg" alt="Total Rides" className="w-full h-36 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Total Rides</h3>
                <p className="text-3xl font-bold text-yellow-500">{captain.totalRides}</p>
                <p className="text-sm text-gray-500">Completed this month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <img src="/assets/location.jpg" alt="Location" className="w-full h-36 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Current Location</h3>
                <p className="text-3xl font-bold text-yellow-500">{captain.location}</p>
                <p className="text-sm text-gray-500">Where you are driving</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-700">Distance Travelled</h3>
                <p className="text-3xl font-bold text-yellow-500">{captain.distanceTravelled}</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-700">Current Rating</h3>
                <p className="text-3xl font-bold text-yellow-500">{captain.rating} ★</p>
                <p className="text-sm text-gray-500">Your average rating</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition mt-6">
              <h3 className="text-xl font-semibold text-gray-700">Overview</h3>
              <p className="text-md text-gray-500 mb-4">Here is your complete overview. Keep track of your earnings, total rides, and location to ensure a great experience!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-700">Rides Today</h4>
                  <p className="text-2xl font-bold text-yellow-500">5</p>
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-700">Upcoming Rides</h4>
                  <p className="text-2xl font-bold text-yellow-500">3</p>
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-700">Customer Rating</h4>
                  <p className="text-2xl font-bold text-yellow-500">4.8 ★</p>
                </div>
              </div>
            </div>
          </div>
        );

       
          case 'profile':
  const profileFields = ['name', 'email', 'phone', 'location', 'vehicleType', 'vehicleNumber', 'age', 'gender', 'address', 'experience'];
  const filledFields = profileFields.filter((field) => form[field]);
  const formCompletion = Math.floor((filledFields.length / profileFields.length) * 100);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set the preview image once loaded
        setSelectedImage(file); // Store the selected image
      };
      reader.readAsDataURL(file); // Read the image as a data URL
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-md">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white mb-8 relative overflow-hidden">
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28">
            {/* Circular Progress SVG */}
            <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (formCompletion / 100) * 282.6}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>

            {/* Profile Image */}
            <img
              src={previewImage || captain.profilePicture || '/assets/default-avatar.png'}
              alt="Captain Profile"
              className="w-full h-full rounded-full border-4 border-white shadow-md object-cover"
            />

            {/* Camera Upload Icon (Enabled for image upload) */}
            <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform">
              <img src="/assets/camera-icon.png" alt="Upload" className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Ensure the image change handler is working
                className="hidden"
              />
            </label>

            {/* Progress % Label */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-sm font-semibold text-green-600 bg-white/80 px-2 py-1 rounded-full shadow-sm">
                {formCompletion}%
              </span>
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold">{form.name || 'Captain Name'}</h2>
            <p className="text-sm opacity-90">{form.email || 'Email'}</p>
            <p className="text-sm opacity-90">
              Captain ID: <span className="font-medium">{captain.id}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Read-Only Profile Information */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Full Name', key: 'name' },
            { label: 'Email', key: 'email' },
            { label: 'Phone Number', key: 'phone' },
            { label: 'Age', key: 'age' },
            { label: 'Gender', key: 'gender' },
            { label: 'Location', key: 'location' },
            { label: 'Address', key: 'address' },
            { label: 'Vehicle Type', key: 'vehicleType' },
            { label: 'Vehicle Number', key: 'vehicleNumber' },
            { label: 'Experience (in years)', key: 'experience' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <p className="text-gray-900 px-4 py-2 border rounded-lg bg-gray-50">
                {form[key] || 'Not Provided'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

          

  case 'settings':
  return (
    <div className="space-y-8 p-6">
      {/* Settings Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Settings</h2>

      {/* Profile Settings */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email with verification logic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              A verification link will be sent to this new email.
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={form.phone || ''}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            onClick={() => {
              // Simulated save and send verification link
              setUserData({ ...form });
              alert(`A verification link has been sent to ${form.email}`);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {['Ride Updates', 'Promotional Notifications', 'Email Notifications'].map((label) => (
            <div key={label} className="flex items-center space-x-4">
              <input type="checkbox" className="h-5 w-5 text-yellow-500" />
              <label className="text-gray-700">{label}</label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
            Save Preferences
          </button>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Account Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
            Save Password
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password?</h3>
        <p className="text-gray-600 mb-4">
          If you forgot your password, you can request a reset link to be sent to your email.
        </p>
        <div className="flex justify-start">
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            onClick={() => {
              alert(`Reset password link sent to ${userData.email}`);
            }}
          >
            Send Reset Link
          </button>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">App Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input type="checkbox" className="h-5 w-5 text-yellow-500" />
            <label className="text-gray-700">Enable Dark Mode</label>
          </div>
          <div className="flex items-center space-x-4">
            <input type="checkbox" className="h-5 w-5 text-yellow-500" />
            <label className="text-gray-700">Set Language</label>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
            Save Preferences
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="space-y-4">
          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

            

      case 'logout':
        return <p className="text-red-500 font-bold text-xl">You have been logged out successfully.</p>;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-400 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-yellow-300">
          <h2 className="text-2xl font-bold">Captain Dashboard</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-3">
          {['home', 'rides', 'profile', 'settings', 'logout'].map((tab) => (
            <button
              key={tab}
              className={`text-left px-4 py-2 rounded transition capitalize font-medium ${activeTab === tab ? 'bg-yellow-300 text-white' : 'hover:bg-yellow-300 hover:text-white'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'home' && <i className="ri-home-2-line mr-2"></i>}
              {tab === 'rides' && <i className="ri-steering-line mr-2"></i>}
              {tab === 'profile' && <i className="ri-user-line mr-2"></i>}
              {tab === 'settings' && <i className="ri-settings-3-line mr-2"></i>}
              {tab === 'logout' && <i className="ri-logout-box-line mr-2"></i>}
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <button
            ref={menuButtonRef}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
          <h1 className="text-xl font-semibold">Captain Portal</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default CaptainDashboard;
