'use client';

import React, { useState } from 'react';
import { Upload, MapPin, AlertCircle, Check, X, Bell, Search, User, Leaf, Droplet, Wind, Zap, Trash2, AlertTriangle } from 'lucide-react';

export default function ReportIssue() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Plastic Waste',
    location: '',
    landmark: '',
    description: '',
    severity: 'Medium',
    impacts: [],
    wasteQuantity: 'Medium',
    anonymous: false,
    emergency: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const categories = [
    'Plastic Waste',
    'Overflowing Dustbin',
    'Illegal Dumping',
    'Construction Debris',
    'Sewage Leakage',
    'Water Pollution',
    'Air Pollution',
    'E-Waste',
    'Chemical Waste',
    'Other',
  ];

  const impacts = [
    'Public Health Risk',
    'Water Pollution',
    'Air Pollution',
    'Wildlife Risk',
    'Traffic Obstruction',
    'Fire Hazard',
  ];

  const wasteQuantityOptions = ['Small', 'Medium', 'Large', 'Very Large'];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          preview: event.target?.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setFormData({ ...formData, description: text });
    setDescriptionLength(text.length);
  };

  const toggleImpact = (impact) => {
    setFormData((prev) => ({
      ...prev,
      impacts: prev.impacts.includes(impact)
        ? prev.impacts.filter((i) => i !== impact)
        : [...prev.impacts, impact],
    }));
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-green-50 to-emerald-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="text-xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              GreenVision
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-600 cursor-pointer hover:text-slate-900 transition" />
            <div className="w-8 h-8 rounded-full bg-linear-to-brrom-green-400 to-emerald-600" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SECTION - Upload */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-8 border border-green-100/50 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Upload Evidence</h2>

              {!uploadedFile ? (
                <label className="block">
                  <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer bg-linear-to-brrom-green-50 to-emerald-50">
                    <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="font-semibold text-slate-900 mb-1">Click to upload</p>
                    <p className="text-sm text-slate-500">or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              ) : (
                <div className="space-y-4">
                  <img
                    src={uploadedFile.preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-green-200"
                  />

                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-900">{uploadedFile.name}</p>
                    <p className="text-xs text-slate-500">{uploadedFile.size}</p>
                  </div>

                  {/* AI Preview Card */}
                  <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-cyan-200/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-600" />
                      <p className="text-xs font-semibold text-cyan-900">AI Analysis</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-cyan-200/50 rounded-full w-3/4" />
                      <div className="h-3 bg-cyan-200/50 rounded-full w-full" />
                      <div className="h-3 bg-cyan-200/50 rounded-full w-2/3" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <label className="flex-1">
                      <div className="px-4 py-2 bg-green-50 border border-green-300 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition text-center cursor-pointer text-sm">
                        Replace
                      </div>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                    <button
                      onClick={handleRemoveFile}
                      className="flex-1 px-4 py-2 bg-red-50 border border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SECTION - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Category */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Issue Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-slate-900 font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-slate-900"
                  />
                </div>
                <button className="px-4 py-3 bg-green-50 border border-green-300 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-colors text-sm">
                  Use Current
                </button>
              </div>
            </div>

            {/* Landmark */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Landmark (Optional)</label>
              <input
                type="text"
                placeholder="Near PES University Gate 2"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-slate-900"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
              <textarea
                placeholder="Describe the environmental issue in detail…"
                value={formData.description}
                onChange={handleDescriptionChange}
                maxLength={500}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-slate-900 resize-none h-24"
              />
              <div className="text-xs text-slate-500 mt-1">{descriptionLength}/500 characters</div>
            </div>

            {/* Severity */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-3">Severity Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, severity: level })}
                    className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
                      formData.severity === level
                        ? level === 'Critical'
                          ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                          : level === 'High'
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                            : level === 'Medium'
                              ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-200'
                              : 'bg-green-500 text-white shadow-lg shadow-green-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Environmental Impacts */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-3">Environmental Impacts</label>
              <div className="grid grid-cols-2 gap-2">
                {impacts.map((impact) => (
                  <button
                    key={impact}
                    onClick={() => toggleImpact(impact)}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                      formData.impacts.includes(impact)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {impact}
                  </button>
                ))}
              </div>
            </div>

            {/* Waste Quantity */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Estimated Waste Quantity</label>
              <select
                value={formData.wasteQuantity}
                onChange={(e) => setFormData({ ...formData, wasteQuantity: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-slate-900 font-medium"
              >
                {wasteQuantityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl shadow-lg shadow-green-100/50 p-6 border border-green-100/50 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                  className="w-4 h-4 rounded border-2 border-green-300 accent-green-600"
                />
                <span className="text-sm font-semibold text-slate-900">Report Anonymously</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emergency}
                  onChange={(e) => setFormData({ ...formData, emergency: e.target.checked })}
                  className="w-4 h-4 rounded border-2 border-red-300 accent-red-600"
                />
                <span className="text-sm font-semibold text-slate-900">🚨 Mark as Emergency</span>
              </label>
            </div>

            {/* Report Summary */}
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Report Summary</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <p>
                  <span className="font-semibold">Category:</span> {formData.category}
                </p>
                <p>
                  <span className="font-semibold">Severity:</span> {formData.severity}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span> {formData.wasteQuantity}
                </p>
                <p>
                  <span className="font-semibold">Impacts:</span> {formData.impacts.length > 0 ? formData.impacts.join(', ') : 'None selected'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleSubmit}
                className="col-span-2 py-3 px-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-200 transition-all hover:scale-105 active:scale-95"
              >
                Submit Report
              </button>
              <button className="py-3 px-4 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all">
                Save Draft
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900">AI Detection</p>
                <p className="text-xs text-slate-500">Instant Analysis</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                <AlertTriangle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900">Review Process</p>
                <p className="text-xs text-slate-500">24h Government Check</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900">Eco Rewards</p>
                <p className="text-xs text-slate-500">Earn Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl border border-green-200 animate-bounce">
            <div className="w-16 h-16 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Report Submitted!</h3>
            <p className="text-slate-600 mb-6">Thank you for helping keep our environment clean. Your report has been sent to the authorities.</p>
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition">
                Close
              </button>
              <button className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                Share Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
