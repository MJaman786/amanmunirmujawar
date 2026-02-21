import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  User,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
} from 'lucide-react';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: 'amanmujawar354@gmail.com',
      subject: '',
      message: '',
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.name.trim()) {
        errors.name = 'Full name is required';
      }

      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (!values.message.trim()) {
        errors.message = 'Please include a message';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setStatus('loading');
      console.log(values);
      
      // Simulate API call
      setTimeout(() => {
        setStatus('success');
        resetForm();

        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      }, 1500);
    },
  });

  return (
    <section className="font-poppins py-24 px-6 bg-white selection:bg-indigo-100" id="contact">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
                Get in <span className="text-indigo-600">touch.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Whether you're looking to discuss a new project, an internship opportunity, or just want to talk tech, my inbox is always open.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                    Email Me
                  </p>
                  <p className="text-slate-500">amanmujawar354@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="text-slate-500">+91 8149629079</p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "I typically respond within 24 hours. Looking forward to connecting with fellow innovators."
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-100 rounded-[2rem] p-8 md:p-10">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="John Doe"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${
                          formik.touched.name && formik.errors.name
                            ? 'border-red-500'
                            : 'border-slate-200'
                        } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none`}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="john@example.com"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${
                          formik.touched.email && formik.errors.email
                            ? 'border-red-500'
                            : 'border-slate-200'
                        } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none`}
                        disabled
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    placeholder="Project Inquiry / Hiring"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea
                      name="message"
                      rows={4}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Hi, I'd like to talk about..."
                      className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${
                        formik.touched.message && formik.errors.message
                          ? 'border-red-500'
                          : 'border-slate-200'
                      } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none resize-none`}
                    />
                  </div>
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formik.errors.message}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl shadow-indigo-100"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-center text-sm font-medium text-green-600">
                    Thank you! I'll get back to you shortly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
