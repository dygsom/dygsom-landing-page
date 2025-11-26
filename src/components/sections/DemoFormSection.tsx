import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { Button } from '../ui/Button';

export const DemoFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    monthlyVolume: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío (aquí integrarías con tu backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Demo request:', formData);
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 6 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        company: '',
        position: '',
        email: '',
        phone: '',
        monthlyVolume: '',
        message: ''
      });
    }, 6000);
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" id="demo">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-3 md:mb-4">
            Solicita una demo de DYGSOM
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Cuéntanos un poco sobre tu negocio y te contactaremos para mostrarte cómo DYGSOM puede ayudarte a reducir el fraude en tus pagos online y mejorar la aprobación de transacciones legítimas.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 md:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <FaCheckCircle className="text-dygsom-green text-6xl mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl md:text-3xl font-bold text-dygsom-light-text mb-4">
                ¡Gracias por tu interés en DYGSOM!
              </h3>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Revisaremos tu información y nos pondremos en contacto contigo para agendar la demo en los próximos días.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-slate-300 mb-2">
                    Nombre y apellido *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-300 mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all"
                    placeholder="Nombre de tu empresa o startup"
                  />
                </div>

                {/* Cargo */}
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-slate-300 mb-2">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all"
                    placeholder="Ej. CTO, CFO, Risk Manager, Founder"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all"
                    placeholder="Tu correo corporativo"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all"
                    placeholder="Un número para coordinar la demo"
                  />
                </div>

                {/* Volumen de transacciones */}
                <div>
                  <label htmlFor="monthlyVolume" className="block text-sm font-semibold text-slate-300 mb-2">
                    Volumen aproximado de transacciones mensuales *
                  </label>
                  <select
                    id="monthlyVolume"
                    name="monthlyVolume"
                    required
                    value={formData.monthlyVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="< 1,000">Menos de 1,000</option>
                    <option value="1,000 - 5,000">1,000 - 5,000</option>
                    <option value="5,000 - 20,000">5,000 - 20,000</option>
                    <option value="20,000 - 50,000">20,000 - 50,000</option>
                    <option value="50,000 - 100,000">50,000 - 100,000</option>
                    <option value="100,000+">Más de 100,000</option>
                  </select>
                </div>
              </div>

              {/* Mensaje / Comentario */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                  Mensaje / Comentario
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-dygsom-light-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-dygsom-blue focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos brevemente tu situación actual con el fraude o lo que te gustaría mejorar"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  className="px-8 py-3 text-lg min-w-[240px] flex items-center justify-center gap-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    'Quiero agendar una demo'
                  )}
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                * Campos obligatorios. Tus datos están protegidos y no serán compartidos con terceros.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
