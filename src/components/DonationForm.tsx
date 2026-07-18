'use client';

import { getDonationSettings } from '@/lib/db';
import React, { useEffect, useState } from 'react';
import { Heart, CreditCard, QrCode, ClipboardCheck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { addDonation } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { IMAGES } from '@/lib/images';

export default function DonationForm() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'sponsor'>('one-time');
  const [amount, setAmount] = useState<string>('2500');
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    transactionId: '',
    message: '',
  });
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details, 2: Payment (QR/Bank), 3: Success
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [copiedText, setCopiedText] = useState<'upi' | 'bank' | null>(null);
  const [donationSettings, setDonationSettings] = useState<any>(null);
  useEffect(() => {
  async function loadDonationSettings() {
    const data = await getDonationSettings();
    setDonationSettings(data);
  }

  loadDonationSettings();
}, []);
const amounts = ['1500', '2500', '3500', '5000'];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountSelect = (val: string) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const getFinalAmount = () => {
    if (donationType === 'sponsor') return 3500; // Fixed sponsor amount
    return parseFloat(customAmount || amount || '0');
  };

  const validateDetails = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all contact details.');
      return false;
    }
    const finalAmt = getFinalAmount();
    if (isNaN(finalAmt) || finalAmt <= 0) {
      setErrorMessage('Please select or enter a valid donation amount.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const proceedToPayment = () => {
    if (validateDetails()) {
      setStep(2);
    }
  };

  const handleCopy = (text: string, type: 'upi' | 'bank') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmitDonation = async (e: React.FormEvent) => {
  e.preventDefault();

  // Require either Transaction ID or Screenshot
  if (!formData.transactionId && !paymentProof) {
    setErrorMessage(
      'Please provide either a Transaction ID or upload a payment screenshot.'
    );
    return;
  }

  setStatus('submitting');

  try {
    let proofImage = '';

    // Upload screenshot if selected
    if (paymentProof) {
      const fileExt = paymentProof.name.split('.').pop();
      const fileName = `proof-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('donation-proofs')
        .upload(fileName, paymentProof);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('donation-proofs')
        .getPublicUrl(fileName);

      proofImage = data.publicUrl;
      console.log("Proof Image URL:", proofImage);
    }

    const payload = {
      donor_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: getFinalAmount(),
      payment_method: donationType,
      transaction_id: formData.transactionId,
      proof_image: proofImage,
      message: formData.message,
      status: 'pending'
    };

    const response = await addDonation(payload);
    console.log("Donation Payload:", payload);

    if (response.success) {
      setStatus('idle');
      setStep(3);
    } else {
      throw new Error('Donation registration failed');
    }

  } catch (error) {
    console.error(error);

    setStatus('error');

    setErrorMessage(
      'Error recording donation. Please try again.'
    );
  }
};

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-2xl mx-auto">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8 relative">
        <div className="absolute right-6 bottom-4 text-blue-500/20 pointer-events-none">
          <Heart className="w-32 h-32 fill-current" />
        </div>
        <div className="relative">
          <span className="bg-orange-500 text-white font-bold text-xs uppercase px-3 py-1 rounded-full">
            Secure Donation Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">Empower Varanasi Communities</h2>
          <p className="text-indigo-200 text-sm mt-1 leading-relaxed max-w-md">
            Your contributions help fund education materials, tailoring kits, clean water, and nutrition programs.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6">
            {/* Step Indicators */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="text-blue-600">1. Donor Information</span>
              <span>2. Transfer Payment</span>
              <span>3. Confirmation</span>
            </div>

            {/* Donation Type Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Select Donation Support Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={`py-3 px-2 text-center rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                    donationType === 'one-time'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  One-Time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('monthly')}
                  className={`py-3 px-2 text-center rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                    donationType === 'monthly'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Monthly Sustainer
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('sponsor')}
                  className={`py-3 px-2 text-center rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                    donationType === 'sponsor'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Sponsor a Child
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            {donationType !== 'sponsor' ? (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Amount (INR)</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {amounts.map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`py-2.5 rounded-lg font-bold text-sm border transition-all cursor-pointer ${
                        amount === amt
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount in ₹"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-xl text-sm text-orange-800">
                <strong>Sponsorship package:</strong> Sponsoring a child covers tuition, study kits, daily snacks, and health support. This is fixed at <strong>₹5000 / month</strong> per child.
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 pt-2 border-t border-slate-100">Donor Information</h3>
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 99887 76655"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
                <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Message <span className="text-slate-400">(Optional)</span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Write a message for Khula Aasman Sanstha..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
              </div>
            </div>

            <button
              type="button"
              onClick={proceedToPayment}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              Proceed to Payment (₹{getFinalAmount()})
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitDonation} className="space-y-6">
            {/* Step Indicators */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span className="text-slate-500 cursor-pointer hover:underline" onClick={() => setStep(1)}>1. Donor Information</span>
              <span className="text-blue-600 font-bold">2. Transfer Payment</span>
              <span>3. Confirmation</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-600 flex justify-between items-center">
              <span>Selected Amount: <strong>₹{getFinalAmount()} ({donationType === 'sponsor' ? 'Child Sponsorship' : donationType})</strong></span>
              <button type="button" onClick={() => setStep(1)} className="text-blue-600 hover:underline font-semibold cursor-pointer">Edit Details</button>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Option A: UPI Scan */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 mb-3 uppercase">
                  <QrCode className="w-4 h-4 text-blue-600" />
                  Option A: UPI Scan
                </div>
                <img
                src={donationSettings?.qr_image || IMAGES.donations.qr}
                alt="UPI QR Code"
                className="w-40 h-40 border rounded-lg shadow-inner mb-3 bg-slate-50"
                />
                <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 flex items-center gap-2 w-full justify-between">
                  <span className="truncate">
                  {donationSettings?.upi_id || 'donate@khulaaasman'}
                  </span>               
                  <button
                    type="button"
                    onClick={() => handleCopy(donationSettings?.upi_id ||'donate@khulaaasman', 'upi')}
                    className="text-blue-600 hover:text-blue-800 flex-shrink-0 cursor-pointer"
                  >
                    {copiedText === 'upi' ? <ClipboardCheck className="w-4 h-4 text-emerald-600" /> : 'Copy'}
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 mt-2">Works with GooglePay, PhonePe, Paytm, BHIM</span>
              </div>

              {/* Option B: Bank Details */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 mb-3 uppercase">
                  <CreditCard className="w-4 h-4 text-orange-500" />
                  Option B: Bank Transfer
                </div>
                <div className="space-y-2 text-xs text-slate-600 flex-grow pt-2">
                 <p><strong>Bank Name:</strong> {donationSettings?.bank_name || 'State Bank of India (SBI)'}</p>

<p><strong>Account:</strong> {donationSettings?.account_name || 'KHULA AASMAN SANSTHA'}</p>

<p><strong>Account No:</strong> {donationSettings?.account_number || '50200071835521'}</p>

<p><strong>IFSC Code:</strong> {donationSettings?.ifsc || 'HDFC0001465'}</p>

<p><strong>Branch:</strong> {donationSettings?.branch || 'Lanka , Varanasi'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("SBI | KHULA AASMAN SANSTHA | A/C: 42189037461 | IFSC: SBIN0000218", 'bank')}
                  className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedText === 'bank' ? <ClipboardCheck className="w-4 h-4 text-emerald-600" /> : 'Copy Bank Details'}
                </button>
              </div>
            </div>

            {/* Verification Reference Code */}
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-3">
              <label htmlFor="transactionId" className="block text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                Step 3: Confirm Transfer Reference <span className="text-rose-500">*</span>
              </label>
              <p className="text-[11px] text-slate-500 leading-tight">
                Once scanned or deposited, please enter the Transaction ID / Ref number below. We verify this transaction to send you the receipt.
              </p>
              <input
                type="text"
                name="transactionId"
                id="transactionId"
                required
                value={formData.transactionId}
                onChange={handleInputChange}
                disabled={status === 'submitting'}
                placeholder="e.g. UPI Ref: 418290384729 or Bank Ref No."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Payment Screenshot Upload */}
<div className="mt-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">

  <label className="block text-xs sm:text-sm font-bold text-slate-800">
    Or Upload Payment Screenshot
  </label>

  <p className="text-[11px] text-slate-500">
    If you don't have the Transaction ID, upload the payment screenshot instead.
  </p>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setPaymentProof(e.target.files[0]);
      }
    }}
    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
  />

  {paymentProof && (
    <p className="text-xs text-green-600">
      Selected: {paymentProof.name}
    </p>
  )}

</div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex-grow flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  'Submit Donation Confirmation'
                )}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-10 space-y-6">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-12 w-12 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">Thank You, Generous Donor!</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                We have registered your donation confirmation (Ref: {formData.transactionId}). Our treasury team will match this with bank records and email your official donation receipt shortly.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({name: '',email: '',phone: '',transactionId: '',message: '',});
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                Make Another Donation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
