// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Leaf, MapPin, Trophy, Mail, Lock, User, Phone, Check, Globe, Heart } from 'lucide-react';
// // import {imageIllustration} from "../assets/earth.png";
// export default function Signup() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const roles = [
//     {
//       id: 'citizen',
//       name: 'Citizen',
//       icon: Leaf,
//       description: 'Report environmental issues.',
//     },
//     {
//       id: 'officer',
//       name: 'Government Officer',
//       icon: MapPin,
//       description: 'Review and manage reports.',
//     },
    
//   ];

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
//     if (!selectedRole) {
//       newErrors.role = 'Please select a role';
//     }
//     if (!termsAccepted) {
//       newErrors.terms = 'You must accept the terms and conditions';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: '',
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);
//       // Simulate API call
//       setTimeout(() => {
//         setIsLoading(false);
//         alert('Account created successfully!');
//       }, 2000);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   const floatingCircleVariants = {
//     animate: {
//       y: [0, -20, 0],
//       transition: {
//         duration: 6,
//         repeat: Infinity,
//       },
//     },
//   };

//   const getPasswordStrength = (password) => {
//     if (!password) return 0;
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
//     if (/\d/.test(password)) strength++;
//     if (/[^a-zA-Z\d]/.test(password)) strength++;
//     return strength;
//   };

//   const passwordStrength = getPasswordStrength(formData.password);

//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       {/* Floating linear circles background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute -top-32 -right-32 w-64 h-64 bg-linear-to-br from-green-200 to-emerald-100 rounded-full opacity-30 blur-3xl"
//           animate={{
//             y: [0, 30, 0],
//             x: [0, 15, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//           }}
//         />
//         <motion.div
//           className="absolute top-1/2 -left-40 w-80 h-80 bg-linear-to-br from-emerald-100 to-green-50 rounded-full opacity-20 blur-3xl"
//           animate={{
//             y: [0, -30, 0],
//             x: [0, -15, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//           }}
//         />
//         <motion.div
//           className="absolute -bottom-32 right-1/3 w-72 h-72 bg-linear-to-br from-green-100 to-emerald-50 rounded-full opacity-25 blur-3xl"
//           animate={{
//             y: [0, 20, 0],
//             x: [0, 20, 0],
//           }}
//           transition={{
//             duration: 9,
//             repeat: Infinity,
//           }}
//         />
//       </div>

//       <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
//         {/* Left Side - Feature Section (Hidden on mobile) */}
//         <motion.div
//           className="hidden lg:flex flex-col p-12 bg-linear-to-br from-white via-green-50 to-emerald-50"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Logo and Title */}
//           <div>
//             <motion.div variants={itemVariants} className="mb-3">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
//                   <Leaf className="text-white" size={24} />
//                 </div>
//                 <span className="text-2xl font-bold text-gray-900">GreenVision AI</span>
//               </div>
//             </motion.div>

//             <motion.div variants={itemVariants} className="space-y-4">
//               <h1 className="text-4xl font-bold text-gray-900 leading-tight">
//                 Join GreenVision AI
//               </h1>
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 Report environmental issues, collaborate with your community, and help build a cleaner future.
//               </p>
//             </motion.div>
//           </div>

//           {/* Feature Cards */}
//           <motion.div variants={containerVariants} className="space-y-4 mt-56">
//             {[
//               { icon: Leaf, title: 'AI Waste Detection', desc: 'Identify and categorize environmental issues' },
//               { icon: MapPin, title: 'Live Community Reporting', desc: 'Real-time updates from your area' },
//               { icon: Trophy, title: 'Earn Eco Rewards', desc: 'Get recognized for your contributions' },
//             ].map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={itemVariants}
//                 className="bg-white/60 backdrop-blur-sm border border-green-100 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/80 transition-all duration-300"
//               >
//                 <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
//                   <feature.icon className="text-white" size={20} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{feature.title}</h3>
//                   <p className="text-sm text-gray-600">{feature.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Right Side - Signup Card */}
//         <motion.div
//           className="flex items-center justify-center p-6 lg:p-12"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div
//             className="w-full max-w-md"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Header */}
//             <motion.div variants={itemVariants} className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
//               <p className="text-gray-600">
//                 Already have an account?{' '}
//                 <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
//                   Login
//                 </a>
//               </p>
//             </motion.div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full Name */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <User size={18} />
//                   </div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                       errors.fullName
//                         ? 'border-red-300 focus:ring-red-500'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//               </motion.div>

//               {/* Email */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <Mail size={18} />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="you@example.com"
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                       errors.email
//                         ? 'border-red-300 focus:ring-red-500'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </motion.div>

//               {/* Phone */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <Phone size={18} />
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="+1 (555) 000-0000"
//                     className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                       errors.phone
//                         ? 'border-red-300 focus:ring-red-500'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   />
//                 </div>
//                 {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//               </motion.div>

//               {/* Password */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <Lock size={18} />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                       errors.password
//                         ? 'border-red-300 focus:ring-red-500'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {formData.password && (
//                   <div className="mt-2 flex gap-1">
//                     {[...Array(4)].map((_, i) => (
//                       <div
//                         key={i}
//                         className={`h-1 flex-1 rounded-full transition-colors ${
//                           i < passwordStrength ? 'bg-green-500' : 'bg-gray-200'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 )}
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//               </motion.div>

