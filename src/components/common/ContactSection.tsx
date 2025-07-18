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
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
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
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contáctanos</h2>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Contact Info */}
            <div className="md:w-5/12 bg-blue-600 text-white p-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Información de contacto</h3>
                  <p className="text-blue-100">¿Tienes alguna pregunta? No dudes en contactarnos. Nuestro equipo se pondrá en contacto contigo lo antes posible.</p>
                </div>
                
                {/* Contact details */}
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500 p-2 rounded-lg">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-blue-100 font-medium">Correo electrónico</p>
                      <p className="text-blue-200">contacto@robotipa.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="pt-6">
                  <h4 className="text-lg font-medium mb-4">Síguenos</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-7/12 p-10">
              {successMessage ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600 mb-6">Hemos recibido tu mensaje. Nos pondremos en contacto contigo en las próximas 24 horas.</p>
                  <button
                    onClick={() => setSuccessMessage(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full px-3 sm:px-4 pt-6 pb-2 sm:pt-6 sm:pb-2 text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-inset focus:ring-neutral-400 focus:border-neutral-400 focus:outline-none transition-all duration-200 ease-in-out"
                      placeholder="Nombre"
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
                      Nombre
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
                      Message
                    </label>
                  </div>

                  <div className="pt-2">
                    <ContactTurnstile />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>

                  {submitError && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {submitError}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4">Síguenos</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-200 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Formulario */}
            <div className="md:w-7/12 p-10">
              {successMessage ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div><h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3><p className="text-gray-600">Hemos recibido tu mensaje. Nos pondremos en contacto contigo en las próximas 24 horas.</p><button
                    onClick={() => setSuccessMessage(false)}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                      Enviar otro mensaje
                    </button></>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Envíanos un mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="tu@email.com"
                            required
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                          Empresa
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Teléfono
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+51 123 456 789"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Mensaje <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Cuéntanos sobre tu proyecto..."
                          required
                        />
                      </div>
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>
                    
                    <div>
                      <ContactTurnstile onVerify={(token) => console.log('Turnstile token:', token)} />
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </div>
                        ) : 'Enviar mensaje'}
                      </button>
                      <p className="ml-4 text-sm text-gray-500">
                        <span className="text-red-500">*</span> Campos requeridos
                      </p>
                    </div>
                    
                    {submitError && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{submitError}</p>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
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
