export type Lang = "nl" | "en" | "es";
export type Dict = Record<string, string | string[]>;
export type PkgId = "search" | "advice" | "premium" | "unsure";
export type Review = {
  id: string;
  lang: Lang;
  title: string;
  name: string;
  role: Record<Lang, string>;
  color: string;
  text: Record<Lang, string>;
};

export const T: Record<Lang, Dict> = {
nl:{
"meta.title":"AutoMatch — Hulp bij het kopen van een gebruikte auto",
"nav.home":"Home","nav.how":"Hoe werkt het","nav.services":"Diensten","nav.why":"Waarom AutoMatch","nav.reviews":"Reviews","nav.contact":"Neem contact op",
"hero.title":"Ik help je jouw perfecte auto te vinden.","hero.hl":"perfecte auto",
"hero.lead":"Bij AutoMatch help ik je om de perfecte gebruikte auto te vinden, volledig afgestemd op jouw wensen en budget.",
"hero.how":"Hoe dan?","cta.tell":"Vertel Robin wat je zoekt","hero.hi":"Hoi! Ik ben Robin.",
"hero.proof":"<b>4 klanten vertellen hun verhaal</b><br>in het Nederlands, Engels en Spaans",
"hero.alt":"Illustratie van Robin, oprichter van AutoMatch, met een autosleutel in zijn hand",
"how.title":"Hoe werkt het?","how.sub":"Van eerste gesprek tot sleutel in je hand: drie haltes, en ik rijd met je mee.","how.cta":"Begin bij de intake",
"s1.t":"Intake","s1.p":"Na een kennismaking vraag ik je wensen en budget uit. Heb je al een auto op het oog? Dan is dat ons startpunt.",
"s2.t":"Zoektocht","s2.p":"Ik ga voor je op zoek. Uit de resultaten selecteer ik een of meerdere auto's die voldoen aan je wensen en budget. Jij kiest de beste optie(s) en plant een proefrit.",
"s3.t":"Aankoop","s3.p":"We zien de auto in het echt en van dichtbij. Tijdens de proefrit check ik een aantal punten. Ga je ervoor? Dan kan ik je helpen bij de onderhandeling en aankoop.",
"why.title":"Waarom AutoMatch?","why.p1":"Voor autokopers die gemak zoeken, zelf te druk zijn of te weinig verstand hebben van auto's. Of voor autokopers die nieuw in Nederland zijn, zoals Expats, die onbekend zijn met de Nederlandse automarkt.",
"why.q1":"Wil je extra zekerheid bij de aanschaf van een gebruikte auto?","why.q2":"Zoek je gemak en tijdsbesparing?","why.q3":"Wil je gebruik maken van mijn kennis en ervaring?","why.v":"Dan kies je voor AutoMatch.","why.cta":"Bekijk de pakketten",
"why.alt":"Wereldbol met een vergrootglas dat een rode auto uitvergroot",
"svc.title":"Welk pakket past bij jou?","svc.choose":"Kies dit pakket","svc.save":"€20 voordeliger dan los","svc.reco":"Mijn advies",
"p1.t":"Autozoekservice","p1.p":"Ik doe een uitgebreide wensenanalyse en ik zoek en selecteer de beste occasions op basis van jouw wensen en budget.",
"p2.t":"Aankoopadvies","p2.p":"Je krijgt hulp bij het beoordelen van een auto, begeleiding bij de proefrit en hulp bij het onderhandelen over de prijs.",
"p3.t":"Premium pakket","p3.p":"Dit is combinatie van de autozoekservice en het aankoopadvies.",
"quiz.btn":"Help me kiezen","quiz.q1":"Heb je al een auto op het oog?","quiz.q2":"Wil je ook hulp bij de proefrit en de onderhandeling?","quiz.yes":"Ja","quiz.no":"Nee","quiz.res":"Mijn advies: <b>{p}</b>","quiz.go":"Plan dit pakket","quiz.again":"Opnieuw",
"rev.title":"Wat klanten zeggen","rev.prev":"Vorige review","rev.next":"Volgende review","rev.tr":"Lees in het Nederlands","rev.orig":"Toon origineel","rev.retired":"Gepensioneerd",
"plan.title":"Waar ben je naar op zoek?","foot.t":"Klaar voor je volgende auto?","plan.sub":"Drie korte stappen en Robin heeft alles voor een eerste kennismaking.",
"f.s1":"Pakket","f.s2":"Wensen","f.s3":"Contact","f.pkg":"Welk pakket wil je?","f.pk1":"Ik zoek en selecteer occasions voor je","f.pk2":"Je hebt al een auto op het oog","f.pk3":"Zoeken, proefrit en onderhandeling","f.pk4":"We kiezen samen tijdens de intake","f.unsure":"Weet ik nog niet",
"f.eye":"Heb je al een auto op het oog?","f.yes":"Ja","f.no":"Nee, nog niet","f.eyetxt":"Welke auto? Link of merk en model",
"f.next":"Volgende","f.back":"Terug","f.budget":"Budget","f.type":"Wat voor auto?","f.fuel":"Brandstof","f.when":"Wanneer wil je rijden?",
"types":["Klein en zuinig","Hatchback","Sedan","Stationwagen","SUV","MPV / gezin","Maakt niet uit"],
"fuels":["Benzine","Diesel","Hybride","Elektrisch","Maakt niet uit"],
"whens":["Zo snel mogelijk","Binnen een maand","Ik oriënteer me nog"],
"f.name":"Naam","f.email":"E-mail","f.phone":"Telefoon","f.opt":"(optioneel)","f.talk":"In welke taal wil je praten?","f.msg":"Nog iets wat Robin moet weten?","f.send":"Verstuur naar Robin",
"f.errName":"Vul je naam in.","f.errMail":"Vul een geldig e-mailadres in.","f.needPkg":"Kies eerst een pakket.",
"d.t":"Je AutoMatch staat klaar","d.p":"Dit is wat Robin van je ontvangt:","d.copy":"Kopieer bericht","d.copied":"Gekopieerd","d.form":"Open contactformulier","d.again":"Opnieuw beginnen",
"d.note":"Demo: in de live versie komt dit bericht direct bij Robin binnen. Hier kun je het kopiëren of het huidige contactformulier openen.",
"m.title":"Jouw AutoMatch","m.pkg":"Pakket","m.eye":"Op het oog","m.budget":"Budget","m.type":"Type","m.fuel":"Brandstof","m.when":"Wanneer","m.name":"Naam","m.empty":"nog niet gekozen","m.total":"Prijs",
"sum.hi":"Hoi Robin,","sum.intro":"Ik zoek hulp bij het kopen van een gebruikte auto.","sum.talk":"Taal","sum.contact":"Contact","sum.note":"Opmerking"
},
en:{
"meta.title":"AutoMatch — Help buying a used car in the Netherlands",
"nav.home":"Home","nav.how":"How it works","nav.services":"Services","nav.why":"Why AutoMatch","nav.reviews":"Reviews","nav.contact":"Get in touch",
"hero.title":"I help you find your perfect car.","hero.hl":"perfect car",
"hero.lead":"At AutoMatch I help you find the perfect used car, fully tailored to your wishes and budget.",
"hero.how":"How?","cta.tell":"Tell Robin what you need","hero.hi":"Hi! I'm Robin.",
"hero.proof":"<b>4 customers share their story</b><br>in Dutch, English and Spanish",
"hero.alt":"Illustration of Robin, founder of AutoMatch, holding a car key",
"how.title":"How does it work?","how.sub":"From the first chat to the key in your hand: three stops, and I ride along with you.","how.cta":"Start with the intake",
"s1.t":"Intake","s1.p":"After getting to know each other, I ask about your wishes and budget. Already have a car in mind? Then that's our starting point.",
"s2.t":"The search","s2.p":"I go looking for you. From the results I select one or more cars that match your wishes and budget. You pick the best option(s) and schedule a test drive.",
"s3.t":"The purchase","s3.p":"We see the car in real life, up close. During the test drive I check a number of points. Going for it? Then I can help you with the negotiation and the purchase.",
"why.title":"Why AutoMatch?","why.p1":"For car buyers who want convenience, are too busy or don't know much about cars. Or for car buyers who are new to the Netherlands, such as expats, who are unfamiliar with the Dutch car market.",
"why.q1":"Want extra certainty when buying a used car?","why.q2":"Looking for convenience and time savings?","why.q3":"Want to make use of my knowledge and experience?","why.v":"Then choose AutoMatch.","why.cta":"See the packages",
"why.alt":"Globe with a magnifying glass enlarging a red car",
"svc.title":"Which package suits you?","svc.choose":"Choose this package","svc.save":"€20 less than booking both","svc.reco":"My advice",
"p1.t":"Car search service","p1.p":"I do a thorough analysis of your wishes, then search for and select the best used cars based on your wishes and budget.",
"p2.t":"Purchase advice","p2.p":"You get help assessing a car, guidance during the test drive and help negotiating the price.",
"p3.t":"Premium package","p3.p":"This is the combination of the car search service and the purchase advice.",
"quiz.btn":"Help me choose","quiz.q1":"Do you already have a car in mind?","quiz.q2":"Do you also want help with the test drive and the negotiation?","quiz.yes":"Yes","quiz.no":"No","quiz.res":"My advice: <b>{p}</b>","quiz.go":"Plan this package","quiz.again":"Start over",
"rev.title":"What customers say","rev.prev":"Previous review","rev.next":"Next review","rev.tr":"Read in English","rev.orig":"Show original","rev.retired":"Retired",
"plan.title":"What are you looking for?","foot.t":"Ready for your next car?","plan.sub":"Three short steps and Robin has everything for a first introduction.",
"f.s1":"Package","f.s2":"Wishes","f.s3":"Contact","f.pkg":"Which package would you like?","f.pk1":"I search and select used cars for you","f.pk2":"You already have a car in mind","f.pk3":"Search, test drive and negotiation","f.pk4":"We'll decide together at the intake","f.unsure":"Not sure yet",
"f.eye":"Do you already have a car in mind?","f.yes":"Yes","f.no":"No, not yet","f.eyetxt":"Which car? Link or make and model",
"f.next":"Next","f.back":"Back","f.budget":"Budget","f.type":"What kind of car?","f.fuel":"Fuel","f.when":"When do you want to drive it?",
"types":["Small & economical","Hatchback","Sedan","Estate","SUV","MPV / family","No preference"],
"fuels":["Petrol","Diesel","Hybrid","Electric","No preference"],
"whens":["As soon as possible","Within a month","Just exploring"],
"f.name":"Name","f.email":"Email","f.phone":"Phone","f.opt":"(optional)","f.talk":"Which language would you like to speak?","f.msg":"Anything else Robin should know?","f.send":"Send to Robin",
"f.errName":"Please enter your name.","f.errMail":"Please enter a valid email address.","f.needPkg":"Choose a package first.",
"d.t":"Your AutoMatch is ready","d.p":"This is what Robin will receive:","d.copy":"Copy message","d.copied":"Copied","d.form":"Open contact form","d.again":"Start over",
"d.note":"Demo: in the live version this message goes straight to Robin. Here you can copy it or open the current contact form.",
"m.title":"Your AutoMatch","m.pkg":"Package","m.eye":"In mind","m.budget":"Budget","m.type":"Type","m.fuel":"Fuel","m.when":"When","m.name":"Name","m.empty":"not chosen yet","m.total":"Price",
"sum.hi":"Hi Robin,","sum.intro":"I'm looking for help buying a used car.","sum.talk":"Language","sum.contact":"Contact","sum.note":"Note"
},
es:{
"meta.title":"AutoMatch — Ayuda para comprar un auto usado en los Países Bajos",
"nav.home":"Inicio","nav.how":"Cómo funciona","nav.services":"Servicios","nav.why":"Por qué AutoMatch","nav.reviews":"Reseñas","nav.contact":"Contáctame",
"hero.title":"Te ayudo a encontrar tu auto perfecto.","hero.hl":"auto perfecto",
"hero.lead":"En AutoMatch te ayudo a encontrar el auto usado perfecto, totalmente adaptado a lo que buscas y a tu presupuesto.",
"hero.how":"¿Cómo?","cta.tell":"Cuéntale a Robin qué buscas","hero.hi":"¡Hola! Soy Robin.",
"hero.proof":"<b>4 clientes cuentan su experiencia</b><br>en neerlandés, inglés y español",
"hero.alt":"Ilustración de Robin, fundador de AutoMatch, con una llave de auto en la mano",
"how.title":"¿Cómo funciona?","how.sub":"De la primera charla a la llave en tu mano: tres paradas, y yo voy contigo.","how.cta":"Empieza por la entrevista",
"s1.t":"Entrevista","s1.p":"Después de conocernos, te pregunto qué buscas y cuál es tu presupuesto. ¿Ya tienes un auto en mente? Entonces ese es nuestro punto de partida.",
"s2.t":"Búsqueda","s2.p":"Busco por ti. De los resultados selecciono uno o varios autos que encajan con lo que buscas y con tu presupuesto. Tú eliges la(s) mejor(es) opción(es) y agendas una prueba de manejo.",
"s3.t":"Compra","s3.p":"Vemos el auto en persona y de cerca. Durante la prueba de manejo reviso varios puntos. ¿Te decides? Entonces te ayudo con la negociación y la compra.",
"why.title":"¿Por qué AutoMatch?","why.p1":"Para quienes buscan comodidad, tienen poco tiempo o saben poco de autos. O para quienes acaban de llegar a los Países Bajos, como los expats, y no conocen el mercado de autos neerlandés.",
"why.q1":"¿Quieres más seguridad al comprar un auto usado?","why.q2":"¿Buscas comodidad y ahorrar tiempo?","why.q3":"¿Quieres aprovechar mi conocimiento y experiencia?","why.v":"Entonces elige AutoMatch.","why.cta":"Ver los paquetes",
"why.alt":"Globo terráqueo con una lupa que amplía un auto rojo",
"svc.title":"¿Qué paquete va contigo?","svc.choose":"Elegir este paquete","svc.save":"€20 menos que por separado","svc.reco":"Mi consejo",
"p1.t":"Servicio de búsqueda","p1.p":"Hago un análisis detallado de lo que necesitas y busco y selecciono los mejores autos de segunda mano según lo que buscas y tu presupuesto.",
"p2.t":"Asesoría de compra","p2.p":"Recibes ayuda para evaluar un auto, acompañamiento en la prueba de manejo y apoyo para negociar el precio.",
"p3.t":"Paquete Premium","p3.p":"Es la combinación del servicio de búsqueda y la asesoría de compra.",
"quiz.btn":"Ayúdame a elegir","quiz.q1":"¿Ya tienes un auto en mente?","quiz.q2":"¿Quieres también ayuda con la prueba de manejo y la negociación?","quiz.yes":"Sí","quiz.no":"No","quiz.res":"Mi consejo: <b>{p}</b>","quiz.go":"Planear este paquete","quiz.again":"Otra vez",
"rev.title":"Lo que dicen los clientes","rev.prev":"Reseña anterior","rev.next":"Reseña siguiente","rev.tr":"Leer en español","rev.orig":"Ver original","rev.retired":"Jubilado",
"plan.title":"¿Qué estás buscando?","foot.t":"¿Listo para tu próximo auto?","plan.sub":"Tres pasos cortos y Robin tendrá todo para una primera charla.",
"f.s1":"Paquete","f.s2":"Lo que buscas","f.s3":"Contacto","f.pkg":"¿Qué paquete quieres?","f.pk1":"Busco y selecciono autos usados por ti","f.pk2":"Ya tienes un auto en mente","f.pk3":"Búsqueda, prueba de manejo y negociación","f.pk4":"Lo decidimos juntos en la entrevista","f.unsure":"Aún no lo sé",
"f.eye":"¿Ya tienes un auto en mente?","f.yes":"Sí","f.no":"No, todavía no","f.eyetxt":"¿Cuál? Enlace o marca y modelo",
"f.next":"Siguiente","f.back":"Atrás","f.budget":"Presupuesto","f.type":"¿Qué tipo de auto?","f.fuel":"Combustible","f.when":"¿Cuándo quieres manejarlo?",
"types":["Pequeño y económico","Hatchback","Sedán","Familiar (station wagon)","SUV","Monovolumen","Me da igual"],
"fuels":["Gasolina","Diésel","Híbrido","Eléctrico","Me da igual"],
"whens":["Lo antes posible","En menos de un mes","Solo estoy explorando"],
"f.name":"Nombre","f.email":"Correo","f.phone":"Teléfono","f.opt":"(opcional)","f.talk":"¿En qué idioma prefieres hablar?","f.msg":"¿Algo más que Robin deba saber?","f.send":"Enviar a Robin",
"f.errName":"Escribe tu nombre.","f.errMail":"Escribe un correo válido.","f.needPkg":"Primero elige un paquete.",
"d.t":"Tu AutoMatch está listo","d.p":"Esto es lo que recibirá Robin:","d.copy":"Copiar mensaje","d.copied":"Copiado","d.form":"Abrir formulario de contacto","d.again":"Empezar de nuevo",
"d.note":"Demo: en la versión real este mensaje le llega directo a Robin. Aquí puedes copiarlo o abrir el formulario de contacto actual.",
"m.title":"Tu AutoMatch","m.pkg":"Paquete","m.eye":"En mente","m.budget":"Presupuesto","m.type":"Tipo","m.fuel":"Combustible","m.when":"Cuándo","m.name":"Nombre","m.empty":"sin elegir","m.total":"Precio",
"sum.hi":"Hola, Robin:","sum.intro":"Busco ayuda para comprar un auto usado.","sum.talk":"Idioma","sum.contact":"Contacto","sum.note":"Nota"
}};

