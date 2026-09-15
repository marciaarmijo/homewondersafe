import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowDown, ArrowRight, Building2, Check, ChevronRight, Construction, Facebook, Instagram, LockKeyhole, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Users, Waves, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWhite from "@/assets/LogoJ_M_blanco_sinfondo.png.asset.json";
import facade from "@/assets/fachada_edificio.png.asset.json";
import facadeAngle from "@/assets/fachada_diagonal.png.asset.json";
import bedroom from "@/assets/habitacion1.png.asset.json";
import living from "@/assets/salacomedor.png.asset.json";
import dining from "@/assets/comedor.png.asset.json";
import kitchen from "@/assets/cocina.png.asset.json";
import bathroom from "@/assets/baño.png.asset.json";

const APPS_SCRIPT_URL = "[PEGAR_AQUÍ_LA_URL_DEL_APPS_SCRIPT]";
const WHATSAPP_URL = "https://wa.me/51957764747?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Home%20Wonder%20Safe";
const leadSchema = z.object({
  nombre: z.string().trim().min(3, "Ingresa tu nombre completo").max(100),
  correo: z.string().trim().email("Ingresa un correo válido").max(255),
  telefono: z.string().trim().regex(/^\+?[0-9\s-]{7,15}$/, "Ingresa un teléfono válido"),
});

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Home Wonder Safe | Departamentos en Ate" },
    { name: "description", content: "Conoce Home Wonder Safe: edificio exclusivo para solo cinco familias en Urb. Alpamayo, Ate. Preventa abierta." },
    { property: "og:title", content: "Home Wonder Safe | Privacidad y seguridad en Ate" },
    { property: "og:description", content: "Solo un departamento por piso, arquitectura antisísmica y ubicación privilegiada en Urb. Alpamayo." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: HomePage,
});

