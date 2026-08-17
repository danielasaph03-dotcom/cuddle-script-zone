import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Users, BarChart3, Target, ArrowRight, Instagram, Mail, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import pedroAsset from "../assets/pedro_silva.png.asset.json";
import eduardoAsset from "../assets/eduardo_garcia.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter text-primary">GS Representações</div>
          <nav className="hidden md:flex gap-8 items-center text-sm font-semibold">
            <a href="#inicio" className="hover:text-primary transition-colors">Início</a>
            <a href="#a-gs" className="hover:text-primary transition-colors">A GS</a>
            <a href="#marcas" className="hover:text-primary transition-colors">Marcas</a>
            <a href="#diferenciais" className="hover:text-primary transition-colors">Diferenciais</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </nav>
          <a href="#contato" className="hidden md:inline-flex bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all">
            Fale com a GS
          </a>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-4 text-sm font-semibold">
                <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">Início</a>
                <a href="#a-gs" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">A GS</a>
                <a href="#marcas" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">Marcas</a>
                <a href="#diferenciais" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">Diferenciais</a>
                <a href="#contato" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">Contato</a>
                <a href="#contato" onClick={() => setIsMenuOpen(false)} className="mt-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-bold">
                  Fale com a GS
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="inicio" className="pt-32 pb-20 container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-primary">
            CONECTAMOS GRANDES MARCAS AO VAREJO.
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Representação comercial com relacionamento, estratégia e conhecimento de mercado para gerar novas oportunidades de negócio.
          </p>
          <div className="flex gap-4">
            <a href="#a-gs" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all">CONHEÇA A GS</a>
            <a href="#contato" className="border border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all">FALE CONOSCO</a>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full h-[400px] md:h-[600px] bg-muted rounded-2xl overflow-hidden relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1600880212340-053459a11a28?q=80&w=2070&auto=format&fit=crop" 
            alt="Profissionais em reunião estratégica" 
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </motion.div>
      </section>

      {/* A GS / Quem Somos */}
      <section id="a-gs" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          {/* Eduardo Garcia - Primeiro */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[500px] bg-muted rounded-2xl overflow-hidden shadow-2xl relative group"
            >
              <img 
                src={eduardoAsset.url} 
                alt="Eduardo Garcia" 
                className="w-full h-full object-contain bg-muted transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold tracking-tight">EDUARDO GARCIA</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Sócio-Fundador</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase leading-tight">
                  EXPERIÊNCIA E TRADIÇÃO NO VAREJO.
                </h2>
                <div className="w-20 h-1 bg-accent" />
              </div>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Eduardo Garcia traz décadas de conhecimento estratégico, construindo as bases de confiança que definem a GS Representações.
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Com uma trajetória marcada pela construção de parcerias sólidas com as maiores indústrias e redes varejistas do país, Eduardo consolidou um modelo de negócio pautado na seriedade e no resultado.
                </p>
                <p>
                  Sua visão de mercado é o alicerce que permite à GS conectar marcas globais a oportunidades regionais com precisão e autoridade.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Pedro Silva - Segundo */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight text-primary uppercase">
                  INOVAÇÃO E CONTINUIDADE.
                </h2>
                <div className="w-20 h-1 bg-accent" />
              </div>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Pedro Silva lidera a nova fase da GS, unindo a agilidade do mercado moderno aos valores fundamentais da empresa.
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A GS Representações nasceu de uma visão clara de continuidade entre gerações. Sob a liderança de Pedro, a operação foca em inovação tecnológica e estratégias de giro acelerado para garantir a saúde do negócio de nossos parceiros.
                </p>
                <p>
                  Estamos presentes no dia a dia do varejo, identificando tendências e garantindo que as marcas do nosso portfólio tenham a máxima eficiência em cada gôndola.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 h-[500px] bg-muted rounded-2xl overflow-hidden shadow-2xl relative group"
            >
              <img 
                src={pedroAsset.url} 
                alt="Pedro Silva" 
                className="w-full h-full object-contain bg-muted transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold tracking-tight">PEDRO SILVA</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Sócio-Diretor</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section id="marcas" className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase leading-tight">
              MARCAS QUE FAZEM PARTE DO NOSSO PORTFÓLIO.
            </h2>
            <p className="text-muted-foreground text-lg">Um portfólio estratégico para diferentes categorias e necessidades do varejo.</p>
          </div>
          <div className="w-full md:w-auto">
            <a href="#contato" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              VER PORTFÓLIO COMPLETO <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              name: "TOZZI", 
              cat: "Alimentos", 
              desc: "Produtos selecionados com foco em qualidade e giro rápido no varejo.",
              img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop"
            },
            { 
              name: "BALY", 
              cat: "Bebidas", 
              desc: "Energia e sabor que conquistam o consumidor em todas as ocasiões.",
              img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop"
            },
            { 
              name: "SALVATORE", 
              cat: "Alimentos Premium", 

              desc: "Excelência e tradição para paladares exigentes e gôndolas seletas.",
              img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?q=80&w=2070&auto=format&fit=crop"
            },
            { 
              name: "DOCIGEL", 
              cat: "Doces e Sobremesas", 
              desc: "Alegria e sabor em produtos que garantem a satisfação do cliente.",
              img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop"
            }
          ].map((brand) => (
            <motion.div 
              key={brand.name} 
              whileHover={{ y: -5 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-accent transition-all duration-300"
            >
              <div className="h-48 bg-muted overflow-hidden">
                <img src={brand.img} alt={brand.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-2xl tracking-tighter text-primary">{brand.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-accent/20 text-primary px-2 py-1 rounded">
                    {brand.cat}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{brand.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">NOSSO DIFERENCIAL ESTÁ NO MERCADO.</h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: Users, title: "RELACIONAMENTO", desc: "Proximidade com clientes e parceiros para construir negócios de longo prazo." },
              { icon: BarChart3, title: "CONHECIMENTO DE MERCADO", desc: "Experiência prática para entender oportunidades e necessidades do varejo." },
              { icon: Target, title: "PORTFÓLIO ESTRATÉGICO", desc: "Marcas e produtos selecionados para diferentes categorias de consumo." },
              { icon: Phone, title: "FOCO EM GIRO", desc: "Atuação comercial orientada para presença, distribuição e desempenho dos produtos." }
            ].map((item) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-center md:text-left"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner group hover:bg-accent transition-colors">
                  <item.icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl tracking-tight">{item.title}</h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção para o Varejista */}
      <section className="py-24 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-primary">SEU MIX PODE TER NOVAS OPORTUNIDADES.</h2>
            <p className="text-lg text-muted-foreground">
              A GS aproxima o varejo de marcas e produtos com potencial comercial, oferecendo suporte e relacionamento ao longo da operação.
            </p>
            <a href="#contato" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:gap-4 transition-all uppercase text-sm tracking-wider">
              QUERO FALAR COM A GS <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center p-8 border border-border">
              <span className="text-primary font-bold text-center">ESTRATÉGIA</span>
            </div>
            <div className="aspect-square bg-primary rounded-2xl shadow-sm flex items-center justify-center p-8 text-primary-foreground">
              <span className="font-bold text-center">RELACIONAMENTO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "ALIMENTOS", 
                desc: "Produtos para ampliar e fortalecer o mix do varejo.",
                img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
              },
              { 
                title: "BEBIDAS", 
                desc: "Marcas com potencial para diferentes perfis de consumidores.",
                img: "https://images.unsplash.com/photo-1544145945-f904253d0c71?q=80&w=1974&auto=format&fit=crop"
              },
              { 
                title: "HIGIENE & BELEZA", 
                desc: "Produtos para categorias de alto potencial de consumo.",
                img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1787&auto=format&fit=crop"
              }
            ].map((cat) => (
              <motion.div 
                key={cat.title}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-wider">{cat.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contato" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">VAMOS CONSTRUIR NOVAS OPORTUNIDADES?</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Se você é varejista e busca ampliar seu mix com marcas de alto giro e qualidade, fale com a GS Representações.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#" className="bg-accent text-accent-foreground px-12 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl">
              ENTRAR EM CONTATO
            </a>
            <div className="flex items-center gap-4 text-sm font-semibold text-primary-foreground/60">
              <span className="w-8 h-px bg-primary-foreground/30" />
              Siga-nos nas redes sociais
              <span className="w-8 h-px bg-primary-foreground/30" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/20 py-20 border-t border-border">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="font-bold text-2xl tracking-tighter text-primary">GS Representações</div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Conectando grandes marcas ao varejo com relacionamento, estratégia e foco em resultados comerciais sólidos.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/gs.representacao/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/5581999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:contato@gsrepresentacoes.com.br" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-primary tracking-widest uppercase text-sm">Links Rápidos</h4>
            <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <a href="#inicio" className="hover:text-primary transition-colors w-fit">Início</a>
              <a href="#a-gs" className="hover:text-primary transition-colors w-fit">A GS</a>
              <a href="#marcas" className="hover:text-primary transition-colors w-fit">Marcas</a>
              <a href="#diferenciais" className="hover:text-primary transition-colors w-fit">Diferenciais</a>
              <a href="#contato" className="hover:text-primary transition-colors w-fit">Contato</a>
            </nav>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-primary tracking-widest uppercase text-sm">Região de Atuação</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Atendimento focado em grandes redes e varejo regional com inteligência de mercado e proximidade logística.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-semibold">
          <span>© 2026 GS Representações. Todos os direitos reservados.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Políticas de Privacidade</a>
            <a href="#" className="hover:text-primary">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
