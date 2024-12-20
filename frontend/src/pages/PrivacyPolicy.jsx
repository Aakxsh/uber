import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          Welcome to Uber's Privacy Policy. Your privacy is important to us. This policy outlines how we collect, use, and
          protect your information when you use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Personal information such as your name, email address, and phone number.</li>
          <li>Payment information including credit or debit card details.</li>
          <li>Location data while using our services.</li>
          <li>Device information such as IP address and browser type.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>To provide and improve our services.</li>
          <li>To process transactions and send confirmations.</li>
          <li>To ensure safety and prevent fraud.</li>
          <li>To communicate with you regarding your account or bookings.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>We share information with drivers to facilitate bookings.</li>
          <li>We may share data with third-party service providers for payment processing or analytics.</li>
          <li>We comply with legal requests from law enforcement agencies.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>You can access and update your account information at any time.</li>
          <li>You have the right to request the deletion of your data.</li>
          <li>You can opt out of marketing communications by unsubscribing.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
        <p className="text-gray-600 mb-6">
          We use robust security measures to protect your data. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to This Policy</h2>
        <p className="text-gray-600 mb-6">
          We may update this policy periodically. Any changes will be communicated through our website or app.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about this privacy policy, please contact us at{' '}
          <a href="mailto:privacy@uber.com" className="text-blue-500 hover:underline">
            privacy@uber.com
          </a>
          .
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
