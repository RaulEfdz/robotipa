"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import ContactTurnstile from './ContactTurnstile';
import { contactFormSchema, type ContactFormData } from '@/app/actions';

const API_URL = '/api/contact';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    phone: '',
    company: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      const result = await contactFormSchema.parse(formData);
      const response = await axios.post(API_URL, result);
      
      if (response.data.success) {
        setSuccessMessage(true);
        setFormData({
          name: '',
          email: '',
          message: '',
          phone: '',
          company: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.reduce((acc: Record<string, string>, error: z.ZodError['errors'][number]) => ({
          ...acc,
          [error.path[0] as string]: error.message
        }), {}));
      } else {
        console.error('Error submitting form:', error);
        setSubmitError('Error submitting form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contáctanos</h2>
          
          <div className="max-w-2xl mx-auto">
            {successMessage ? (
              <div className="success-message">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p className="text-center">¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.</p>
                </div>
              </div>
            ) : (
              <div className="contact-form">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full px-3 sm:px-4 pt-6 pb-2 sm:pt-6 sm:pb-2 text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-inset focus:ring-neutral-400 focus:border-neutral-400 focus:outline-none transition-all duration-200 ease-in-out"
                      placeholder="Name"
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:-translate-y-1.5
                peer-not-placeholder-shown:text-neutral-400"
                    >
                      Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full px-3 sm:px-4 pt-6 pb-2 sm:pt-6 sm:pb-2 text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-inset focus:ring-neutral-400 focus:border-neutral-400 focus:outline-none transition-all duration-200 ease-in-out"
                      placeholder="Email"
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:-translate-y-1.5
                peer-not-placeholder-shown:text-neutral-400"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="peer w-full px-3 sm:px-4 pt-6 pb-2 sm:pt-6 sm:pb-2 text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-inset focus:ring-neutral-400 focus:border-neutral-400 focus:outline-none transition-all duration-200 ease-in-out"
                      placeholder="Company"
                    />
                    <label
                      htmlFor="company"
                      className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:-translate-y-1.5
                peer-not-placeholder-shown:text-neutral-400"
                    >
                      Company
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="peer w-full px-3 sm:px-4 pt-6 pb-2 sm:pt-6 sm:pb-2 text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-inset focus:ring-neutral-400 focus:border-neutral-400 focus:outline-none transition-all duration-200 ease-in-out"
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:-translate-y-1.5
                peer-not-placeholder-shown:text-neutral-400"
                    >
                      Phone
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="peer w-full px-3 sm:px-4 pt-6 pb-2 sm:pt-6 sm:pb-2 text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-inset focus:ring-neutral-400 focus:border-neutral-400 focus:outline-none transition-all duration-200 ease-in-out"
                      placeholder="Tell us about your project"
                      required
                    />
                    <label
                      htmlFor="message"
                      className="absolute top-0 start-0 p-3 sm:p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:-translate-y-1.5
                peer-not-placeholder-shown:text-neutral-400"
                    >
                      Tell us about your project
                    </label>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs text-neutral-500">
                      All fields are required
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-x-2 py-2 px-3 bg-lego-accent font-medium text-sm text-lego-primary rounded-full focus:outline-hidden"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                      <svg
                        className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
