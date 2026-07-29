import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, ArrowRight, Menu, X, Sparkles, Star, Quote } from 'lucide-react';
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

const TESTIMONIALS = [
  { name: "Laura G.", degree: "Ciencias de la Salud", text: "La consultoría de AcademicaBS fue clave para estructurar mi TFG. Su guía experta me permitió enfocar mi investigación y presentar un trabajo sólido." },
  { name: "Carlos M.", degree: "Ingeniería", text: "Gracias a la formación especializada, pude desarrollar las habilidades necesarias. El acompañamiento fue constante en cada etapa." },
  { name: "Sofía P.", degree: "Humanidades", text: "No sabía por dónde empezar, pero me proporcionaron las herramientas y el apoyo que necesitaba. El proceso fue muy manejable." },
  { name: "Javier R.", degree: "Derecho", text: "La gestión académica es excepcional. Me ayudaron a organizar mi tiempo y a cumplir con los plazos de entrega." },
  { name: "Ana S.", degree: "Economía", text: "Mi TFG requería una investigación profunda y la asesoría fue invaluable. Contenido riguroso y original." },
  { name: "Pablo V.", degree: "Comunicación", text: "Aprendí a comunicar mis ideas de manera efectiva y a defender mi trabajo con total seguridad." },
  { name: "Elena D.", degree: "Biología", text: "Mi trabajo no solo fue académicamente correcto, sino también claro y muy atractivo visualmente." },
  { name: "Miguel A.", degree: "Psicología", text: "Desde la elección del tema hasta la presentación final, siempre conté con su gran apoyo y experiencia." },
  { name: "Isabel F.", degree: "Educación", text: "Transformaron mi idea inicial en un TFG brillante. Su metodología de trabajo es sumamente eficiente." },
  { name: "Diego L.", degree: "Arquitectura", text: "La rigurosidad y el profesionalismo fueron fundamentales para el éxito. Muy orgulloso del trabajo logrado." }
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
    <div className="min-h-screen bg-[#F8A89A] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#F8A89A]/95 backdrop-blur-md z-50 border-b border-[#0091C2]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight text-[#E839A2] flex items-center gap-2 drop-shadow-sm">
            AcademicaBS <Sparkles className="w-5 h-5 text-[#FFDC2E] fill-[#FFDC2E]" />
          </div>
          
          <div className="hidden md:flex gap-10 items-center">
            <button onClick={() => scrollToSection('services')} className="text-slate-900 hover:text-[#E839A2] font-bold transition-colors">Servicios</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-slate-900 hover:text-[#E839A2] font-bold transition-colors">Testimonios</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-900 hover:text-[#E839A2] font-bold transition-colors">Contacto</button>
            <Button onClick={() => setIsContactOpen(true)} className="bg-[#0091C2] hover:bg-[#007A9E] text-white font-black rounded-2xl px-8 shadow-lg transform hover:scale-105 transition-all">
              ¡Empezar Ya!
            </Button>
          </div>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-900">
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F8A89A] border-t border-[#0091C2]/20 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-xl font-black py-2">Servicios</button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-xl font-black py-2">Testimonios</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-xl font-black py-2">Contacto</button>
            <Button onClick={() => { setIsContactOpen(true); setIsMobileMenuOpen(false); }} className="w-full bg-[#0091C2] py-6 text-xl font-black rounded-2xl shadow-xl">
              ¡Empezar Ya!
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 border-2 border-[#FFDC2E] shadow-xl text-slate-900 text-base font-black uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-[#E839A2]" /> +30 TFGs Exitosos
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              Surfea tu <span className="text-[#E839A2] drop-shadow-[4px_4px_0px_#FFDC2E]">TFG</span> con Éxito
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-900 font-bold max-w-2xl leading-snug">
              Investigación, gestión y comunicación científica sin dramas. El laboratorio de proyectos que necesitabas.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-[#FFDC2E] hover:bg-[#f3cf21] text-slate-900 font-black py-8 px-12 text-2xl rounded-3xl transition-all shadow-[8px_8px_0px_#0091C2] border-4 border-slate-900 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Solicitar Ayuda <ArrowRight className="w-8 h-8 ml-2" />
              </Button>
            </div>
          </div>

          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-[#FFDC2E] rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663159966106/tyVZksFBLvvWaJGW.png" 
              alt="Mascota AcademicaBS Loco" 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Lo que dicen <span className="text-[#FFDC2E]">nuestros alumnos</span></h2>
            <p className="text-xl text-slate-400 font-bold">Hemos impulsado más de 30 proyectos brillantes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-lg p-10 rounded-[40px] border-2 border-white/10 hover:border-[#E839A2] transition-all group">
                <Quote className="w-12 h-12 text-[#FFDC2E] mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-xl font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 bg-[#E839A2] rounded-full flex items-center justify-center font-black text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{t.name}</h4>
                    <p className="text-[#00BFFF] font-bold text-sm uppercase tracking-widest">{t.degree}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">Servicios <span className="text-[#0091C2]">Pro</span></h2>
              <p className="text-2xl text-slate-600 font-bold leading-tight">Soluciones integrales para que tu investigación destaque sobre el resto.</p>
            </div>
            <div className="h-1 w-32 bg-[#E839A2] rounded-full hidden md:block mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {SERVICES.map((s, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-4 bg-[#F8A89A] rounded-[40px] opacity-0 group-hover:opacity-100 transition-all -z-10"></div>
                <div className="p-10 bg-slate-50 rounded-[40px] border-4 border-slate-900 h-full shadow-[12px_12px_0px_#000] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                  <span className="text-6xl font-black text-[#E839A2] mb-8 block">{s.number}</span>
                  <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{s.title}</h3>
                  <p className="text-lg text-slate-700 font-bold leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact CTA */}
      <section id="contact" className="py-32 px-6 bg-[#FFDC2E] border-t-8 border-slate-900">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">¿Listo para el <span className="underline decoration-[#E839A2]">éxito</span>?</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="tel:+34643831241" className="flex items-center gap-4 text-3xl font-black hover:text-[#E839A2] transition-colors">
              <Phone className="w-10 h-10" /> +34 643 831 241
            </a>
            <a href="mailto:blancasample@outlook.es" className="flex items-center gap-4 text-3xl font-black hover:text-[#E839A2] transition-colors">
              <Mail className="w-10 h-10" /> blancasample@outlook.es
            </a>
          </div>
          <Button 
            onClick={() => setIsContactOpen(true)}
            className="bg-slate-900 text-white font-black py-10 px-16 text-3xl rounded-[40px] hover:bg-[#E839A2] transition-all shadow-2xl"
          >
            Enviar Mensaje
          </Button>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-white border-8 border-slate-900 text-slate-900 rounded-[50px] max-w-2xl p-12">
          <DialogHeader>
            <DialogTitle className="text-5xl font-black tracking-tighter text-[#E839A2] mb-6">¡Vamos a ello!</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xl font-black">Nombre</Label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-16 rounded-2xl border-4 border-slate-900 text-xl font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-xl font-black">Email</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="h-16 rounded-2xl border-4 border-slate-900 text-xl font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xl font-black">Asunto</Label>
              <Input value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="h-16 rounded-2xl border-4 border-slate-900 text-xl font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="text-xl font-black">Mensaje</Label>
              <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="min-h-[150px] rounded-2xl border-4 border-slate-900 text-xl font-bold" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E839A2] py-10 text-3xl font-black rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_#000] hover:shadow-none transition-all">
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