function SectionHeading({ number, eyebrow, title, subtitle }: { number: string; eyebrow: string; title: string; subtitle?: string }) {
  return <div className="reveal mb-12 md:mb-16"><div className="mb-5 flex items-center gap-4"><span className="font-display text-2xl text-gold/60">{number}</span><span className="h-px w-12 bg-gold/60" /><span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</span></div><h2 className="max-w-3xl text-4xl leading-tight text-cream md:text-6xl">{title}</h2>{subtitle && <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{subtitle}</p>}</div>;
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
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:h-24 md:px-10"><img src={logoWhite.url} alt="J&M Constructora" className="h-14 w-auto object-contain md:h-16" /><Button asChild variant="goldOutline" className="h-11 px-4 text-xs uppercase md:px-6"><a href="#contacto">Solicita información</a></Button></div>
    </header>

    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-5 pb-20 pt-28 text-center">
      <img src={facade.url} alt="Fachada de Home Wonder Safe" className="absolute inset-0 h-full w-full object-cover" />
      <div className="video-cover hidden md:block" aria-hidden="true"><iframe src="https://www.youtube.com/embed/ti-4VKrdXg0?autoplay=1&mute=1&loop=1&playlist=ti-4VKrdXg0&controls=0&showinfo=0&rel=0" title="Vista del proyecto Home Wonder Safe" allow="autoplay; encrypted-media" /></div>
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl animate-fade-in"><p className="mb-7 text-[10px] font-bold uppercase tracking-[0.28em] text-cream md:text-xs">Edificio residencial exclusivo</p><h1 className="text-gold-gradient font-display text-5xl font-semibold leading-[.95] md:text-8xl lg:text-9xl">Home Wonder<br />Safe</h1><p className="mt-7 text-lg text-cream md:text-2xl">Calidad, seguridad y diseño innovador</p><p className="mt-3 flex items-center justify-center gap-2 text-sm text-cream/80"><MapPin className="h-4 w-4 text-gold" /> Urb. Alpamayo · Ate</p><div className="mx-auto mt-7 inline-flex items-center gap-3 border border-gold/40 bg-background/55 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur"><span className="soft-pulse h-2 w-2 rounded-full bg-gold" /> Preventa abierta · Entrega diciembre 2026</div><div className="mt-8"><Button asChild variant="gold" size="lg" className="h-14 px-8 text-sm uppercase tracking-wide"><a href="#contacto">Quiero conocer el precio <ArrowRight /></a></Button></div></div>
      <button onClick={() => document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })} aria-label="Descubrir el proyecto" className="scroll-drift absolute bottom-7 z-10 text-gold"><ArrowDown className="h-7 w-7" /></button>
    </section>

    <section id="propuesta" className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="02" eyebrow="Una nueva forma de vivir" title="Home Wonder Safe" /><p className="reveal mx-auto mb-14 max-w-3xl text-center font-display text-2xl leading-relaxed text-cream md:text-3xl">Un hogar donde la privacidad no es un lujo, sino parte de cada día. Espacio, seguridad e independencia en un entorno moderno y cerrado.</p><div className="grid gap-px bg-gold/30 md:grid-cols-3">{[
      [Users, "Exclusividad real", "Olvídate del ruido de paredes compartidas. Un espacio 100% independiente para solo 5 familias en todo el edificio."],
      [ShieldCheck, "Seguridad garantizada", "Tranquilidad total para tu familia dentro de una urbanización protegida con solo 2 accesos controlados."],
      [Building2, "Solidez y confianza", "Ingeniería de alta resistencia antisísmica y materiales de marcas líderes diseñados para durar toda la vida."],
    ].map(([Icon, title, text]) => { const C = Icon as typeof Users; return <article key={String(title)} className="reveal bg-night-soft p-8 md:p-10"><C className="mb-8 h-9 w-9 text-gold" /><h3 className="text-2xl text-cream">{String(title)}</h3><p className="mt-4 leading-7 text-muted-foreground">{String(text)}</p></article>; })}</div></div></section>

    <section className="bg-night-soft px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="03" eyebrow="Ubicación" title="Todo cerca. La tranquilidad, aún más." /><div className="grid items-stretch gap-10 lg:grid-cols-[.9fr_1.1fr]"><div className="reveal"><div className="bg-gold-gradient p-5 font-semibold text-primary-foreground">Calle Montaña de Asturias Mz. M Lote 29 — Urb. Alpamayo, Ate</div><div className="mt-8 space-y-8">{[
      [LockKeyhole, "Condominio exclusivo", "Entorno residencial, tranquilo y de bajo tráfico vehicular."], [ShieldCheck, "Accesos controlados", "Urbanización cercada con solo 2 ingresos: C. Bucaramanga (Colegio Alpamayo) y Av. El Banco."], [Waves, "Vistas y entorno único", "Frente a la Huaca La Puruchuca."],
    ].map(([Icon, title, text]) => { const C = Icon as typeof LockKeyhole; return <div key={String(title)} className="flex gap-5"><C className="mt-1 h-6 w-6 shrink-0 text-gold" /><div><h3 className="text-xl text-cream">{String(title)}</h3><p className="mt-2 leading-7 text-muted-foreground">{String(text)}</p></div></div>; })}</div></div><iframe className="reveal min-h-[420px] w-full border-0 grayscale-[20%]" loading="lazy" title="Ubicación de Home Wonder Safe" src="https://www.google.com/maps?q=Calle%20Monta%C3%B1a%20de%20Asturias%20Mz.%20M%20Lote%2029%2C%20Urb.%20Alpamayo%2C%20Ate%2C%20Lima&output=embed" /></div></div></section>

    <section className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="04" eyebrow="Distribución & tipologías" title="Privacidad absoluta" subtitle="Solo 1 departamento por piso. Cinco familias en todo el edificio." /><div className="grid gap-10 lg:grid-cols-2"><div className="grid gap-5">{[
      ["Piso 1", "103 m²", "2 dormitorios amplios e iluminados", "2 baños completos"], ["Pisos 2 al 5", "121 m²", "3 dormitorios amplios e iluminados", "2½ baños · principal con baño privado"],
    ].map((item) => <article key={item[0]} className="reveal border border-gold/30 bg-night-soft p-7 md:p-9"><div className="flex items-start justify-between gap-5"><h3 className="text-3xl text-cream">{item[0]}</h3><span className="font-display text-3xl text-gold">{item[1]}</span></div><div className="my-6 h-px bg-gold/20" /><p className="flex gap-3 text-muted-foreground"><Check className="h-5 w-5 shrink-0 text-gold" />{item[2]}</p><p className="mt-3 flex gap-3 text-muted-foreground"><Check className="h-5 w-5 shrink-0 text-gold" />{item[3]}</p></article>)}</div><figure className="reveal relative min-h-[480px] overflow-hidden"><img src={bedroom.url} loading="lazy" alt="Dormitorio iluminado de Home Wonder Safe" className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]" /><figcaption className="absolute bottom-0 left-0 bg-background/85 px-5 py-3 text-xs uppercase tracking-[0.15em] text-cream backdrop-blur">Dormitorios amplios e iluminados</figcaption></figure></div></div></section>

    <section className="bg-night-soft px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="05" eyebrow="Interiores" title="Un hogar diseñado para enamorar a primera vista" />{[
      { title: "Espaciosa Sala-Comedor", text: "Concepto de ambiente integrado pensado para la vida familiar, con excelente ingreso de luz natural y ventilación cruzada.", images: [living, dining] },
      { title: "Cocina & Lavandería", text: "Acabados de calidad, espacio optimizado para centro de lavado e instalación de gas natural.", images: [kitchen] },
      { title: "Baños Modernos", text: "Grifería de vanguardia, sanitarios de alta durabilidad y duchas con elegantes mamparas.", images: [bathroom] },
    ].map((block, index) => <article key={block.title} className={`reveal grid items-center gap-8 border-t border-gold/20 py-12 md:grid-cols-2 md:gap-16 ${index % 2 ? "" : ""}`}><div className={`grid gap-3 ${block.images.length > 1 ? "grid-cols-2" : ""} ${index % 2 ? "md:order-2" : ""}`}>{block.images.map((image, imageIndex) => <img key={image.url} src={image.url} loading="lazy" alt={`${block.title} de Home Wonder Safe ${imageIndex + 1}`} className="aspect-[4/3] h-full w-full object-cover" />)}</div><div className={index % 2 ? "md:order-1" : ""}><span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">0{index + 1}</span><h3 className="mt-4 text-3xl text-cream md:text-4xl">{block.title}</h3><p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">{block.text}</p></div></article>)}</div></section>

    <section className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="06" eyebrow="Equipamiento" title="Comodidad y estilo de vida superior" /><div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]"><img src={facadeAngle.url} loading="lazy" alt="Vista diagonal y acceso vehicular del edificio" className="reveal h-full min-h-[420px] w-full object-cover" /><div className="grid gap-px bg-gold/30">{[[Building2, "Accesibilidad & Elevación", "Ascensor con capacidad para 6 personas. Plataforma de accesibilidad desde la entrada hasta el Piso 1."], [ShieldCheck, "Estacionamiento privado", "3 plazas de estacionamiento ubicadas en semisótano para la máxima seguridad y resguardo de los vehículos."]].map(([Icon, title, text]) => { const C = Icon as typeof Building2; return <article key={String(title)} className="reveal flex flex-col justify-center bg-night-soft p-8 md:p-10"><C className="mb-6 h-8 w-8 text-gold" /><h3 className="text-2xl text-cream">{String(title)}</h3><p className="mt-4 leading-7 text-muted-foreground">{String(text)}</p></article>; })}</div></div></div></section>

    <section className="border-y border-gold/20 bg-night-soft px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><SectionHeading number="07" eyebrow="Respaldo técnico e ingeniería" title="Construido para durar" /><div className="grid gap-px bg-gold/30 md:grid-cols-2"><article className="reveal bg-background p-8 md:p-12"><Construction className="mb-7 h-10 w-10 text-gold" /><h3 className="text-3xl text-cream">Estructura Antisísmica</h3><p className="mt-5 leading-8 text-muted-foreground">Placas de concreto, vigas de cimentación, zapatas y columnas conforman una estructura de alta resistencia.</p></article><article className="reveal bg-background p-8 md:p-12"><Wrench className="mb-7 h-10 w-10 text-gold" /><h3 className="text-3xl text-cream">Materiales de Calidad</h3><p className="mt-5 leading-8 text-muted-foreground">Cementos Sol, Fierros Sider, Tuberías Pavco y Ladrillos Forte: marcas líderes seleccionadas para durar.</p></article></div></div></section>

    <LeadSection />

    <footer className="border-t border-gold/20 px-5 py-14 md:px-10"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto]"><div><img src={logoWhite.url} alt="J&M Constructora" className="h-20 w-auto" /><p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">Calle Montaña de Asturias Mz. M Lote 29, Urb. Alpamayo, Ate<br />957 764 747 · homewondersafe@gmail.com</p></div><div className="md:text-right"><p className="text-sm text-muted-foreground">*Todas las imágenes presentadas son de carácter referencial</p><p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold">© 2026 J&M Constructora</p></div></div></footer>

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
  return <section id="contacto" className="relative isolate scroll-mt-20 px-5 py-24 md:scroll-mt-24 md:px-10 md:py-32"><img src={facade.url} loading="lazy" alt="Fachada de Home Wonder Safe" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-background/90" /><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div className="reveal"><div className="flex items-center gap-4 text-gold"><span className="font-display text-2xl">08</span><span className="h-px w-12 bg-gold" /><span className="text-xs font-semibold uppercase tracking-[0.2em]">Últimas unidades</span></div><h2 className="mt-6 text-4xl leading-tight text-cream md:text-6xl">Descubre el precio y aparta tu unidad</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">Preventa recién abierta · Unidades limitadas. Solo 5 departamentos en todo el edificio.</p><div className="mt-10 space-y-4 text-cream"><a href="tel:+51957764747" className="flex items-center gap-3 transition-colors hover:text-gold"><Phone className="h-5 w-5 text-gold" />957 764 747</a><a href="mailto:homewondersafe@gmail.com" className="flex items-center gap-3 transition-colors hover:text-gold"><Mail className="h-5 w-5 text-gold" />homewondersafe@gmail.com</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border-b border-gold pb-1 text-gold"><MessageCircle className="h-5 w-5" />Escríbenos por WhatsApp</a></div></div><div className="reveal border border-gold/35 bg-night-soft/95 p-6 shadow-2xl backdrop-blur md:p-10"><h3 className="text-3xl text-cream">Solicita toda la información</h3><p className="mt-2 text-sm text-muted-foreground">Déjanos tus datos y un asesor te contactará.</p>{status === "success" ? <div className="mt-10 border border-gold/40 bg-background/50 p-8 text-center"><Sparkles className="mx-auto h-9 w-9 text-gold" /><p className="mt-4 font-display text-2xl text-cream">¡Gracias!</p><p className="mt-2 leading-7 text-muted-foreground">Un asesor de J&M Constructora se pondrá en contacto contigo muy pronto.</p></div> : <form onSubmit={submit} className="mt-8 space-y-5" noValidate>{([['nombre','Nombre completo','text'],['correo','Correo electrónico','email'],['telefono','Teléfono / WhatsApp','tel']] as const).map(([name, label, type]) => <label key={name} className="block"><span className="mb-2 block text-sm text-cream">{label}</span><input name={name} type={type} required value={values[name]} onChange={(e) => { setValues({ ...values, [name]: e.target.value }); validateField(name, e.target.value); }} aria-invalid={Boolean(errors[name])} aria-describedby={`${name}-error`} className="h-13 w-full border border-input bg-background/70 px-4 text-cream outline-none transition focus:border-gold focus:ring-1 focus:ring-gold" />{errors[name] && <span id={`${name}-error`} className="mt-1 block text-xs text-destructive">{errors[name]}</span>}</label>)}<Button type="submit" variant="gold" disabled={status === "loading"} className="h-14 w-full text-sm uppercase tracking-wide">{status === "loading" ? "Enviando..." : "Quiero recibir el precio"}<ChevronRight /></Button>{status === "error" && <p role="alert" className="text-sm text-destructive">El formulario aún no está conectado. También puedes contactarnos por WhatsApp o correo.</p>}<p className="text-xs leading-5 text-muted-foreground">Al enviar tus datos, autorizas a J&M Constructora a contactarte sobre este proyecto.</p></form>}</div></div></section>;
}
