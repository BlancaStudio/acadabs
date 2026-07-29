import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663187089691/KChEUWiLbywwUFpgEXUGpP/hero-academicabs-hR8xrKY3wMcNyVL9FK68EB.webp';

const SERVICES = [
  {
    number: '01',
    title: 'Consultoría y Gestión Académica',
    description: 'Investigación, desarrollo (I+D+i) y acompañamiento en proyectos académicos.'
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
    <div className="min-h-screen bg-[#070e0c] text-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#070e0c]/90 backdrop-blur-md z-50 border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-amber-400 flex items-center gap-2">
            AcademicaBS <Sparkles className="w-4 h-4 text-pink-500" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('services')} className="text-emerald-100/80 hover:text-amber-400 transition font-medium">Servicios</button>
            <button onClick={() => scrollToSection('contact')} className="text-emerald-100/80 hover:text-amber-400 transition font-medium">Contacto</button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-emerald-400 hover:text-pink-400 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Button onClick={() => setIsContactOpen(true)} className="hidden md:inline-flex bg-gradient-to-r from-amber-400 to-amber-500 hover:from-pink-500 hover:to-pink-600 text-zinc-950 hover:text-white font-semibold transition-all">
            Contactar
          </Button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#091512] border-t border-emerald-500/20 px-4 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-emerald-100/80 hover:text-amber-400 transition py-2"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-emerald-100/80 hover:text-amber-400 transition py-2"
            >
              Contacto
            </button>
            <Button 
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-amber-400 hover:bg-pink-500 text-zinc-950 hover:text-white font-semibold transition-all"
            >
              Contactar
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent">AcademicaBS</span>
            </h1>
            <p className="text-xl text-emerald-200/90 font-light leading-relaxed">
              Consultoría, formación y redacción académica que combina tecnología con el toque humano.
            </p>
            <p className="text-emerald-100/70 leading-relaxed">
              Especialistas en nutrición, salud y gestión de proyectos académicos. Transformamos conocimiento en resultados tangibles.
            </p>
            <div className="pt-2">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-emerald-500 hover:bg-pink-500 text-zinc-950 hover:text-white font-bold py-6 px-8 text-lg flex items-center gap-2 rounded-xl transition-all shadow-lg shadow-emerald-950/50"
              >
                Solicita una Consulta <ArrowRight className="w-5 h-5 text-amber-300" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-pink-500/20 to-amber-500/20 rounded-2xl blur-2xl"></div>
            <img src={HERO_IMAGE} alt="Tecnología y Humanidad" className="relative rounded-2xl border border-emerald-500/30 shadow-2xl w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-[#091512]/60 border-y border-emerald-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Nuestros Servicios</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-pink-500 rounded-full mt-3"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="relative group p-8 rounded-2xl bg-[#0b1b17] border border-emerald-500/20 hover:border-pink-500/50 transition-all duration-300">
                <span className="text-3xl font-black text-amber-400/80 mb-4 block">{service.number}</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{service.title}</h3>
                <p className="text-emerald-100/70 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ponte en Contacto</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-pink-500 rounded-full mt-3"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 bg-[#0b1b17] p-8 rounded-2xl border border-emerald-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-pink-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-1">Teléfono</h3>
                  <a href="tel:+34643831241" className="text-emerald-100/80 hover:text-emerald-300 transition">+34 643 831 241</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-pink-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-1">Email</h3>
                  <a href="mailto:tu-nuevo-email@dominio.com" className="text-emerald-100/80 hover:text-emerald-300 transition">tu-nuevo-email@dominio.com</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="w-full md:w-auto bg-gradient-to-r from-emerald-500 via-emerald-600 to-pink-500 hover:from-pink-500 hover:to-amber-500 text-white font-bold py-8 px-12 text-xl rounded-2xl shadow-xl transition-all duration-300"
              >
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-[#0b1b17] border-emerald-500/30 text-emerald-50">
          <DialogHeader>
            <DialogTitle className="text-amber-400 text-xl font-bold">Formulario de Contacto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <Label className="text-emerald-200">Nombre</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Tu nombre"
                className="bg-[#070e0c] border-emerald-500/30 text-white placeholder:text-emerald-700 focus:border-amber-400"
              />
            </div>
            <div>
              <Label className="text-emerald-200">Email</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tu@email.com"
                className="bg-[#070e0c] border-emerald-500/30 text-white placeholder:text-emerald-700 focus:border-amber-400"
              />
            </div>
            <div>
              <Label className="text-emerald-200">Asunto</Label>
              <Input 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Asunto del mensaje"
                className="bg-[#070e0c] border-emerald-500/30 text-white placeholder:text-emerald-700 focus:border-amber-400"
              />
            </div>
            <div>
              <Label className="text-emerald-200">Mensaje</Label>
              <Textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tu mensaje..."
                className="bg-[#070e0c] border-emerald-500/30 text-white placeholder:text-emerald-700 focus:border-amber-400 min-h-32"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-pink-500 text-zinc-950 hover:text-white font-bold py-3 transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#050b09] border-t border-emerald-500/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-emerald-100/50 text-sm">
          <p>&copy; 2026 AcademicaBS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