//               {/* Confirm Password */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <Lock size={18} />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                       errors.confirmPassword
//                         ? 'border-red-300 focus:ring-red-500'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//                 )}
//               </motion.div>

//               {/* Role Selection */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
//                 <div className="grid grid-cols-3 gap-2">
//                   {roles.map((role) => {
//                     const Icon = role.icon;
//                     const isSelected = selectedRole === role.id;
//                     return (
//                       <motion.button
//                         key={role.id}
//                         type="button"
//                         onClick={() => setSelectedRole(role.id)}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className={`p-2 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1.5 ${
//                           isSelected
//                             ? 'border-green-500 bg-green-50 shadow-lg shadow-green-200'
//                             : 'border-gray-200 hover:border-gray-300 bg-white'
//                         }`}
//                       >
//                         <Icon className={`${isSelected ? 'text-green-600' : 'text-gray-400'}`} size={20} />
//                         <span className={`text-xs font-medium text-center leading-tight ${
//                           isSelected ? 'text-green-700' : 'text-gray-600'
//                         }`}>
//                           {role.name}
//                         </span>
//                       </motion.button>
//                     );
//                   })}
//                 </div>
//                 {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
//               </motion.div>

//               {/* Terms Checkbox */}
//               <motion.div variants={itemVariants}>
//                 <label className="flex items-start gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={termsAccepted}
//                     onChange={(e) => {
//                       setTermsAccepted(e.target.checked);
//                       if (e.target.checked && errors.terms) {
//                         setErrors((prev) => ({
//                           ...prev,
//                           terms: '',
//                         }));
//                       }
//                     }}
//                     className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 mt-0.5"
//                   />
//                   <span className="text-sm text-gray-600">
//                     I agree to the{' '}
//                     <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
//                       Terms & Conditions
//                     </a>{' '}
//                     and{' '}
//                     <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
//                       Privacy Policy
//                     </a>
//                   </span>
//                 </label>
//                 {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
//               </motion.div>

//               {/* Submit Button */}
//               <motion.button
//                 variants={itemVariants}
//                 type="submit"
//                 disabled={isLoading || !termsAccepted}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isLoading ? (
//                   <>
//                     <motion.div
//                       className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//                     />
//                     Creating Account...
//                   </>
//                 ) : (
//                   <>
//                     Create Account
//                     <Check size={18} />
//                   </>
//                 )}
//               </motion.button>
//             </form>

//             {/* Divider */}
//             <motion.div variants={itemVariants} className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-3 bg-white text-gray-600 font-medium">OR CONTINUE WITH</span>
//               </div>
//             </motion.div>

//             {/* Social Login */}
//             <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-gray-700"
//               >
//                 <Globe size={18} />
//                 <span className="hidden sm:inline">Google</span>
//               </button>
//               <button
//                 type="button"
//                 className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-gray-700"
//               >
//                 <Heart size={18} />
//                 <span className="hidden sm:inline">Facebook</span>
//               </button>
//             </motion.div>

