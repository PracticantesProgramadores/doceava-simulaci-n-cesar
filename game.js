const app={}
const state={libertad:0,percepcion:0,creacion:0,logica:0,impulso:0,critica:0,nihilismo:0,absurdo:0,visitas:{}};
function applyDelta(d){Object.entries(d).forEach(([k,v])=>{state[k]=(state[k]||0)+v});renderVars();showDelta(d)}
function showDelta(d){const c=qs("#content");const t=document.createElement("div");t.className="toast";const parts=Object.entries(d).filter(([,v])=>v!==0).map(([k,v])=>`${v>0?"+":""}${v} ${k}`);t.innerHTML=`Cambios: <strong>${parts.join(" • ")}</strong>`;c.prepend(t)}
const areas={
existencial:{id:"existencial",nombre:"Ciudad de las Decisiones",tono:"tone-exist",intro:"El mundo responde a lo que decides. Libertad y responsabilidad.",acciones:[
{texto:"Ayudar a un personaje vulnerable",delta:{libertad:1,creacion:1},mensaje:"La existencia precede a la esencia."},
{texto:"Ignorar y seguir",delta:{nihilismo:1},mensaje:"Evasión registrada."},
{texto:"Decir la verdad aunque duela",delta:{libertad:1},mensaje:"Decisión afirmada."},
{texto:"Mentir para evitar conflicto",delta:{nihilismo:1},mensaje:"Ambigüedad aceptada."}
]},
absurdo:{id:"absurdo",nombre:"Valle del Absurdo",tono:"tone-absurdo",intro:"Nada sigue una lógica. Creas reglas para avanzar.",acciones:[
{texto:"Inventar una regla y seguirla",delta:{absurdo:1,creacion:1,libertad:1},mensaje:"Regla creada en el vacío."},
{texto:"Seguir señales contradictorias",delta:{absurdo:1},mensaje:"Rumor de indicios."},
{texto:"Detenerse y observar",delta:{percepcion:1},mensaje:"Observación suspendida."}
]},
montana:{id:"montana",nombre:"Montaña del Silencio",tono:"tone-nihil",intro:"La muerte de Dios y la creación de valores.",acciones:[
{texto:"Crear un valor propio",delta:{creacion:2,libertad:1},mensaje:"Camino del superhombre."},
{texto:"Evitar decidir",delta:{nihilismo:2},mensaje:"Nihilismo pasivo."}
]},
bosque:{id:"bosque",nombre:"Bosque de la Percepción",tono:"tone-fenomeno",intro:"Nada se asume. Todo se describe.",acciones:[
{texto:"Describir sin juzgar",delta:{percepcion:2},mensaje:"Epoché activada."},
{texto:"Suponer sin revisar",delta:{nihilismo:1},mensaje:"Suposición marcada."}
]},
rio:{id:"rio",nombre:"Río del Impulso Vital",tono:"tone-vital",intro:"Movimiento constante y transformación.",acciones:[
{texto:"Seguir el ritmo y saltar",delta:{impulso:2,creacion:1},mensaje:"Élan vital en curso."},
{texto:"Quedarse quieto",delta:{nihilismo:1},mensaje:"Inercia señalada."}
]},
lenguaje:{id:"lenguaje",nombre:"Teatro del Lenguaje",tono:"tone-analitico",intro:"El lenguaje modifica el mundo.",acciones:[
{texto:"Usar un comando claro",delta:{logica:2},mensaje:"Comando aplicado."},
{texto:"Metáforas confusas",delta:{logica:-1,nihilismo:1},mensaje:"Comando no aplicado."},
{texto:"Visitar galería crítica",delta:{critica:2},mensaje:"Juicio estético ejercido."}
]}
};
const situaciones=[
{id:"exist-1",region:"existencial",titulo:"El Cruce de las Dos Mentiras",desc:"Mentir para ayudar a un niño perdido o decir la verdad.",opciones:[
{texto:"Mentir para ayudar",delta:{libertad:1,creacion:1,nihilismo:1},mensaje:"Ayuda con ambigüedad."},
{texto:"Decir la verdad",delta:{libertad:1},mensaje:"Verdad asumida."}
]},
{id:"exist-2",region:"existencial",titulo:"El Puente de la Culpa",desc:"Un puente roto y dos ciudadanos en conflicto.",opciones:[
{texto:"Ayudar al primero",delta:{libertad:1,creacion:1},mensaje:"Elección tomada."},
{texto:"Ayudar al segundo",delta:{libertad:1,creacion:1},mensaje:"Elección tomada."},
{texto:"No ayudar",delta:{nihilismo:1},mensaje:"Indiferencia registrada."}
]},
{id:"exist-3",region:"existencial",titulo:"El Mural Incompleto",desc:"Elegir el mensaje del mural.",opciones:[
{texto:"Somos libres",delta:{libertad:2},mensaje:"La ciudad recuerda tu frase."},
{texto:"Estamos condicionados",delta:{logica:1},mensaje:"Contexto matizado."},
{texto:"Nada importa",delta:{nihilismo:2},mensaje:"Eco de vacío."}
]},
{id:"abs-1",region:"absurdo",titulo:"La Tarea Infinita",desc:"Entregar 5 objetos que nunca terminan.",opciones:[
{texto:"Continuar el ciclo",delta:{absurdo:2},mensaje:"Repetición aceptada."},
{texto:"Abandonar el ciclo",delta:{libertad:1,logica:1},mensaje:"Corte del absurdo."}
]},
{id:"abs-2",region:"absurdo",titulo:"El Laberinto que Vuelve",desc:"Todas las salidas regresan al inicio.",opciones:[
{texto:"Seguir el mapa",delta:{nihilismo:1},mensaje:"Retorno inevitable."},
{texto:"Ignorar mapa y atravesar pared",delta:{absurdo:1,libertad:1,creacion:1},mensaje:"Regla propia aplicada."}
]},
{id:"abs-3",region:"absurdo",titulo:"Los Habitantes del Eco",desc:"Tres NPCs repiten la misma frase.",opciones:[
{texto:"Definir y ejecutar regla propia",delta:{absurdo:1,libertad:1},mensaje:"El valle se abre."},
{texto:"No definir regla",delta:{nihilismo:1},mensaje:"El eco continúa."}
]},
{id:"mont-1",region:"montana",titulo:"El Sendero Roto",desc:"Los caminos desaparecen ante tus ojos.",opciones:[
{texto:"Declarar valor propio",delta:{creacion:2,libertad:1},mensaje:"Ruta creada."},
{texto:"No declarar",delta:{nihilismo:1},mensaje:"Desorientación."}
]},
{id:"mont-2",region:"montana",titulo:"La Caverna del Eco Existencial",desc:"Tu voz responde con frases de angustia.",opciones:[
{texto:"Enfrentar los ecos",delta:{libertad:1,percepcion:1},mensaje:"Decisión afirmada."},
{texto:"Huir",delta:{nihilismo:1},mensaje:"Evasión marcada."}
]},
{id:"mont-3",region:"montana",titulo:"El Altar de la Caída de Dios",desc:"Inscripción: Dios ha muerto.",opciones:[
{texto:"Aceptar la caída",delta:{absurdo:1,nihilismo:1},mensaje:"Reglas se deshacen."},
{texto:"Negarla",delta:{logica:-1,nihilismo:1},mensaje:"Ilusión cómoda."},
{texto:"Crear un nuevo principio",delta:{creacion:2,libertad:1},mensaje:"Nuevo efecto en el mapa."}
]},
{id:"fen-1",region:"bosque",titulo:"Los Árboles Cambiantes",desc:"Los árboles cambian según tu mirada.",opciones:[
{texto:"Describir sin suponer",delta:{percepcion:2},mensaje:"Paso desbloqueado."},
{texto:"Asumir",delta:{nihilismo:1},mensaje:"Bloqueo perceptivo."}
]},
{id:"fen-2",region:"bosque",titulo:"La Cabaña de la Epoché",desc:"Objetos ambiguos requieren suspender juicio.",opciones:[
{texto:"Suspender juicio y describir",delta:{percepcion:2,logica:1},mensaje:"Llaves reveladas."},
{texto:"Temer y suponer",delta:{nihilismo:1},mensaje:"Pistas perdidas."}
]},
{id:"fen-3",region:"bosque",titulo:"El Río de las Imágenes",desc:"Reflejos muestran atajos ocultos.",opciones:[
{texto:"Seguir percepciones",delta:{percepcion:1,libertad:1},mensaje:"Atajo encontrado."},
{texto:"Seguir supuestos",delta:{nihilismo:1},mensaje:"Desvío."}
]},
{id:"vital-1",region:"rio",titulo:"Las Islas que Desaparecen",desc:"Si te quedas quieto, las islas se hunden.",opciones:[
{texto:"Mantener movimiento",delta:{impulso:2,creacion:1},mensaje:"Avance vital."},
{texto:"Quedarse quieto",delta:{nihilismo:1},mensaje:"Hundimiento."}
]},
{id:"vital-2",region:"rio",titulo:"El Remolino Creativo",desc:"El remolino abre con tu ritmo.",opciones:[
{texto:"Moverse con energía",delta:{impulso:2},mensaje:"Apertura."},
{texto:"Detenerse",delta:{nihilismo:1},mensaje:"Cierre."}
]},
{id:"vital-3",region:"rio",titulo:"La Carrera de la Vida",desc:"Camino de luz según ritmo creativo.",opciones:[
{texto:"Ritmo creativo libre",delta:{impulso:2,creacion:1},mensaje:"Camino activo."},
{texto:"Patrones repetidos",delta:{nihilismo:1},mensaje:"Camino apagado."}
]},
{id:"lang-1",region:"lenguaje",titulo:"Sala de Comandos",desc:"Escribir palabras precisas para cambiar el entorno.",opciones:[
{texto:"Palabra precisa",delta:{logica:2},mensaje:"Precisión efectiva."},
{texto:"Palabra ambigua",delta:{logica:-1,nihilismo:1},mensaje:"Ambigüedad ineficaz."}
]},
{id:"lang-2",region:"lenguaje",titulo:"Juegos del Lenguaje",desc:"Interpretar contexto para que la instrucción tenga sentido.",opciones:[
{texto:"Interpretar correctamente",delta:{logica:1,percepcion:1},mensaje:"Acción lograda."},
{texto:"Literal sin contexto",delta:{logica:-1},mensaje:"Fallo de interpretación."}
]},
{id:"lang-3",region:"lenguaje",titulo:"Galería del Juicio Estético",desc:"Elegir la guía del arte.",opciones:[
{texto:"Arte autónomo",delta:{critica:2},mensaje:"Autonomía estética."},
{texto:"Arte comercial",delta:{critica:1},mensaje:"Función pragmática."},
{texto:"Arte provocador",delta:{critica:2,absurdo:1},mensaje:"Provocación como sentido."}
]}
];
const exam={pool:[],index:0,used:new Set(),auto:false,answered:false};
const perfilesInfo={
"Existencialista":{desc:"Valoras la libertad personal y las decisiones auténticas. Construyes tu identidad con tus actos, incluso con angustia.",rasgos:["libertad","responsabilidad","autenticidad","cuestionamiento"],frase:"No naciste con un significado: lo estás creando con cada paso.",ventajas:["Fuerte sentido de agencia","Coherencia entre decisiones y valores"],desventaja:"Angustia y carga por la responsabilidad constante"},
"Nihilista":{desc:"Percibes que los valores tradicionales pierden fuerza. Desconfías de verdades absolutas y reconoces el vacío para empezar de cero.",rasgos:["duda radical","cuestionamiento de valores","búsqueda desde la nada"],frase:"Te enfrentaste al vacío y reconociste que nada está asegurado.",ventajas:["Capacidad crítica frente a dogmas","Flexibilidad para reconstruir"],desventaja:"Riesgo de parálisis y desmotivación"},
"Vitalista":{desc:"Te mueve la energía, el movimiento y la creatividad. Construyes respuestas mientras avanzas y afirmas la vida.",rasgos:["impulso vital","creatividad","cambio","fuerza interior"],frase:"La vida es movimiento, y tú decidiste fluir con ella.",ventajas:["Alta resiliencia","Innovación ante obstáculos"],desventaja:"Impulsividad y desgaste si no regulas el ritmo"},
"Absurdo-lúcido":{desc:"Reconoces la falta de lógica y eliges resistir con claridad. Construyes sentido frente al absurdo.",rasgos:["lucidez","resistencia","autonomía en el caos"],frase:"Incluso en el absurdo, elegiste caminar con los ojos abiertos.",ventajas:["Autonomía frente al sin sentido","Claridad para actuar sin garantías"],desventaja:"Soledad intelectual y cansancio existencial"},
"Fenomenológico":{desc:"Observas sin asumir y describes la experiencia tal como aparece. Percibes cómo tu mirada transforma las cosas.",rasgos:["atención","percepción","descripción","conciencia del cuerpo"],frase:"Entendiste que ver el mundo también es interpretarlo.",ventajas:["Precisión en la observación","Mejor comprensión de contextos"],desventaja:"Lentitud al decidir por análisis detenido"},
"Analítico-lógico":{desc:"Piensas con precisión y orden. Analizas lenguaje, ideas y argumentos para comprender.",rasgos:["lógica","lenguaje","claridad conceptual","razonamiento"],frase:"Construiste sentido usando las herramientas del pensamiento claro.",ventajas:["Solidez argumentativa","Menos errores por ambigüedad"],desventaja:"Rigidez y dificultad ante lo ambiguo"},
"Crítico del arte":{desc:"Ves el arte como pensamiento y resistencia. Distingues lo superficial de lo auténtico y su impacto social.",rasgos:["sensibilidad estética","crítica social","autonomía del arte"],frase:"Encontraste significado en lo que expresa, no solo en lo que se ve.",ventajas:["Mirada sensible y transformadora","Capacidad de cuestionar lo establecido"],desventaja:"Elitismo percibido o desconexión con lo popular"}
};
function qs(x){return document.querySelector(x)}
function qsa(x){return Array.from(document.querySelectorAll(x))}
function renderAreasNav(){const nav=qs("#areasNav");nav.innerHTML="";Object.values(areas).forEach(a=>{const b=document.createElement("button");b.textContent=a.nombre;b.dataset.area=a.id;b.addEventListener("click",()=>renderArea(a.id));nav.appendChild(b)})}
function renderVars(){const ul=qs("#varsList");ul.innerHTML="";const map=[["Libertad",state.libertad],["Percepción",state.percepcion],["Creación",state.creacion],["Lógica",state.logica],["Impulso vital",state.impulso],["Crítica del arte",state.critica],["Nihilismo",state.nihilismo],["Absurdo",state.absurdo]];map.forEach(([k,v])=>{const li=document.createElement("li");const s=document.createElement("span");s.textContent=k;const val=document.createElement("strong");val.className="accent";val.textContent=v;li.appendChild(s);li.appendChild(val);ul.appendChild(li)})}
function mensaje(t){const c=qs("#content");const d=document.createElement("div");d.className="note";d.textContent=t;c.appendChild(d)}
function renderHome(){const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent="Despiertas en un mundo extraño";const p=document.createElement("p");p.className="section-sub";p.textContent="No hay tutorial ni misión. Tu tarea: encontrar sentido en el caos.";const p2=document.createElement("p");p2.className="note";p2.textContent="Elige una región para vivir sus ideas y toma decisiones. Tus decisiones cambian variables y tu final.";const btn=document.createElement("button");btn.className="primary";btn.textContent="Ver mapa";btn.addEventListener("click",renderMap);c.appendChild(h);c.appendChild(p);c.appendChild(p2);c.appendChild(btn)}
function renderArea(id){const a=areas[id];state.visitas[id]=(state.visitas[id]||0)+1;const c=qs("#content");c.className=`content ${a.tono}`;c.innerHTML="";qsa("#areasNav button").forEach(b=>{b.classList.toggle("active",b.dataset.area===id)});const h=document.createElement("h2");h.className="section-title";h.textContent=a.nombre;const p=document.createElement("p");p.className="section-sub";p.textContent=a.intro;c.appendChild(h);c.appendChild(p);const box=document.createElement("div");box.className="choices";a.acciones.forEach(op=>{const b=document.createElement("button");b.textContent=op.texto;const ef=document.createElement("span");ef.className="note";ef.textContent="Efectos: "+Object.entries(op.delta).map(([k,v])=>`${v>0?"+":""}${v} ${k}`).join(" • ");const wrap=document.createElement("div");wrap.style.display="grid";wrap.style.gap="6px";wrap.appendChild(b);wrap.appendChild(ef);
b.addEventListener("click",()=>{if(b.disabled)return;applyDelta(op.delta);mensaje(op.mensaje);b.disabled=true;if(id==="lenguaje"&&op.texto.includes("comando"))aplicarComando()});
box.appendChild(wrap)});if(id==="lenguaje"){const w=document.createElement("div");w.style.display="grid";w.style.gridTemplateColumns="1fr auto";w.style.gap="8px";const inp=document.createElement("input");inp.type="text";inp.placeholder="Ej.: color rojo";inp.id="cmdInput";const run=document.createElement("button");run.textContent="Ejecutar";run.addEventListener("click",()=>ejecutarEntrada());w.appendChild(inp);w.appendChild(run);c.appendChild(w)}
c.appendChild(box)}
function aplicarComando(){const c=qs("#content");const x=["rojo","azul","verde","magenta","cian","amarillo"];const pick=x[Math.floor(Math.random()*x.length)];document.documentElement.style.setProperty("--accent",pick==="rojo"?"#e85a5a":pick==="azul"?"#5a9be8":pick==="verde"?"#5ae883":pick==="magenta"?"#e85a9b":pick==="cian"?"#5ad1e8":"#e8b35a");mensaje(`Acento ${pick}`);c.scrollTop=c.scrollHeight}
function ejecutarEntrada(){const v=qs("#cmdInput").value.trim().toLowerCase();if(!v)return;const parts=v.split(" ");if(parts[0]==="color"&&parts[1]){const m=parts[1];document.documentElement.style.setProperty("--accent",m==="rojo"?"#e85a5a":m==="azul"?"#5a9be8":m==="verde"?"#5ae883":m==="magenta"?"#e85a9b":m==="cian"?"#5ad1e8":"#e8b35a");state.logica+=1;renderVars();mensaje(`Color ${m} aplicado`)}else{state.logica-=1;renderVars();mensaje("Entrada no válida")}}
function calcularPerfil(){const scores=[
{k:"Existencialista",v:state.libertad+state.creacion},
{k:"Nihilista",v:state.nihilismo},
{k:"Absurdo-lúcido",v:state.absurdo+state.creacion},
{k:"Fenomenológico",v:state.percepcion},
{k:"Vitalista",v:state.impulso},
{k:"Analítico-lógico",v:state.logica},
{k:"Crítico del arte",v:state.critica}
];scores.sort((a,b)=>b.v-a.v);const principal=scores[0];const secundarios=scores.slice(1,3).filter(s=>s.v>0);return{principal,secundarios}}
function renderFinal(){const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent="Perfil filosófico";const s=calcularPerfil();const principalInfo=perfilesInfo[s.principal.k]||{desc:"",rasgos:[],frase:"",ventajas:[],desventaja:""};const p=document.createElement("p");p.className="section-sub";p.innerHTML=`Principal: <span class="badge">${s.principal.k}</span>`;const card=document.createElement("div");card.className="card";const t=document.createElement("h3");t.textContent="Descripción";const d=document.createElement("p");d.textContent=principalInfo.desc;const r=document.createElement("ul");r.className="list";principalInfo.rasgos.forEach(x=>{const li=document.createElement("li");li.textContent=x;r.appendChild(li)});const vt=document.createElement("h3");vt.textContent="Ventajas";const vl=document.createElement("ul");vl.className="list";principalInfo.ventajas.forEach(x=>{const li=document.createElement("li");li.textContent=x;vl.appendChild(li)});const dt=document.createElement("h3");dt.textContent="Desventaja";const dp=document.createElement("p");dp.className="note";dp.textContent=principalInfo.desventaja;const fr=document.createElement("p");fr.className="note";fr.textContent=principalInfo.frase;card.appendChild(t);card.appendChild(d);card.appendChild(r);card.appendChild(vt);card.appendChild(vl);card.appendChild(dt);card.appendChild(dp);card.appendChild(fr);const box=document.createElement("div");box.className="summary";s.secundarios.forEach(x=>{const info=perfilesInfo[x.k]||{desc:"",ventajas:[],desventaja:""};const e=document.createElement("div");e.className="card";const bh=document.createElement("h3");bh.textContent=`Secundario: ${x.k}`;const bd=document.createElement("p");bd.textContent=info.desc;const bv=document.createElement("p");bv.className="note";bv.textContent=info.ventajas[0]||"";const bc=document.createElement("p");bc.className="note";bc.textContent=(info.desventaja?`Desventaja: ${info.desventaja}`:"" );e.appendChild(bh);e.appendChild(bd);if(bv.textContent)e.appendChild(bv);if(bc.textContent)e.appendChild(bc);box.appendChild(e)});const m=document.createElement("p");m.className="note";m.textContent="No hay una respuesta correcta. Creaste tu propio camino.";c.appendChild(h);c.appendChild(p);c.appendChild(card);c.appendChild(box);c.appendChild(m)}
function pickSituations(n){const avail=situaciones.filter(s=>!exam.used.has(s.id));const shuffled=avail.sort(()=>Math.random()-0.5);return shuffled.slice(0,Math.min(n,shuffled.length))}
function startExam(auto){exam.pool=pickSituations(3);exam.index=0;exam.auto=!!auto;exam.answered=false;if(exam.pool.length===0){const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent="Examen";const p=document.createElement("p");p.className="section-sub";p.textContent="Ya no hay más situaciones.";c.appendChild(h);c.appendChild(p);return}renderExam()}
function renderExam(){const s=exam.pool[exam.index];const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent=`Situación (${exam.index+1}/${exam.pool.length})`;const t=document.createElement("h3");t.textContent=s.titulo;const d=document.createElement("p");d.className="section-sub";d.textContent=s.desc;const box=document.createElement("div");box.className="choices";s.opciones.forEach(op=>{const b=document.createElement("button");b.textContent=op.texto;const ef=document.createElement("span");ef.className="note";ef.textContent="Efectos: "+Object.entries(op.delta).map(([k,v])=>`${v>0?"+":""}${v} ${k}`).join(" • ");const wrap=document.createElement("div");wrap.style.display="grid";wrap.style.gap="6px";wrap.appendChild(b);wrap.appendChild(ef);b.addEventListener("click",()=>{if(exam.answered)return;applyDelta(op.delta);mensaje(op.mensaje);exam.used.add(s.id);exam.answered=true;disableExamChoices();setTimeout(()=>continuarExamen(),600)});box.appendChild(wrap)});c.appendChild(h);c.appendChild(t);c.appendChild(d);c.appendChild(box)}
function disableExamChoices(){qsa(".choices button").forEach(x=>x.disabled=true)}
function renderContinueButton(){const c=qs("#content");const btn=document.createElement("button");btn.className="primary";btn.textContent="Continuar examen";btn.addEventListener("click",continuarExamen);c.appendChild(btn)}
function continuarExamen(){if(!exam.answered)return;exam.index+=1;exam.answered=false;if(exam.index>=exam.pool.length){const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent="Examen";const p=document.createElement("p");p.className="section-sub";p.textContent="Ya no hay más situaciones.";const b=document.createElement("button");b.className="primary";b.textContent="Iniciar otro examen";b.addEventListener("click",()=>startExam(false));c.appendChild(h);c.appendChild(p);c.appendChild(b);return}renderExam()}
function renderMap(){const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent="Mapa de regiones";const p=document.createElement("p");p.className="section-sub";p.textContent="Elige cualquier región. Cada una es un laboratorio vivencial.";const grid=document.createElement("div");grid.className="map";Object.values(areas).forEach(a=>{const card=document.createElement("div");card.className="card";const t=document.createElement("h3");t.textContent=a.nombre;const d=document.createElement("p");d.textContent=a.intro;const b=document.createElement("button");b.className="primary";b.textContent="Entrar";b.addEventListener("click",()=>renderArea(a.id));card.appendChild(t);card.appendChild(d);card.appendChild(b);grid.appendChild(card)});c.appendChild(h);c.appendChild(p);c.appendChild(grid)}
function renderHelp(){const c=qs("#content");c.className="content";c.innerHTML="";const h=document.createElement("h2");h.className="section-title";h.textContent="Cómo jugar";const box=document.createElement("div");box.className="help";const a=document.createElement("div");const ah=document.createElement("h3");ah.textContent="Qué sucede";const al=document.createElement("ul");["Despiertas sin memoria en un mundo confuso.","No hay camino correcto: decides y creas sentido.","Explora 6 regiones y vive sus ideas."].forEach(t=>{const li=document.createElement("li");li.textContent=t;al.appendChild(li)});a.appendChild(ah);a.appendChild(al);const b=document.createElement("div");const bh=document.createElement("h3");bh.textContent="Cómo avanzas";const bl=document.createElement("ul");["Comprendes, interpretas y decides.","Tus decisiones modifican variables y rutas.","Al final obtienes un perfil filosófico."].forEach(t=>{const li=document.createElement("li");li.textContent=t;bl.appendChild(li)});b.appendChild(bh);b.appendChild(bl);box.appendChild(a);box.appendChild(b);c.appendChild(h);c.appendChild(box)}
function showGuide(){const o=document.createElement("div");o.className="overlay";const m=document.createElement("div");m.className="modal";const h=document.createElement("h2");h.textContent="Qué hacer aquí";const p=document.createElement("p");p.textContent="Responde 3 situaciones aleatorias. Cada decisión cambia tus variables y tu final.";const grid=document.createElement("div");grid.className="grid";const l1=document.createElement("ul");["Pulsa una opción en cada situación.","Verás los efectos arriba.","Avanza a la siguiente automáticamente.","Al terminar, puedes iniciar otro examen o abrir el mapa."].forEach(t=>{const li=document.createElement("li");li.textContent=t;l1.appendChild(li)});const actions=document.createElement("div");actions.className="actions";const start=document.createElement("button");start.className="primary";start.textContent="Comenzar examen";start.addEventListener("click",()=>{document.body.removeChild(o);startExam(true)});const mapa=document.createElement("button");mapa.className="secondary";mapa.textContent="Ver mapa";mapa.addEventListener("click",()=>{document.body.removeChild(o);renderMap()});actions.appendChild(mapa);actions.appendChild(start);m.appendChild(h);m.appendChild(p);m.appendChild(l1);m.appendChild(actions);o.appendChild(m);document.body.appendChild(o)}
 
function init(){renderAreasNav();renderVars();renderHome();showGuide();qs("#btnInicio").addEventListener("click",()=>renderHome());qs("#btnMapa").addEventListener("click",()=>renderMap());qs("#btnAyuda").addEventListener("click",()=>renderHelp());qs("#btnFinal").addEventListener("click",()=>renderFinal())}
document.addEventListener("DOMContentLoaded",init)