export const REVIEWS: Review[] = [
 {id:"andres", lang:"nl", title:"De juiste auto voor mij en mijn gezin", name:"Andres Cidel", role:{nl:"Software Engineer",en:"Software Engineer",es:"Software Engineer"}, color:"#246BFD",
  text:{nl:"Ik heb geen kennis van auto's. Dus ik had geen idee wat voor auto ik zou moeten kiezen. Robin heeft toen verschillende auto's geselecteerd en is met me meegegaan naar een aantal dealers om de auto's te bekijken. En we hebben samen de juiste auto voor mij en mijn gezin geselecteerd. Ik rij nu drie jaar in deze auto en ik ben er nog steeds enorm tevreden mee!",
        en:"I have no knowledge of cars, so I had no idea what kind of car I should choose. Robin then selected several cars and came with me to a number of dealers to look at them. Together we chose the right car for me and my family. I've been driving this car for three years now and I'm still extremely happy with it!",
        es:"No sé nada de autos, así que no tenía idea de qué auto elegir. Robin seleccionó varios autos y me acompañó a varios concesionarios a verlos. Juntos elegimos el auto adecuado para mí y mi familia. Llevo tres años manejándolo y sigo enormemente satisfecho."}},
 {id:"marlos", lang:"en", title:"Highly recommended", name:"Marlos Borges", role:{nl:"Expatriate Sr. Frontend Engineer",en:"Expatriate Sr. Frontend Engineer",es:"Expatriate Sr. Frontend Engineer"}, color:"#1F2B38",
  text:{en:"Robin supported me through every step of the car-buying process. He helped me choose a model that suited both my needs and budget. I wanted a small but spacious car and of course for the lowest price possible. We went to see several cars together, where we did test drives and where Robin pointed out any red flags. I eventually bought a Honda Jazz Sport, which I owned for the entire time I was living in the Netherlands. I was extremely satisfied with the car. Robin is truly passionate about cars. His honesty and straightforward advice made me feel confident in my decision.",
        nl:"Robin heeft me bij elke stap van het aankoopproces geholpen. Hij hielp me een model te kiezen dat bij mijn behoeften én mijn budget paste. Ik wilde een kleine maar ruime auto, en natuurlijk voor de laagst mogelijke prijs. We hebben samen meerdere auto's bekeken en proefritten gemaakt, en Robin wees me op alle rode vlaggen. Uiteindelijk kocht ik een Honda Jazz Sport, die ik de hele tijd heb gehad dat ik in Nederland woonde. Ik was er ontzettend tevreden over. Robin is echt gepassioneerd door auto's. Door zijn eerlijkheid en duidelijke advies voelde ik me zeker van mijn beslissing.",
        es:"Robin me acompañó en cada paso del proceso de compra. Me ayudó a elegir un modelo que se ajustaba a mis necesidades y a mi presupuesto. Quería un auto pequeño pero espacioso y, claro, al precio más bajo posible. Fuimos juntos a ver varios autos, hicimos pruebas de manejo y Robin me señaló cada señal de alerta. Al final compré un Honda Jazz Sport, que tuve todo el tiempo que viví en los Países Bajos. Quedé muy satisfecho con el auto. A Robin de verdad le apasionan los autos. Su honestidad y sus consejos directos me dieron confianza en mi decisión."}},
 {id:"cristobal", lang:"es", title:"Muy satisfecho", name:"Cristóbal C. Fernandez", role:{nl:"Gepensioneerd",en:"Retired",es:"Jubilado"}, color:"#A200BE",
  text:{es:"Estoy muy satisfecho con todo el seguimiento y la información que me has proporcionado durante el proceso de elección de mi vehículo. Te agradezco sinceramente tu interés, profesionalidad y seriedad, que han sido fundamentales para ayudarme a elegir el Ebro S700 HEV TGDI Luxury.",
        nl:"Ik ben zeer tevreden over alle begeleiding en informatie die je me hebt gegeven tijdens het kiezen van mijn auto. Ik dank je oprecht voor je betrokkenheid, professionaliteit en serieuze aanpak, die doorslaggevend waren bij het kiezen van de Ebro S700 HEV TGDI Luxury.",
        en:"I'm very satisfied with all the follow-up and information you gave me while choosing my vehicle. I sincerely thank you for your interest, professionalism and seriousness, which were key in helping me choose the Ebro S700 HEV TGDI Luxury."}},
 {id:"rocio", lang:"en", title:"Exceeded expectations", name:"Rocío Castellón", role:{nl:"Customer Service",en:"Customer Service",es:"Customer Service"}, color:"#3A6A93",
  text:{en:"As an expat I got a job just outside of Apeldoorn, the city where I live. I didn't know where to start trying to find a car, let alone choose the right one. And how and where to insure it? That's where Robin from AutoMatch came in. After a thorough analysis, he found the perfect car for me. He even helped with the negotiations, saving me some money on the price of the car.",
        nl:"Als expat kreeg ik een baan net buiten Apeldoorn, de stad waar ik woon. Ik wist niet waar ik moest beginnen met zoeken naar een auto, laat staan hoe ik de juiste moest kiezen. En hoe en waar verzeker je die? Daar kwam Robin van AutoMatch in beeld. Na een grondige analyse vond hij de perfecte auto voor me. Hij hielp zelfs bij de onderhandelingen, waardoor ik geld bespaarde op de prijs van de auto.",
        es:"Como expat conseguí trabajo justo a las afueras de Apeldoorn, la ciudad donde vivo. No sabía por dónde empezar a buscar un auto, y mucho menos cómo elegir el adecuado. ¿Y cómo y dónde asegurarlo? Ahí entró Robin de AutoMatch. Tras un análisis a fondo, encontró el auto perfecto para mí. Incluso me ayudó en la negociación y me ahorró dinero en el precio del auto."}}
];

export const PKG: Record<PkgId, { k: string; price: number | null }> = {search:{k:"p1.t",price:120},advice:{k:"p2.t",price:150},premium:{k:"p3.t",price:250},unsure:{k:"f.unsure",price:null}};

const EXTRA: Record<Lang, Dict> = {
  nl: { "how.hint": "Scroll en rij mee" },
  en: { "how.hint": "Scroll to ride along" },
  es: { "how.hint": "Haz scroll y acompáñame" },
};
(Object.keys(EXTRA) as Lang[]).forEach((l) => Object.assign(T[l], EXTRA[l]));

export const LANG_NAMES: Record<Lang, string> = { nl: "Nederlands", en: "English", es: "Español" };