//             {/* Bottom Link */}
//             <motion.p variants={itemVariants} className="text-center text-sm text-gray-600 mt-6">
//               Not ready yet?{' '}
//               <a href="#" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
//                 Learn more
//               </a>
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  Eye,
  EyeOff,
  // Facebook,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  TreePine,
  User,
  Users,
} from "lucide-react";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    location: "",
    accessCode: "",
  });

  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.location.trim()) nextErrors.location = "Location is required.";
    if (!role) nextErrors.role = "Please select a role.";

    if (role === "government" && !form.accessCode.trim()) {
      nextErrors.accessCode = "Government access code is required.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };

  const handleProfilePicture = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
  };

  const Field = ({
    id,
    label,
    placeholder,
    icon: Icon,
    type = "text",
    required = true,
    rightElement,
  }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
        {!required && (
          <span className="ml-2 text-xs font-normal text-slate-400">
            Optional
          </span>
        )}
      </label>

      <div className="relative">
        <Icon
          aria-hidden="true"
          className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
        />
        <input
          id={id}
          name={id}
          type={type}
          value={form[id]}
          onChange={updateField}
          placeholder={placeholder}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          className={`h-13 w-full rounded-2xl border bg-white pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
            errors[id] ? "border-red-400" : "border-slate-200"
          }`}
        />
        {rightElement}
      </div>

      {errors[id] && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <section className="relative hidden w-[46%] overflow-hidden bg-emerald-950 px-12 py-12 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.3),transparent_35%),linear-gradient(145deg,#064e3b,#022c22)]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-950/30">
              <Leaf className="size-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              GreenVision AI
            </span>
          </div>

          <div className="relative z-10 mt-24 max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="size-4" />
              Technology for thriving communities
            </p>

            <h1 className="text-balance text-6xl font-bold leading-[1.05] tracking-tight">
              Build a Cleaner,
              <span className="block text-emerald-300">Smarter Future.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-emerald-100/80">
              Join GreenVision AI and help communities identify, report, and
              resolve environmental issues using AI-powered technology.
            </p>
          </div>

          <div className="relative z-10 my-14 flex min-h-67.5 items-center justify-center">
            <div className="relative flex size-64 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 shadow-2xl shadow-emerald-950/40">
              <div className="absolute inset-5 rounded-full border border-emerald-300/20" />
              <div className="flex size-28 items-center justify-center rounded-[2rem] bg-emerald-400 text-emerald-950 shadow-xl shadow-emerald-950/40">
                <TreePine className="size-16" />
              </div>

              <div className="absolute -right-5 top-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md">
                <Recycle className="size-5 text-emerald-300" />
                Clean streets
              </div>

              <div className="absolute -bottom-5 -left-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md">
                <ShieldCheck className="size-5 text-emerald-300" />
                AI monitoring
              </div>

              <div className="absolute -left-10 top-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md">
                <Users className="size-5 text-emerald-300" />
                Community action
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto grid gap-4">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Detection",
                text: "Identify environmental issues with computer vision.",
              },
              {
                icon: Users,
                title: "Community Action",
                text: "Turn environmental reports into real cleanup activities.",
              },
              {
                icon: TreePine,
                title: "Cleaner Cities",
                text: "Track issues from reporting to resolution.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-emerald-100/70">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex w-full items-center justify-center px-5 py-8 sm:px-8 lg:w-[54%] lg:px-14 lg:py-12">
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Leaf className="size-5" />
              </div>
              <span className="text-xl font-bold text-emerald-950">
                GreenVision AI
              </span>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create Your Account
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Join GreenVision AI and start making a difference.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="username"
                    label="Full Name"
                    placeholder="Enter your full name"
                    icon={User}
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    icon={Mail}
                    type="email"
                  />
                  <Field
                    id="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    icon={Phone}
                  />
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={updateField}
                        placeholder="Create a strong password"
                        aria-invalid={Boolean(errors.password)}
                        className={`h-13 w-full rounded-2xl border bg-white pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                          errors.password
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600"
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">Minimum 8 characters</p>
                    {errors.password && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={updateField}
                        placeholder="Re-enter your password"
                        aria-invalid={Boolean(errors.confirmPassword)}
                        className={`h-13 w-full rounded-2xl border bg-white pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                          errors.confirmPassword
                           ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((current) => !current)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirmed password"
                            : "Show confirmed password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">
                    Location
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="city"
                      label="City"
                      placeholder="Enter your city"
                      icon={MapPin}
                    />
                    <Field
                      id="location"
                      label="Location / Area"
                      placeholder="Enter your area or locality"
                      icon={MapPin}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-emerald-200 bg-emerald-50 text-emerald-500">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <User className="size-8" />
                    )}
                    <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-md transition hover:bg-emerald-700"
                    >
                      <Camera className="size-4" />
                      <span className="sr-only">Change profile picture</span>
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicture}
                      className="sr-only"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-700">
                      Profile Picture{" "}
                      <span className="font-normal text-slate-400">
                        Optional
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Add a photo to personalize your profile.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-700">
                      Select Your Role
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Choose how you will participate in GreenVision AI.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        id: "citizen",
                        title: "Citizen",
                        text: "Report environmental issues and participate in cleanup activities.",
                        icon: Users,
                      },
                      {
                        id: "government",
                        title: "Government Officer",
                        text: "Review environmental reports and manage cleanup operations.",
                        icon: ShieldCheck,
                      },
                    ].map(({ id, title, text, icon: Icon }) => {
                      const selected = role === id;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            setRole(id);
                            setErrors((current) => ({
                              ...current,
                              role: "",
                              accessCode: "",
                            }));
                          }}
                          className={`relative rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-100"
                              : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"
                          }`}
                          aria-pressed={selected}
                        >
                          {selected && (
                            <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                              <Check className="size-3" />
                            </span>
                          )}
                          <Icon
                            className={`mb-3 size-6 ${
                              selected ? "text-emerald-600" : "text-slate-400"
                            }`}
                          />
                          <h3 className="text-sm font-bold text-slate-800">
                            {title}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {text}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {errors.role && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.role}
                    </p>
                  )}
                </div>

                {role === "government" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="accessCode"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Government Access Code
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="accessCode"
                        name="accessCode"
                        value={form.accessCode}
                        onChange={updateField}
                        placeholder="Enter government access code"
                        aria-invalid={Boolean(errors.accessCode)}
                        className={`h-13 w-full rounded-2xl border bg-white pl-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                          errors.accessCode
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      A valid authorization code is required for government
                      accounts.
                    </p>
                    {errors.accessCode && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.accessCode}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </button>

                {submitted && Object.keys(errors).length === 0 && !loading && (
                  <p className="text-center text-sm font-medium text-emerald-600">
                    Your account is ready to be created.
                  </p>
                )}

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-semibold text-slate-400">OR</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <span className="text-base font-bold text-red-500">G</span>
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {/* <Facebook className="size-5 fill-blue-600 text-blue-600" /> */}
                    Continue with Facebook
                  </button>
                </div>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-bold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}