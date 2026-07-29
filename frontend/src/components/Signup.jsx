'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf, MapPin, Trophy, Mail, Lock, User, Phone, Check, Globe, Heart } from 'lucide-react';
import {imageIllustration} from "../assets/loginpage.jpg";
export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = [
    {
      id: 'citizen',
      name: 'Citizen',
      icon: Leaf,
      description: 'Report environmental issues.',
    },
    {
      id: 'officer',
      name: 'Government Officer',
      icon: MapPin,
      description: 'Review and manage reports.',
    },
    {
      id: 'ngo',
      name: 'NGO / Volunteer',
      icon: Trophy,
      description: 'Participate in cleanup drives.',
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert('Account created successfully!');
      }, 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingCircleVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
      },
    },
  };

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Floating linear circles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 bg-linear-to-br from-green-200 to-emerald-100 rounded-full opacity-30 blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-emerald-100 to-green-50 rounded-full opacity-20 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-32 right-1/3 w-72 h-72 bg-linear-to-br from-green-100 to-emerald-50 rounded-full opacity-25 blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Feature Section (Hidden on mobile) */}
        <motion.div
          className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-white via-green-50 to-emerald-50"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Title */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-900">GreenVision AI</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Join GreenVision AI
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Report environmental issues, collaborate with your community, and help build a cleaner future.
              </p>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <motion.div variants={containerVariants} className="space-y-4">
            {[
              { icon: Leaf, title: 'AI Waste Detection', desc: 'Identify and categorize environmental issues' },
              { icon: MapPin, title: 'Live Community Reporting', desc: 'Real-time updates from your area' },
              { icon: Trophy, title: 'Earn Eco Rewards', desc: 'Get recognized for your contributions' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white/60 backdrop-blur-sm border border-green-100 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/80 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <feature.icon className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Signup Card */}
        <motion.div
          className="flex items-center justify-center p-6 lg:p-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                  Login
                </a>
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.fullName
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.phone
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.password
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < passwordStrength ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </motion.div>

              {/* Role Selection */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <motion.button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                          isSelected
                            ? 'border-green-500 bg-green-50 shadow-lg shadow-green-200'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <Icon className={`${isSelected ? 'text-green-600' : 'text-gray-400'}`} size={20} />
                        <span className={`text-xs font-medium text-center leading-tight ${
                          isSelected ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {role.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </motion.div>

              {/* Terms Checkbox */}
              <motion.div variants={itemVariants}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (e.target.checked && errors.terms) {
                        setErrors((prev) => ({
                          ...prev,
                          terms: '',
                        }));
                      }
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading || !termsAccepted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <Check size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-600 font-medium">OR CONTINUE WITH</span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-gray-700"
              >
                <Globe size={18} />
                <span className="hidden sm:inline">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-gray-700"
              >
                <Heart size={18} />
                <span className="hidden sm:inline">Facebook</span>
              </button>
            </motion.div>

            {/* Bottom Link */}
            <motion.p variants={itemVariants} className="text-center text-sm text-gray-600 mt-6">
              Not ready yet?{' '}
              <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                Learn more
              </a>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
