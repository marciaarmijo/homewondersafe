import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { ArrowDown, Building2, Check, ChevronRight, Construction, LockKeyhole, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Users, Waves, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWhite from "@/assets/LogoJ_M_blanco_sinfondo.png.asset.json";
import facade from "@/assets/fachada_edificio.png.asset.json";
import bedroom from "@/assets/habitacion1.png.asset.json";
import living from "@/assets/salacomedor.png.asset.json";
import dining from "@/assets/comedor.png.asset.json";
import kitchen from "@/assets/cocina.png.asset.json";
import kitchenWide from "@/assets/cocinalejos.png.asset.json";
import bathroom from "@/assets/baño.png.asset.json";
import bedroomTwo from "@/assets/habitacion2.png.asset.json";
import bedroomThree from "@/assets/habitacion3.png.asset.json";
import elevator from "@/assets/ascensor.png.asset.json";
import parking from "@/assets/estacionamiento.png.asset.json";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUx7bS13PCeoEQg8ncfs-akfUzY6LT7JZeQAoTh_jJsHppM7vETDW7W_fq6oamo22TkQ/exec";
const WHATSAPP_URL = "https://wa.me/51957764747?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Home%20Wonder%20Safe";
const SHARE_IMAGE_URL = "https://www.homewondersafe.com/fachada_edificio.png";
const leadSchema = z.object({
  nombre: z.string().trim().min(3, "Ingresa tu nombre completo").max(100),
  correo: z.string().trim().email("Ingresa un correo válido").max(255),
  telefono: z.string().trim().regex(/^\+?[0-9\s-]{7,15}$/, "Ingresa un teléfono válido"),
});

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Home Wonder Safe | Departamentos en Ate" },
    { name: "description", content: "Departamentos de 2 y 3 dormitorios en un condominio cerrado y seguro, en Ate. Preventa abierta — solicita información." },
    { property: "og:title", content: "Home Wonder Safe — Edificio Residencial Exclusivo" },
    { property: "og:description", content: "Departamentos de 2 y 3 dormitorios en un condominio cerrado y seguro, en Ate. Preventa abierta — solicita información." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/" },
    { property: "og:image", content: SHARE_IMAGE_URL },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Home Wonder Safe — Edificio Residencial Exclusivo" },
    { name: "twitter:description", content: "Departamentos de 2 y 3 dormitorios en un condominio cerrado y seguro, en Ate. Preventa abierta — solicita información." },
    { name: "twitter:image", content: SHARE_IMAGE_URL },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: HomePage,
});

function Ampersand() {
  return <span className="brand-amp">&amp;</span>;
}

function SectionHeading({ number, eyebrow, title, subtitle, titleClassName = "" }: { number: string; eyebrow: ReactNode; title: string; subtitle?: string; titleClassName?: string }) {
  return <div className="reveal mb-10 min-w-0 md:mb-14"><div className="mb-5 flex min-w-0 items-center gap-3 sm:gap-4"><span className="numeric shrink-0 font-display text-xl text-gold/60 sm:text-2xl">{number}</span><span className="h-px w-8 shrink-0 bg-gold/60 sm:w-12" /><span className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-xs sm:tracking-[0.2em]">{eyebrow}</span></div><h2 className={`max-w-3xl text-4xl leading-tight text-cream md:text-5xl lg:text-6xl ${titleClassName}`}>{title}</h2>{subtitle && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{subtitle}</p>}</div>;
}

function HeroVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    type Player = { destroy: () => void };
    type YouTubeWindow = Window & {
      YT?: { Player: new (element: HTMLIFrameElement, options: { events: { onStateChange: (event: { data: number }) => void } }) => Player };
      onYouTubeIframeAPIReady?: () => void;
    };
    const youtubeWindow = window as YouTubeWindow;
    let player: Player | undefined;
    const initializePlayer = () => {
      if (!youtubeWindow.YT?.Player || !iframeRef.current) return;
      player = new youtubeWindow.YT.Player(iframeRef.current, { events: { onStateChange: (event) => event.data === 1 && setIsPlaying(true) } });
    };

    if (youtubeWindow.YT?.Player) initializePlayer();
    else {
      youtubeWindow.onYouTubeIframeAPIReady = initializePlayer;
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }
    return () => player?.destroy();
  }, []);

  return <div className={`video-cover ${isPlaying ? "is-playing" : ""}`} aria-hidden="true"><div className="video-frame"><iframe ref={iframeRef} src="https://www.youtube.com/embed/ti-4VKrdXg0?enablejsapi=1&autoplay=1&mute=1&playsinline=1&loop=1&playlist=ti-4VKrdXg0&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3" title="Home Wonder Safe" allow="autoplay; encrypted-media" tabIndex={-1} /><div className="video-shield" /></div></div>;
}

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  return <main className="overflow-hidden bg-background text-foreground">
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${scrolled ? "border-gold/20 bg-background/95 shadow-xl backdrop-blur" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto grid h-20 w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:h-24 md:px-10"><img src={logoWhite.url} alt="J and M Constructora" className="h-14 w-auto object-contain md:h-16" /><Button asChild variant="goldOutline" className="h-11 px-6 text-xs uppercase md:px-8"><a href="#contacto">Solicita información</a></Button></div>
    </header>

    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-5 pb-20 pt-28 text-center sm:px-8">
      <img src={facade.url} alt="Fachada de Home Wonder Safe" className="absolute inset-0 h-full w-full object-cover" />
       <HeroVideo />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
         <div className="relative z-10 mx-auto w-full max-w-7xl animate-fade-in"><p className="mb-7 text-[10px] font-bold uppercase tracking-[0.28em] text-cream md:text-xs">Edificio residencial exclusivo</p><h1 className="text-gold-gradient whitespace-nowrap font-display text-[clamp(1.9rem,8vw,7rem)] font-semibold leading-none">Home Wonder Safe</h1><p className="mt-7 text-lg text-cream md:text-2xl">Calidad, seguridad y diseño innovador</p><p className="mt-3 flex items-center justify-center gap-2 text-sm text-cream/80"><MapPin className="h-4 w-4 text-gold" /> Urb. Alpamayo · Ate</p><div className="mx-auto mt-7 inline-flex items-center gap-2 whitespace-nowrap border border-gold/40 bg-background/55 px-3 py-3 text-[clamp(0.52rem,2.25vw,0.75rem)] font-semibold uppercase tracking-[0.08em] text-cream backdrop-blur sm:gap-3 sm:px-4 sm:tracking-[0.12em]"><span className="soft-pulse h-2 w-2 shrink-0 rounded-full bg-gold" /><span className="whitespace-nowrap">Preventa abierta · Entrega diciembre 2026</span></div><div className="mt-8"><Button asChild variant="gold" size="lg" className="h-14 px-10 text-sm uppercase"><a href="#contacto">Quiero mi departamento</a></Button></div></div>
      <button onClick={() => document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })} aria-label="Descubrir el proyecto" className="scroll-drift absolute bottom-7 z-10 text-gold"><ArrowDown className="h-7 w-7" /></button>
    </section>

    <section id="propuesta" className="px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="02" eyebrow="Una nueva forma de vivir" title="Home Wonder Safe" /><p className="reveal mx-auto mb-12 max-w-3xl text-center font-display text-xl leading-relaxed text-cream sm:text-2xl md:text-3xl">Un hogar donde la privacidad no es un lujo, sino parte de cada día. Espacio, seguridad e independencia en un entorno moderno y cerrado.</p><div className="grid min-w-0 gap-px bg-gold/30 md:grid-cols-3">{[
      [Users, "Exclusividad real", "Olvídate del ruido de paredes compartidas. Un espacio 100% independiente para solo 5 familias en todo el edificio."],
      [ShieldCheck, "Seguridad garantizada", "Tranquilidad total para tu familia dentro de una urbanización protegida con solo 2 accesos controlados."],
      [Building2, "Solidez y confianza", "Ingeniería de alta resistencia antisísmica y materiales de marcas líderes diseñados para durar toda la vida."],
    ].map(([Icon, title, text]) => { const C = Icon as typeof Users; return <article key={String(title)} className="reveal min-w-0 bg-night-soft p-7 md:p-8 lg:p-9"><C className="mb-7 h-9 w-9 text-gold" /><h3 className="text-xl text-cream lg:text-2xl">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{String(text)}</p></article>; })}</div></div></section>

    <section className="bg-night-soft px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="03" eyebrow="Ubicación" title="Todo cerca. La tranquilidad, aún más." /><div className="grid min-w-0 items-stretch gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]"><div className="reveal min-w-0"><div className="bg-gold-gradient px-6 py-5 text-sm font-extrabold leading-6 tracking-wide text-primary-foreground sm:text-base lg:inline-block lg:px-6 lg:py-4">Calle Montaña de Asturias Mz. M Lote 29 — Urb. Alpamayo, Ate</div><div className="mt-8 space-y-7">{[
      [LockKeyhole, "Condominio exclusivo", "Entorno residencial, tranquilo y de bajo tráfico vehicular."], [ShieldCheck, "Accesos controlados", "Urbanización cercada con solo 2 ingresos: C. Bucaramanga (Colegio Alpamayo) y Av. El Banco."], [Waves, "Vistas y entorno único", "Frente a la Huaca La Puruchuca."],
    ].map(([Icon, title, text]) => { const C = Icon as typeof LockKeyhole; return <div key={String(title)} className="flex min-w-0 gap-4 sm:gap-5"><C className="mt-1 h-6 w-6 shrink-0 text-gold" /><div className="min-w-0"><h3 className="text-lg text-cream lg:text-xl">{String(title)}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{String(text)}</p></div></div>; })}</div></div><div className="reveal flex min-w-0 flex-col"><iframe className="min-h-[360px] w-full flex-1 border-0 grayscale-[20%] sm:min-h-[420px]" loading="lazy" title="Ubicación exacta de Home Wonder Safe" src="https://www.google.com/maps?q=Home+Wonder+Safe,-12.0632762,-76.9342491&z=17&output=embed" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div></div></div></section>

    <section className="px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="04" eyebrow={<>Distribución <Ampersand /> tipologías</>} title="Privacidad absoluta" subtitle="Solo 1 departamento por piso. Cinco familias en todo el edificio." /><div className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]"><div className="grid min-w-0 gap-5">{[
      ["Piso 1", "103 m²", "2 dormitorios amplios e iluminados", "2 baños completos"], ["Pisos 2 al 5", "121 m²", "3 dormitorios amplios e iluminados", "2½ baños · principal con baño privado"],
    ].map((item) => <article key={item[0]} className="reveal min-w-0 border border-gold/30 bg-night-soft p-6 sm:p-7 md:p-8"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"><h3 className="min-w-0 text-2xl text-cream lg:text-3xl">{item[0]}</h3><span className="numeric shrink-0 font-display text-2xl text-gold lg:text-3xl">{item[1]}</span></div><div className="my-6 h-px bg-gold/20" /><p className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base"><Check className="h-5 w-5 shrink-0 text-gold" />{item[2]}</p><p className="mt-3 flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base"><Check className="h-5 w-5 shrink-0 text-gold" />{item[3]}</p></article>)}</div><figure className="reveal mx-auto grid w-full max-w-[29rem] min-w-0 grid-cols-2 gap-3 lg:h-[420px] lg:max-w-none lg:grid-rows-[minmax(0,2fr)_minmax(0,1fr)_auto]"><img src={bedroom.url} loading="lazy" alt="Dormitorio principal iluminado de Home Wonder Safe" className="col-span-2 h-48 w-full object-cover transition duration-700 hover:scale-[1.01] sm:h-56 lg:h-full lg:min-h-0" /><img src={bedroomTwo.url} loading="lazy" alt="Dormitorio doble de Home Wonder Safe" className="h-32 w-full object-cover sm:h-40 lg:h-full lg:min-h-0" /><img src={bedroomThree.url} loading="lazy" alt="Dormitorio individual de Home Wonder Safe" className="h-32 w-full object-cover sm:h-40 lg:h-full lg:min-h-0" /><figcaption className="col-span-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">Dormitorios amplios e iluminados</figcaption></figure></div></div></section>

    <section className="bg-night-soft px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="05" eyebrow="Interiores" title="Un hogar diseñado para enamorar a primera vista" />{[
      { title: "Espaciosa Sala-Comedor", text: "Concepto de ambiente integrado pensado para la vida familiar, con excelente ingreso de luz natural y ventilación cruzada.", images: [living, dining] },
       { title: "Cocina & Lavandería", displayTitle: <>Cocina <Ampersand /> Lavandería</>, text: "Acabados de calidad, espacio optimizado para centro de lavado e instalación de gas natural.", images: [kitchen, kitchenWide] },
      { title: "Baños Modernos", text: "Grifería de vanguardia, sanitarios de alta durabilidad y duchas con elegantes mamparas.", images: [bathroom] },
    ].map((block, index) => <article key={block.title} className="reveal grid min-w-0 items-center gap-8 border-t border-gold/20 py-10 md:grid-cols-2 md:gap-12 lg:gap-16"><div className={`grid min-w-0 gap-3 ${block.images.length > 1 ? "grid-cols-2" : ""} ${index % 2 ? "md:order-2" : ""}`}>{block.images.map((image, imageIndex) => <img key={image.url} src={image.url} loading="lazy" alt={`${block.title} de Home Wonder Safe ${imageIndex + 1}`} className="aspect-[4/3] w-full object-cover" />)}</div><div className={`min-w-0 ${index % 2 ? "md:order-1" : ""}`}><span className="numeric text-xs font-semibold uppercase tracking-[0.2em] text-gold">0{index + 1}</span><h3 className="mt-4 text-2xl text-cream lg:text-3xl">{"displayTitle" in block ? block.displayTitle : block.title}</h3><p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground lg:text-lg lg:leading-8">{block.text}</p></div></article>)}</div></section>

    <section className="px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="06" eyebrow="Recorrido 3D" title="Recorre el proyecto en 3D" subtitle="Conoce cada detalle del edificio y visualiza cómo será tu próximo hogar." /><div className="reveal aspect-video w-full overflow-hidden border border-gold/30 bg-night-soft shadow-2xl"><iframe className="h-full w-full" src="https://www.youtube.com/embed/ti-4VKrdXg0?controls=1&rel=0" title="Recorrido 3D de Home Wonder Safe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div></section>

    <section className="bg-night-soft px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="07" eyebrow="Equipamiento" title="Comodidad y estilo de vida superior" titleClassName="lg:max-w-4xl lg:text-balance" /><div className="grid min-w-0 gap-8">{[
      { Icon: Building2, title: "Accesibilidad & Elevación", displayTitle: <>Accesibilidad <Ampersand /> Elevación</>, text: "Ascensor con capacidad para 6 personas. Plataforma de accesibilidad desde la entrada hasta el Piso 1.", image: elevator, alt: "Ascensor de Home Wonder Safe" },
      { Icon: ShieldCheck, title: "Estacionamiento privado", text: "3 plazas de estacionamiento ubicadas en semisótano para la máxima seguridad y resguardo de los vehículos.", image: parking, alt: "Estacionamiento privado de Home Wonder Safe" },
    ].map(({ Icon, title, displayTitle, text, image, alt }, index) => <article key={title} className="reveal grid min-w-0 overflow-hidden border border-gold/30 bg-background md:grid-cols-2"><img src={image.url} loading="lazy" alt={alt} className={`aspect-[16/10] min-h-64 w-full object-cover md:h-full ${index % 2 ? "md:order-2" : ""}`} /><div className={`flex min-w-0 flex-col justify-center p-7 md:p-9 lg:p-11 ${index % 2 ? "md:order-1" : ""}`}><Icon className="mb-6 h-8 w-8 text-gold" /><h3 className="text-xl text-cream lg:text-2xl">{displayTitle ?? title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{text}</p></div></article>)}</div></div></section>

    <section className="border-y border-gold/20 px-5 py-20 sm:px-8 md:px-10 md:py-28"><div className="mx-auto w-full max-w-7xl min-w-0"><SectionHeading number="08" eyebrow="Respaldo técnico e ingeniería" title="Construido para durar" /><div className="grid min-w-0 gap-px bg-gold/30 md:grid-cols-2"><article className="reveal min-w-0 bg-night-soft p-7 md:p-9 lg:p-11"><Construction className="mb-7 h-10 w-10 text-gold" /><h3 className="text-2xl text-cream lg:text-3xl">Estructura Antisísmica</h3><p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base lg:leading-8">Placas de concreto, vigas de cimentación, zapatas y columnas conforman una estructura de alta resistencia.</p></article><article className="reveal min-w-0 bg-night-soft p-7 md:p-9 lg:p-11"><Wrench className="mb-7 h-10 w-10 text-gold" /><h3 className="text-2xl text-cream lg:text-3xl">Materiales de Calidad</h3><p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base lg:leading-8">Cementos Sol, Fierros Sider, Tuberías Pavco y Ladrillos Forte: marcas líderes seleccionadas para durar.</p></article></div></div></section>

    <LeadSection />

    <footer className="border-t border-gold/20 px-5 py-14 md:px-10"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto]"><div><img src={logoWhite.url} alt="J and M Constructora" className="h-20 w-auto" /><p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">Calle Montaña de Asturias Mz. M Lote 29, Urb. Alpamayo, Ate<br />957 764 747 · homewondersafe@gmail.com</p></div><div className="md:text-right"><p className="text-sm text-muted-foreground">*Todas las imágenes presentadas son de carácter referencial</p><p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold">© 2026 J<Ampersand />M Constructora</p></div></div></footer>

    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-primary-foreground shadow-gold transition-transform hover:scale-105"><MessageCircle className="h-7 w-7" /></a>
  </main>;
}

