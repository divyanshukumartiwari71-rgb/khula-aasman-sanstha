'use client';

import React, { useEffect, useState } from 'react';
import {
  getDonationSettings,
  updateDonationSettings
} from '@/lib/db';

export default function DonationSettings() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: '',
    upi_id: '',
    qr_image: '',
    account_name: '',
    bank_name: '',
    account_number: '',
    ifsc: '',
    branch: '',
    account_type: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getDonationSettings();

      if (data) {
        setForm({
          id: data.id || '',
          upi_id: data.upi_id || '',
          qr_image: data.qr_image || '',
          account_name: data.account_name || '',
          bank_name: data.bank_name || '',
          account_number: data.account_number || '',
          ifsc: data.ifsc || '',
          branch: data.branch || '',
          account_type: data.account_type || '',
        });
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  async function handleSave() {
  try {
    await updateDonationSettings(form);
    alert('Donation settings updated successfully!');
  } catch (err) {
    console.error(err);
    alert('Failed to update donation settings.');
  }
}

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border p-8 pb-24">
        Loading Donation Settings...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border p-8">
      <h1 className="text-2xl font-bold mb-6">
        Donation Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div>
    <label className="block text-sm font-semibold mb-2">
      UPI ID
    </label>

    <input
      name="upi_id"
      value={form.upi_id}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Bank Name
    </label>

    <input
      name="bank_name"
      value={form.bank_name}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Account Name
    </label>

    <input
      name="account_name"
      value={form.account_name}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Account Number
    </label>

    <input
      name="account_number"
      value={form.account_number}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      IFSC
    </label>

    <input
      name="ifsc"
      value={form.ifsc}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Branch
    </label>

    <input
      name="branch"
      value={form.branch}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>

    <div className="md:col-span-2">

  <label className="block text-sm font-semibold mb-3">
    QR Code Preview
  </label>

  <div className="flex flex-col md:flex-row gap-6 items-start">

    <div className="border rounded-xl p-4 bg-slate-50">
      <img
        src={form.qr_image}
        alt="Donation QR"
        className="w-44 h-44 object-contain"
      />
    </div>

    <div className="flex-1">

      <label className="block text-sm font-semibold mb-2">
        QR Image Path
      </label>

      <input
        name="qr_image"
        value={form.qr_image}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
      />

      <p className="text-xs text-slate-500 mt-2">
        This path is used by the public donation page.
      </p>

    </div>

  </div>

</div>

</div>

<div className="mt-8 flex justify-end">
  <button
    onClick={handleSave}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
  >
    Save Changes
  </button>
</div>

</div>
);
}