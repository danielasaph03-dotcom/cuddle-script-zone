import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Users, BarChart3, Target, ArrowRight, Instagram, Mail, Menu, X, MessageCircle, MapPin } from "lucide-react";
import { cn } from "../lib/utils";
import { SPMap } from "../components/SPMap";
import pedroAsset from "../assets/pedro_silva.png.asset.json";
import eduardoAsset from "../assets/eduardo_garcia.png.asset.json";
import heroSupermarketAsset from "../assets/hero_supermarket.png.asset.json";
import tozziLogo from "../assets/tozzi_logo.png.asset.json";
import salvatoreLogo from "../assets/salvatore_logo.webp.asset.json";
import balyLogo from "../assets/baly_logo.png.asset.json";
import docigelLogo from "../assets/doccigel-logo.png.asset.json";
import logoGS from "../assets/logo-gs.png.asset.json";



export const Route = createFileRoute("/")({

  component: Index,
});

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoGS.url} alt="GS Representações" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex gap-8 items-center text-sm font-semibold">
            <a href="#inicio" className="hover:text-primary transition-colors">Início</a>
            <a href="#a-gs" className="hover:text-primary transition-colors">A GS</a>
            <a href="#marcas" className="hover:text-primary transition-colors">Marcas</a>
            <a href="#diferenciais" className="hover:text-primary transition-colors">Diferenciais</a>
            <a href="#atendimento" className="hover:text-primary transition-colors">Onde Atendemos</a>
            <a href="#clientes" className="hover:text-primary transition-colors">Clientes</a>
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
                <a href="#atendimento" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">Onde Atendemos</a>
                <a href="#clientes" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border/50">Clientes</a>
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
          className="flex-1 w-full h-[400px] md:h-[600px] flex items-center justify-center p-8 bg-secondary/30 rounded-2xl border border-primary/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,62,45,0.05)_0%,transparent_70%)]" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img 
              src={logoGS.url} 
              alt="Grupo GS Representações" 
              className="max-w-[80%] max-h-[80%] object-contain drop-shadow-2xl" 
            />
          </div>
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
            <a href="https://web.whatsapp.com/send?phone=5518997888797" target="_blank" rel="noopener noreferrer" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              SOLICITAR CATÁLOGO <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              name: "TOZZI", 
              cat: "Alimentos", 
              desc: "Produtos selecionados com foco em qualidade e giro rápido no varejo.",
              logo: tozziLogo.url,
              img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop"
            },
            { 
              name: "BALY", 
              cat: "Bebidas", 
              desc: "Energia e sabor que conquistam o consumidor em todas as ocasiões.",
              logo: balyLogo.url,
              img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop"
            },
            { 
              name: "SALVATORE", 
              cat: "Alimentos Premium", 
              logo: salvatoreLogo.url,
              desc: "Excelência e tradição para paladares exigentes e gôndolas seletas.",
              img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?q=80&w=2070&auto=format&fit=crop"
            },
            { 
              name: "DOCIGEL", 
              cat: "Doces e Sobremesas", 
              desc: "Alegria e sabor em produtos que garantem a satisfação do cliente.",
              logo: docigelLogo.url,
              img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop"
            }


          ].map((brand) => (
            <motion.div 
              key={brand.name} 
              whileHover={{ y: -5 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-accent transition-all duration-300"
            >
              <div className="h-48 bg-muted/50 flex items-center justify-center p-8 group-hover:bg-accent/5 transition-colors">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="text-4xl font-black text-primary/20">{brand.name}</div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-black text-xl tracking-tighter text-primary">{brand.name}</h3>
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
            <div className="aspect-square bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-8 border border-border group hover:border-accent transition-colors">
              <BarChart3 className="w-8 h-8 text-primary mb-4" />
              <span className="text-primary font-bold text-center text-sm uppercase tracking-tighter">ESTRATÉGIA</span>
            </div>
            <div className="aspect-square bg-primary rounded-2xl shadow-sm flex flex-col items-center justify-center p-8 text-primary-foreground group hover:bg-primary/90 transition-colors">
              <Users className="w-8 h-8 text-accent mb-4" />
              <span className="font-bold text-center text-sm uppercase tracking-tighter">RELACIONAMENTO</span>
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
              },
              { 
                title: "BEBIDAS", 
                desc: "Marcas com potencial para diferentes perfis de consumidores.",
              },
              { 
                title: "HIGIENE & BELEZA", 
                desc: "Produtos para categorias de alto potencial de consumo.",
              }
            ].map((cat) => (
              <motion.div 
                key={cat.title} 
                whileHover={{ y: -5 }}
                className="group p-10 bg-secondary/20 rounded-2xl border border-border hover:border-accent transition-all duration-300 text-center space-y-4"
              >
                <div className="text-primary font-black text-2xl tracking-tighter uppercase">{cat.title}</div>
                <div className="w-12 h-1 bg-accent mx-auto" />
                <p className="text-muted-foreground text-sm leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Onde Atendemos */}
      <section id="atendimento" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase">
                ONDE ATENDEMOS.
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto" />
              <p className="text-muted-foreground text-lg">
                Atendemos empresas em diferentes regiões do estado de São Paulo, oferecendo agilidade, proximidade e um atendimento personalizado.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mapa lado esquerdo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <SPMap 
                activeRegion={activeRegion} 
                onRegionClick={(region) => setActiveRegion(region === activeRegion ? null : region)} 
              />
            </motion.div>

            {/* Cards lado direito */}
            <div className="space-y-6">
              {[
                {
                  id: "Sorocaba",
                  title: "Sorocaba e região",
                  text: "Atendimento em Sorocaba e nas principais cidades próximas.",
                  cities: "Sorocaba, Votorantim, Itu, Salto, São Roque, Araçoiaba da Serra e Mairinque."
                },
                {
                  id: "Presidente Prudente",
                  title: "Presidente Prudente e região",
                  text: "Atendimento em Presidente Prudente e nas principais cidades do Oeste Paulista.",
                  cities: "Presidente Prudente, Álvares Machado, Regente Feijó, Martinópolis, Rancharia, Presidente Bernardes e Presidente Venceslau."
                }
              ].map((region) => (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveRegion(region.id === activeRegion ? null : region.id)}
                  className={cn(
                    "p-8 rounded-2xl border transition-all duration-300 cursor-pointer group",
                    activeRegion === region.id 
                      ? "bg-primary text-primary-foreground border-primary shadow-xl" 
                      : "bg-card border-border hover:border-accent"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={cn(
                      "text-xl font-bold tracking-tight uppercase",
                      activeRegion === region.id ? "text-accent" : "text-primary"
                    )}>
                      {region.title}
                    </h3>
                    <MapPin className={cn(
                      "w-5 h-5",
                      activeRegion === region.id ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                    )} />
                  </div>
                  <p className={cn(
                    "text-sm mb-4 font-medium",
                    activeRegion === region.id ? "text-primary-foreground/90" : "text-muted-foreground"
                  )}>
                    {region.text}
                  </p>
                  <div className={cn(
                    "text-xs leading-relaxed opacity-80",
                    activeRegion === region.id ? "block" : "hidden md:block"
                  )}>
                    <span className="font-bold uppercase text-[10px] tracking-widest block mb-1">Cidades:</span>
                    {region.cities}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-6 space-y-6 text-center lg:text-left"
              >
                <p className="text-sm text-muted-foreground font-medium">
                  Sua cidade não apareceu na lista? Consulte nossa equipe para verificar a disponibilidade de atendimento em sua região.
                </p>
                <a 
                  href="https://web.whatsapp.com/send?phone=5518997888797" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-full font-black text-xs hover:scale-105 transition-transform shadow-lg uppercase tracking-wider"
                >
                  Consultar minha região <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes */}

      <section id="clientes" className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase">
              PRINCIPAIS CLIENTES E PARCEIROS.
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto" />
            <p className="text-muted-foreground text-lg">
              Conectamos marcas às maiores redes de supermercados e varejistas da região.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { city: "LONDRINA", markets: ["Muffato"] },
              { city: "SÃO PAULO", markets: ["Muffato"] },
              { city: "MARINGÁ", markets: ["Amigão"] },
              { city: "PRESIDENTE PRUDENTE", markets: ["Mercado Estrela", "Mercado Nagai"] },
              { city: "MARTINÓPOLIS", markets: ["Irmãos Nagai", "Conal Supercenter"] }
            ].map((item) => (
              <motion.div 
                key={item.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl border border-border hover:border-accent transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-black tracking-widest text-primary/60 uppercase">{item.city}</span>
                </div>
                <div className="space-y-3">
                  {item.markets.map((market) => (
                    <div key={market} className="text-xl font-bold text-primary tracking-tight">
                      {market}
                    </div>
                  ))}
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
            Se você é varejista e busca ampliar seu mix com marcas de alto giro e qualidade, fale com a GS Representações pelo WhatsApp.
          </p>
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="flex flex-col md:flex-row gap-4 w-full md:max-w-xl mx-auto">
              <a 
                href="https://web.whatsapp.com/send?phone=5518997217576" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-accent text-accent-foreground px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> FALAR COM EDUARDO
              </a>
              <a 
                href="https://web.whatsapp.com/send?phone=5518997888797" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-accent text-accent-foreground px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> FALAR COM PEDRO
              </a>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/gs.representacao/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors font-bold text-sm">
                <Instagram className="w-5 h-5" /> INSTAGRAM
              </a>
              <span className="w-px h-4 bg-primary-foreground/20" />
              <a href="mailto:garcia.e.silva.representacoes@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors font-bold text-sm">
                <Mail className="w-5 h-5" /> E-MAIL
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/20 py-20 border-t border-border">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <img src={logoGS.url} alt="GS Representações" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Conectando grandes marcas ao varejo com relacionamento, estratégia e foco em resultados comerciais sólidos.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <a 
                  href="mailto:garcia.e.silva.representacoes@gmail.com" 
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>garcia.e.silva.representacoes@gmail.com</span>
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://web.whatsapp.com/send?phone=5518997217576" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>18 99721-7576 (Eduardo)</span>
                </a>
                <a 
                  href="https://web.whatsapp.com/send?phone=5518997888797" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>18 99788-8797 (Pedro)</span>
                </a>
              </div>
              <div className="flex gap-4 mt-2">
                <a href="https://www.instagram.com/gs.representacao/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:garcia.e.silva.representacoes@gmail.com" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://web.whatsapp.com/send?phone=5518997217576" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-primary tracking-widest uppercase text-sm">Links Rápidos</h4>
            <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <a href="#inicio" className="hover:text-primary transition-colors w-fit">Início</a>
              <a href="#a-gs" className="hover:text-primary transition-colors w-fit">A GS</a>
              <a href="#marcas" className="hover:text-primary transition-colors w-fit">Marcas</a>
              <a href="#diferenciais" className="hover:text-primary transition-colors w-fit">Diferenciais</a>
              <a href="#atendimento" className="hover:text-primary transition-colors w-fit">Onde Atendemos</a>
              <a href="#clientes" className="hover:text-primary transition-colors w-fit">Clientes</a>

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