function LeadSection() {
  const [values, setValues] = useState({ nombre: "", correo: "", telefono: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const validateField = (name: keyof typeof values, value: string) => { const result = leadSchema.shape[name].safeParse(value); setErrors((old) => ({ ...old, [name]: result.success ? "" : result.error.issues[0]?.message ?? "Dato inválido" })); };
  const submit = async (event: FormEvent) => {
    event.preventDefault(); const parsed = leadSchema.safeParse(values);
    if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]))); return; }
    if (APPS_SCRIPT_URL.startsWith("[")) { setStatus("error"); return; }
    setStatus("loading");
    try { await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...parsed.data, fecha: new Date().toISOString() }) }); setStatus("success"); setValues({ nombre: "", correo: "", telefono: "" }); }
    catch { setStatus("error"); }
  };
  return <section id="contacto" className="relative isolate scroll-mt-20 px-5 pb-20 pt-8 sm:px-8 md:scroll-mt-24 md:px-10 md:pb-24 md:pt-10"><img src={facade.url} loading="lazy" alt="Fachada de Home Wonder Safe" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-background/90" /><div className="mx-auto grid w-full max-w-7xl min-w-0 gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16"><div className="reveal min-w-0"><div className="flex min-w-0 items-center gap-3 text-gold sm:gap-4"><span className="numeric shrink-0 font-display text-2xl">09</span><span className="h-px w-8 shrink-0 bg-gold sm:w-12" /><span className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]">Preventa exclusiva</span></div><h2 className="mt-6 text-4xl leading-tight text-cream md:text-5xl lg:text-6xl">Descubre el precio y reserva tu departamento</h2><p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Preventa recién abierta · Unidades limitadas. Solo 5 departamentos en todo el edificio.</p><div className="mt-9 space-y-4 text-cream"><a href="tel:+51957764747" className="numeric flex items-center gap-3 transition-colors hover:text-gold"><Phone className="h-5 w-5 shrink-0 text-gold" />957 764 747</a><a href="mailto:homewondersafe@gmail.com" className="flex min-w-0 items-center gap-3 break-all transition-colors hover:text-gold"><Mail className="h-5 w-5 shrink-0 text-gold" />homewondersafe@gmail.com</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border-b border-gold pb-1 text-gold"><MessageCircle className="h-5 w-5 shrink-0" />Escríbenos por WhatsApp</a></div></div><div className="reveal min-w-0 border border-gold/35 bg-night-soft/95 p-6 shadow-2xl backdrop-blur md:p-9"><h3 className="text-2xl text-cream lg:text-3xl">Solicita toda la información</h3><p className="mt-2 text-sm text-muted-foreground">Déjanos tus datos y un asesor te contactará.</p>{status === "success" ? <div className="mt-10 border border-gold/40 bg-background/50 p-8 text-center"><Sparkles className="mx-auto h-9 w-9 text-gold" /><p className="mt-4 font-display text-2xl text-cream">¡Gracias!</p><p className="mt-2 leading-7 text-muted-foreground">Un asesor de J<Ampersand />M Constructora se pondrá en contacto contigo muy pronto.</p></div> : <form onSubmit={submit} className="mt-8 space-y-5" noValidate>{([['nombre','Nombre completo','text'],['correo','Correo electrónico','email'],['telefono','Teléfono','tel']] as const).map(([name, label, type]) => <label key={name} className="block"><span className="mb-2 block text-sm text-cream">{label}</span><input name={name} type={type} required value={values[name]} onChange={(e) => { setValues({ ...values, [name]: e.target.value }); validateField(name, e.target.value); }} aria-invalid={Boolean(errors[name])} aria-describedby={`${name}-error`} className="h-13 w-full border border-input bg-background/70 px-4 text-cream outline-none transition focus:border-gold focus:ring-1 focus:ring-gold" />{errors[name] && <span id={`${name}-error`} className="mt-1 block text-xs text-destructive">{errors[name]}</span>}</label>)}<Button type="submit" variant="gold" disabled={status === "loading"} className="h-14 w-full px-10 text-sm uppercase">{status === "loading" ? "Enviando..." : "Solicitar cotización"}<ChevronRight /></Button>{status === "error" && <p role="alert" className="text-sm text-destructive">No pudimos enviar tus datos. Inténtalo de nuevo o contáctanos por WhatsApp.</p>}<p className="text-xs leading-5 text-muted-foreground">Al enviar tus datos, autorizas a J<Ampersand />M Constructora a contactarte sobre este proyecto.</p></form>}</div></div></section>;
}
