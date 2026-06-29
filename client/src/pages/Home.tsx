import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, ArrowRight, Menu, X } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663187089691/KChEUWiLbywwUFpgEXUGpP/hero-academicabs-hR8xrKY3wMcNyVL9FK68EB.webp';

const SERVICES = [
  {
    title: 'Consultoría Nutricional',
    description: 'Asesoramiento personalizado en nutrición y salud alimentaria para individuos y organizaciones.'
  },
  {
    title: 'Formación y Docencia',
    description: 'Programas educativos especializados en nutrición, salud y bienestar.'
  },
  {
    title: 'Redacción y Gestión de Proyectos Académicos',
    description: 'Apoyo integral en investigación, redacción y gestión de proyectos académicos.'
  },
  {
    title: 'Coaching Nutricional',
    description: 'Acompañamiento profesional para transformar hábitos alimentarios y mejorar la calidad de vida.'
  },
  {
    title: 'Gestión de Contenidos y Marketing Digital',
    description: 'Estrategia y creación de contenidos especializados en salud y nutrición.'
  }
];

const COLLABORATORS = [
  { name: 'ILERNA', category: 'Formación' },
  { name: 'Multiversitas SLU', category: 'Educación' },
  { name: 'Naturhouse', category: 'Nutrición' },
  { name: 'UNED', category: 'Universidad' },
  { name: 'Institut Roger de Llúria', category: 'Formación' },
  { name: 'Fisioquir', category: 'Terapias' },
  { name: 'Generalitat de Catalunya', category: 'Administración' },
  { name: 'Fundació Futur', category: 'Catering' }
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-amber-400">AcademicaBS</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-amber-400 transition">Servicios</button>
            <button onClick={() => scrollToSection('collaborators')} className="text-gray-300 hover:text-amber-400 transition">Colaboradores</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-amber-400 transition">Contacto</button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-amber-400 hover:text-amber-300 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Button onClick={() => setIsContactOpen(true)} className="hidden md:inline-flex bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold">Contactar</Button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-amber-500/20 px-4 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-gray-300 hover:text-amber-400 transition py-2"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('collaborators')}
              className="block w-full text-left text-gray-300 hover:text-amber-400 transition py-2"
            >
              Colaboradores
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-300 hover:text-amber-400 transition py-2"
            >
              Contacto
            </button>
            <Button 
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
            >
              Contactar
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="text-amber-400">AcademicaBS</span>
            </h1>
            <p className="text-xl text-gray-300">
              Consultoría, formación y redacción académica que combina tecnología con el toque humano.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Somos especialistas en nutrición, educación y gestión de proyectos académicos. Transformamos conocimiento en resultados tangibles para individuos, empresas e instituciones.
            </p>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-6 px-8 text-lg flex items-center gap-2"
            >
              Solicita una Consulta <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-lg blur-2xl"></div>
            <img src={HERO_IMAGE} alt="Tecnología y Humanidad" className="relative rounded-lg shadow-2xl w-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Nuestros Servicios</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mb-12"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-amber-500/30 rounded-lg p-6 hover:border-amber-500/60 transition group">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/40 transition">
                  <span className="text-amber-400 font-bold text-lg">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section id="collaborators" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Empresas Colaboradoras</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mb-12"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLABORATORS.map((collab, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-amber-500/20 rounded-lg p-6 text-center hover:border-amber-500/50 transition">
                <h3 className="text-lg font-semibold text-white mb-2">{collab.name}</h3>
                <p className="text-amber-400 text-sm">{collab.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Ponte en Contacto</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mb-12"></div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Teléfono</h3>
                  <a href="tel:+34643831241" className="text-gray-300 hover:text-amber-400 transition">+34 643 831 241</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <a href="mailto:allabsone@outlook.es" className="text-gray-300 hover:text-amber-400 transition">allabsone@outlook.es</a>
                </div>
              </div>
            </div>
            <div>
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-6 text-lg"
              >
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-slate-900 border-amber-500/30">
          <DialogHeader>
            <DialogTitle className="text-white">Formulario de Contacto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Nombre</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Tu nombre"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tu@email.com"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Asunto</Label>
              <Input 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Asunto del mensaje"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label className="text-gray-300">Mensaje</Label>
              <Textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tu mensaje..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 min-h-32"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-amber-500/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 AcademicaBS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
