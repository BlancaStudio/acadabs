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
    description: 'Programas educativos y capacitación profesional para entidades de salud y gestión.'
  },
  {
    number: '03',
    title: 'Comunicación y Marketing Científico',
    description: 'Estrategia y creación de contenidos rigurosos para la difusión del conocimiento.'
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
    <div className="min-h-screen bg-[#F8A89A] text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#F8A89A]/90 backdrop-blur-md z-50 border-b border-[#0091C2]/30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight text-[#E839A2] flex items-center gap-2 drop-shadow-sm">
            AcademicaBS <Sparkles className="w-5 h-5 text-[#FFDC2E] fill-[#FFDC2E]" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-900 hover:text-[#E839A2] font-extrabold transition">Servicios</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-900 hover:text-[#E839A2] font-extrabold transition">Contacto</button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-900 hover:text-[#E839A2] transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Button onClick={() => setIsContactOpen(true)} className="hidden md:inline-flex bg-[#0091C2] hover:bg-[#007A9E] text-white font-extrabold rounded-xl transition-all shadow-md">
            Contactar
          </Button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F8A89A] border-t border-[#0091C2]/20 px-4 py-4 space-y-3 shadow-lg">
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-slate-900 font-extrabold py-2"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-slate-900 font-extrabold py-2"
            >
              Contacto
            </button>
            <Button 
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#0091C2] hover:bg-[#007A9E] text-white font-extrabold transition-all"
            >
              Contactar
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 relative overflow-hidden">
        {/* Glow Accent inspired by the Yellow Sun */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FFDC2E]/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#FFDC2E] shadow-sm text-slate-900 text-sm font-bold">
            <Sparkles className="w-4 h-4 text-[#E839A2]" /> Formación & Consultoría Académica
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            Transformamos conocimiento en <span className="text-[#E839A2] drop-shadow-sm">resultados brillantes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-900 font-medium max-w-2xl mx-auto leading-relaxed bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40">
            Especialistas en investigación, gestión de proyectos académicos y comunicación científica. Un enfoque limpio, directo y libre de artificios.
          </p>

          <div className="pt-4 flex justify-center">
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-[#FFDC2E] hover:bg-[#f3cf21] text-slate-900 font-black py-7 px-10 text-xl rounded-2xl transition-all shadow-lg flex items-center gap-3 border-2 border-slate-900"
            >
              Solicitar Consulta <ArrowRight className="w-6 h-6 text-[#E839A2]" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white/90 border-y border-[#0091C2]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Servicios Principales</h2>
            <div className="w-20 h-1.5 bg-[#E839A2] rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#F8A89A]/20 border-2 border-[#0091C2]/30 hover:border-[#E839A2] transition-all duration-300 shadow-sm hover:shadow-md">
                <span className="text-4xl font-black text-[#E839A2] mb-6 block">{service.number}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-800 leading-relaxed font-medium">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Ponte en Contacto</h2>
            <div className="w-20 h-1.5 bg-[#0091C2] rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 bg-white p-8 rounded-3xl border-2 border-slate-900 shadow-md">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#FFDC2E] rounded-2xl text-slate-900 border border-slate-900">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Teléfono</h3>
                  <a href="tel:+34643831241" className="text-lg font-black text-slate-900 hover:text-[#E839A2] transition">+34 643 831 241</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#0091C2] rounded-2xl text-white border border-slate-900">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email</h3>
                  <a href="mailto:blancasample@outlook.es" className="text-lg font-black text-slate-900 hover:text-[#E839A2] transition">blancasample@outlook.es</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="w-full md:w-auto bg-[#E839A2] hover:bg-[#d02c8e] text-white font-extrabold py-8 px-12 text-xl rounded-2xl shadow-lg border-2 border-slate-900 transition-all duration-300"
              >
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-white border-2 border-slate-900 text-slate-900 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#E839A2] text-2xl font-black">Formulario de Contacto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label className="text-slate-800 font-bold">Nombre</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Tu nombre"
                className="bg-[#F8A89A]/10 border-slate-300 text-slate-900 focus:border-[#0091C2]"
              />
            </div>
            <div>
              <Label className="text-slate-800 font-bold">Email</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tu@email.com"
                className="bg-[#F8A89A]/10 border-slate-300 text-slate-900 focus:border-[#0091C2]"
              />
            </div>
            <div>
              <Label className="text-slate-800 font-bold">Asunto</Label>
              <Input 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Asunto del mensaje"
                className="bg-[#F8A89A]/10 border-slate-300 text-slate-900 focus:border-[#0091C2]"
              />
            </div>
            <div>
              <Label className="text-slate-800 font-bold">Mensaje</Label>
              <Textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tu mensaje..."
                className="bg-[#F8A89A]/10 border-slate-300 text-slate-900 focus:border-[#0091C2] min-h-32"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#FFDC2E] hover:bg-[#E839A2] text-slate-900 hover:text-white font-black py-3 transition-all rounded-xl border border-slate-900"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-300 text-sm font-medium">
          <p>&copy; 2026 AcademicaBS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
