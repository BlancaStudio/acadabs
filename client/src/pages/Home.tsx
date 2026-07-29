import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

const SERVICES = [
  {
    number: '01',
    title: 'Consultoría y Gestión Académica',
    description: 'Investigación, desarrollo (I+D+i) y acompañamiento integral en proyectos académicos.'
  },
  {
    number: '02',
    title: 'Formación Especializada',
    description: 'Programas educativos y capacitación profesional para farmacias y entidades de salud.'
  },
  {
    number: '03',
    title: 'Comunicación y Marketing Científico',
    description: 'Estrategia y creación de contenidos rigurosos en nutrición y bienestar.'
  }
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sendContactMutation = trpc.contact.send.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await sendContactMutation.mutateAsync(formData);
      toast.success('Mensaje enviado correctamente');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsContactOpen(false);
    } catch (error) {
      toast.error('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            AcademicaBS <Sparkles className="w-5 h-5 text-emerald-400 fill-emerald-400" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-purple-600 font-medium transition">Servicios</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-600 hover:text-purple-600 font-medium transition">Contacto</button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-purple-600 hover:text-emerald-500 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Button onClick={() => setIsContactOpen(true)} className="hidden md:inline-flex bg-purple-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md shadow-purple-200">
            Contactar
          </Button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 shadow-lg">
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-slate-600 hover:text-purple-600 font-medium py-2"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-slate-600 hover:text-purple-600 font-medium py-2"
            >
              Contacto
            </button>
            <Button 
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-purple-600 hover:bg-emerald-500 text-white font-bold transition-all"
            >
              Contactar
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 bg-gradient-to-b from-emerald-50/50 via-purple-50/30 to-slate-50 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-emerald-300/30 to-purple-400/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm text-emerald-600 text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-500" /> Formación & Consultoría Académica
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Transformamos conocimiento en <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 bg-clip-text text-transparent">resultados brillantes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Especialistas en salud, nutrición y gestión de proyectos académicos. Un enfoque limpio, directo y libre de artificios.
          </p>

          <div className="pt-4 flex justify-center">
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-extrabold py-7 px-10 text-xl rounded-2xl transition-all shadow-xl shadow-emerald-200 flex items-center gap-3 border border-emerald-300"
            >
              Solicitar Consulta <ArrowRight className="w-6 h-6 text-purple-700" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Servicios Principales</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-purple-500 rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/30 transition-all duration-300 shadow-sm hover:shadow-md">
                <span className="text-4xl font-black text-purple-500/80 mb-6 block">{service.number}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-slate-50 to-emerald-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Ponte en Contacto</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-purple-500 rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-100/80 rounded-2xl text-emerald-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Teléfono</h3>
                  <a href="tel:+34643831241" className="text-lg font-bold text-slate-800 hover:text-purple-600 transition">+34 643 831 241</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-4 bg-purple-100/80 rounded-2xl text-purple-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Email</h3>
                  <a href="mailto:blancasample@outlook.es" className="text-lg font-bold text-slate-800 hover:text-purple-600 transition">blancasample@outlook.es</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-emerald-400 hover:to-teal-500 text-white hover:text-slate-900 font-extrabold py-8 px-12 text-xl rounded-2xl shadow-lg transition-all duration-300"
              >
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-purple-600 text-2xl font-bold">Formulario de Contacto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label className="text-slate-700">Nombre</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Tu nombre"
                className="bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
              />
            </div>
            <div>
              <Label className="text-slate-700">Email</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tu@email.com"
                className="bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
              />
            </div>
            <div>
              <Label className="text-slate-700">Asunto</Label>
              <Input 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Asunto del mensaje"
                className="bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
              />
            </div>
            <div>
              <Label className="text-slate-700">Mensaje</Label>
              <Textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tu mensaje..."
                className="bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500 min-h-32"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-emerald-400 hover:bg-purple-600 text-slate-900 hover:text-white font-bold py-3 transition-all rounded-xl"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2026 AcademicaBS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
