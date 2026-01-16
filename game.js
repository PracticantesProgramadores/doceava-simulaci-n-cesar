/*********************************
 * DECISIONES DE VIDA - GAME.JS
 * Juego mejorado de toma de decisiones
 *********************************/

/* ==============================
   ESTADO INICIAL DEL JUGADOR
================================ */
let estado = {
  bienestar: 0,
  responsabilidad: 0,
  relaciones: 0,
  proyecto: 0
};

/* ==============================
   CONTROL DE PROGRESO
================================ */
let decisionesTomadas = 0;
const MAX_DECISIONES = 15;

/* ==============================
   ÁREAS Y SITUACIONES
================================ */
const areas = {
  Estudio: {
    casos: [
      {
        titulo: "Examen sorpresa",
        texto: "El profesor anuncia un quiz mañana y no has repasado.",
        opciones: [
          { texto: "Estudiar intensivamente", efecto: { responsabilidad: 12, bienestar: -6 } },
          { texto: "Estudiar moderadamente", efecto: { responsabilidad: 7, bienestar: -2 } },
          { texto: "Ignorarlo", efecto: { responsabilidad: -10, bienestar: 4 } }
        ],
        usado: false
      },
      {
        titulo: "Proyecto en grupo",
        texto: "Debes coordinar un trabajo con tu equipo y falta organización.",
        opciones: [
          { texto: "Liderar y organizar", efecto: { responsabilidad: 10, relaciones: 5, bienestar: -3, proyecto: 5 } },
          { texto: "Cumplir tu parte", efecto: { responsabilidad: 6, relaciones: 2 } },
          { texto: "Dejarlo para última hora", efecto: { responsabilidad: -8, relaciones: -4, bienestar: 2 } }
        ],
        usado: false
      },
      {
        titulo: "Charla opcional",
        texto: "Hay una charla opcional sobre tu carrera.",
        opciones: [
          { texto: "Asistir y tomar notas", efecto: { responsabilidad: 5, proyecto: 6, bienestar: -2 } },
          { texto: "Asistir parcialmente", efecto: { responsabilidad: 3, proyecto: 3 } },
          { texto: "No asistir", efecto: { bienestar: 4 } }
        ],
        usado: false
      }
    ]
  },
 
  Familia: {
    casos: [
      {
        titulo: "Cita médica",
        texto: "Un familiar necesita compañía para una cita médica.",
        opciones: [
          { texto: "Acompañar toda la tarde", efecto: { relaciones: 10, bienestar: -3, responsabilidad: 4 } },
          { texto: "Ir un rato", efecto: { relaciones: 6, bienestar: -1 } },
          { texto: "No ir", efecto: { relaciones: -8, bienestar: 2 } }
        ],
        usado: false
      },
      {
        titulo: "Discusión en casa",
        texto: "Hay tensión por la repartición de tareas domésticas.",
        opciones: [
          { texto: "Conversar y repartir tareas", efecto: { relaciones: 8, responsabilidad: 6 } },
          { texto: "Hacer tu parte sin hablar", efecto: { responsabilidad: 5, relaciones: 3 } },
          { texto: "Evitar el tema", efecto: { relaciones: -5 } }
        ],
        usado: false
      },
      {
        titulo: "Celebración familiar",
        texto: "Hay una reunión que coincide con tu agenda.",
        opciones: [
          { texto: "Organizar y ayudar", efecto: { relaciones: 7, responsabilidad: 4, bienestar: -2 } },
          { texto: "Asistir y compartir", efecto: { relaciones: 6, bienestar: 3 } },
          { texto: "No asistir", efecto: { relaciones: -6, proyecto: 4 } }
        ],
        usado: false
      }
    ]
  },
 
  Amistades: {
    casos: [
      {
        titulo: "Mudanza de un amigo",
        texto: "Un amigo necesita ayuda para mudarse este fin de semana.",
        opciones: [
          { texto: "Ayudar todo el día", efecto: { relaciones: 10, bienestar: -4 } },
          { texto: "Prestar herramientas y pasar un rato", efecto: { relaciones: 6, bienestar: -1 } },
          { texto: "Decir que no puedes", efecto: { relaciones: -6, bienestar: 3 } }
        ],
        usado: false
      },
      {
        titulo: "Estudio conjunto",
        texto: "Te invitan a estudiar juntos para mejorar el rendimiento.",
        opciones: [
          { texto: "Organizar sesión y participar", efecto: { relaciones: 5, responsabilidad: 6, bienestar: -2 } },
          { texto: "Solo asistir", efecto: { relaciones: 4, responsabilidad: 3 } },
          { texto: "Rechazar la invitación", efecto: { bienestar: 3 } }
        ],
        usado: false
      },
      {
        titulo: "Conflicto menor",
        texto: "Surge un malentendido en el chat del grupo.",
        opciones: [
          { texto: "Aclarar y disculpar", efecto: { relaciones: 8 } },
          { texto: "Dejar que pase", efecto: { relaciones: 2 } },
          { texto: "Responder impulsivamente", efecto: { relaciones: -8, bienestar: 2 } }
        ],
        usado: false
      }
    ]
  },
 
  Trabajo: {
    casos: [
      {
        titulo: "Turno extra",
        texto: "Te ofrecen horas extra a cambio de mejor remuneración.",
        opciones: [
          { texto: "Aceptar turno extra", efecto: { proyecto: 8, bienestar: -4, responsabilidad: 5 } },
          { texto: "Negociar menor carga", efecto: { proyecto: 5, bienestar: -2, responsabilidad: 3 } },
          { texto: "Rechazar", efecto: { bienestar: 4 } }
        ],
        usado: false
      },
      {
        titulo: "Freelance corto",
        texto: "Aparece un trabajo freelance pequeño con plazo ajustado.",
        opciones: [
          { texto: "Tomarlo y cumplir plazo", efecto: { proyecto: 7, responsabilidad: 6, bienestar: -3 } },
          { texto: "Tomarlo con ayuda", efecto: { proyecto: 6, responsabilidad: 4, relaciones: 2 } },
          { texto: "Rechazar la oferta", efecto: { bienestar: 3 } }
        ],
        usado: false
      },
      {
        titulo: "Capacitación",
        texto: "La empresa ofrece un curso de capacitación opcional.",
        opciones: [
          { texto: "Inscribirse y terminar", efecto: { proyecto: 6, responsabilidad: 5, bienestar: -2 } },
          { texto: "Probar algunas clases", efecto: { proyecto: 4, responsabilidad: 3 } },
          { texto: "No hacerlo", efecto: { bienestar: 2 } }
        ],
        usado: false
      }
    ]
  },
 
  DecisionesPersonales: {
    casos: [
      {
        titulo: "Tiempo libre",
        texto: "Tienes tiempo libre y no sabes cómo usarlo.",
        opciones: [
          { texto: "Aprender algo nuevo", efecto: { proyecto: 5, responsabilidad: 5 } },
          { texto: "Descansar", efecto: { bienestar: 10 } },
          { texto: "Perder el tiempo", efecto: { bienestar: 2, responsabilidad: -5 } }
        ],
        usado: false
      },
      {
        titulo: "Hábito saludable",
        texto: "Estás considerando empezar a hacer ejercicio regularmente.",
        opciones: [
          { texto: "Rutina de 30 minutos", efecto: { bienestar: 8, responsabilidad: 4 } },
          { texto: "Caminar y estirar", efecto: { bienestar: 5, responsabilidad: 2 } },
          { texto: "Posponerlo", efecto: { bienestar: 1, responsabilidad: -3 } }
        ],
        usado: false
      },
      {
        titulo: "Gestión del tiempo",
        texto: "Tu agenda está desordenada y pierdes tiempo cada día.",
        opciones: [
          { texto: "Planificar la semana", efecto: { responsabilidad: 7, proyecto: 3 } },
          { texto: "Separar prioridades", efecto: { responsabilidad: 4, proyecto: 2 } },
          { texto: "Dejarlo como está", efecto: { bienestar: 2, responsabilidad: -4 } }
        ],
        usado: false
      }
    ]
  }
};

/* ==============================
   REFERENCIAS AL DOM
================================ */
const areasDiv = document.getElementById("areas");
const contenido = document.getElementById("contenido");
const varsList = document.getElementById("variables");
const btnInicio = document.getElementById("btnInicio");
const btnFinalizar = document.getElementById("btnFinalizar");
const notificacion = document.getElementById("notificacion");
const progresoGeneral = document.getElementById("progreso-general");

/* ==============================
   FUNCIONES DE UI
================================ */

// Mostrar progreso general
function mostrarProgresoGeneral() {
  const porcentaje = (decisionesTomadas / MAX_DECISIONES) * 100;
  progresoGeneral.innerHTML = `
    <div class="progreso-label">Progreso: ${decisionesTomadas}/${MAX_DECISIONES} decisiones</div>
    <div class="stat-bar-bg">
      <div class="stat-bar-fill high" style="width: ${porcentaje}%"></div>
    </div>
  `;
}

// Mostrar variables del jugador con barras
function mostrarEstado() {
  varsList.innerHTML = "";
  for (let key in estado) {
    const valor = estado[key];
    const nivel = valor < 30 ? 'low' : valor < 60 ? 'medium' : 'high';
    
    varsList.innerHTML += `
      <li>
        <div class="stat-bar">
          <div class="stat-label">
            <span class="stat-label-name">${capitalizar(key)}</span>
            <span class="stat-label-value">${valor}</span>
          </div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill ${nivel}" style="width: ${valor}%"></div>
          </div>
        </div>
      </li>`;
  }
}

// Mostrar botones de áreas
function mostrarAreas() {
  areasDiv.innerHTML = "";

  for (let area in areas) {
    const btn = document.createElement("button");
    const nombreArea = area.replace("DecisionesPersonales", "Decisiones personales");
    
    const casos = areas[area].casos;
    const disponibles = casos.filter(c => !c.usado).length;
    
    btn.innerHTML = `${nombreArea} <span class="badge">${disponibles}</span>`;

    if (disponibles === 0) {
      btn.disabled = true;
    }

    btn.onclick = () => mostrarSituacion(area);
    areasDiv.appendChild(btn);
  }
}

// Mostrar situación de un área
function mostrarSituacion(area) {
  const data = areas[area];
  const porcentaje = (decisionesTomadas / MAX_DECISIONES) * 100;
 
  contenido.innerHTML = `
    <h2>${area.replace("DecisionesPersonales", "Decisiones personales")}</h2>
    <div class="contador">
      <span>Decisiones tomadas: ${decisionesTomadas} / ${MAX_DECISIONES}</span>
      <div class="barra-progreso">
        <div class="barra-progreso-fill" style="width: ${porcentaje}%"></div>
      </div>
    </div>
    <div class="casos-grid"></div>
  `;
 
  const grid = contenido.querySelector(".casos-grid");
  data.casos.forEach((caso, idx) => {
    const card = document.createElement("div");
    card.className = "caso-card";
    const usado = caso.usado ? `<span class="caso-estado">✓ Resuelto</span>` : "";
    card.innerHTML = `
      ${usado}
      <h3>${caso.titulo}</h3>
      <p>${caso.texto}</p>
      <div class="opciones"></div>
    `;
    const ops = card.querySelector(".opciones");
    caso.opciones.forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op.texto;
      if (caso.usado) {
        btn.disabled = true;
      }
      btn.onclick = () => aplicarEfecto(area, idx, op.efecto, op.texto);
      ops.appendChild(btn);
    });
    grid.appendChild(card);
  });
}

// Mostrar notificación
function mostrarNotificacion(efecto, decision) {
  let cambios = [];
  for (let key in efecto) {
    const valor = efecto[key];
    const signo = valor > 0 ? '+' : '';
    const clase = valor > 0 ? 'cambio' : 'cambio negativo';
    cambios.push(`<p><span class="${clase}">${signo}${valor}</span> ${capitalizar(key)}</p>`);
  }
  
  notificacion.innerHTML = `
    <h4>Decisión tomada</h4>
    <p style="margin-bottom: 8px;">${decision}</p>
    ${cambios.join('')}
  `;
  
  notificacion.classList.add('show');
  
  setTimeout(() => {
    notificacion.classList.remove('show');
  }, 3000);
}

// Aplicar efectos de una decisión
function aplicarEfecto(area, idx, efecto, decision) {
  for (let key in efecto) {
    estado[key] += efecto[key];
    if (estado[key] < 0) estado[key] = 0;
    if (estado[key] > 100) estado[key] = 100;
  }
 
  areas[area].casos[idx].usado = true;
  decisionesTomadas++;
 
  mostrarNotificacion(efecto, decision);
  mostrarEstado();
  mostrarAreas();
  mostrarProgresoGeneral();
 
  if (decisionesTomadas >= MAX_DECISIONES) {
    setTimeout(() => {
      mostrarFinal();
    }, 3500);
    return;
  }
 
  mostrarSituacion(area);
}

// Mostrar resultado final
function mostrarFinal() {
  const analisis = generarAnalisis();
  
  contenido.innerHTML = `
    <div id="resultado-final">
      <h2>🎯 Resultado Final</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Bienestar</h3>
          <div class="valor">${estado.bienestar}</div>
        </div>
        <div class="stat-card">
          <h3>Responsabilidad</h3>
          <div class="valor">${estado.responsabilidad}</div>
        </div>
        <div class="stat-card">
          <h3>Relaciones</h3>
          <div class="valor">${estado.relaciones}</div>
        </div>
        <div class="stat-card">
          <h3>Proyecto de vida</h3>
          <div class="valor">${estado.proyecto}</div>
        </div>
      </div>

      <div class="analisis">
        <h3>Análisis de tus decisiones</h3>
        ${analisis}
      </div>

      <p style="text-align: center; color: #94a3b8; font-style: italic;">
        No hay respuestas correctas o incorrectas.<br>
        Cada decisión tiene consecuencias y te define.
      </p>
    </div>
  `;
}

// Generar análisis personalizado
function generarAnalisis() {
  let textos = [];
  
  if (estado.bienestar > 60) {
    textos.push("<p><strong>Bienestar:</strong> Has priorizado tu salud mental y física. Mantener este equilibrio te ayudará a largo plazo.</p>");
  } else if (estado.bienestar < 30) {
    textos.push("<p><strong>Bienestar:</strong> Has sacrificado mucho tu bienestar personal. Considera dedicar más tiempo al autocuidado.</p>");
  }
  
  if (estado.responsabilidad > 60) {
    textos.push("<p><strong>Responsabilidad:</strong> Muestras gran compromiso con tus obligaciones. Esto te abrirá puertas en el futuro.</p>");
  } else if (estado.responsabilidad < 30) {
    textos.push("<p><strong>Responsabilidad:</strong> Tus compromisos han quedado en segundo plano. Esto podría afectar tu reputación.</p>");
  }
  
  if (estado.relaciones > 60) {
    textos.push("<p><strong>Relaciones:</strong> Has cultivado vínculos fuertes. Las personas cercanas confían en ti.</p>");
  } else if (estado.relaciones < 30) {
    textos.push("<p><strong>Relaciones:</strong> Tus relaciones necesitan atención. Invertir tiempo en ellas es fundamental.</p>");
  }
  
  if (estado.proyecto > 60) {
    textos.push("<p><strong>Proyecto de vida:</strong> Estás construyendo un futuro sólido con visión a largo plazo.</p>");
  } else if (estado.proyecto < 30) {
    textos.push("<p><strong>Proyecto de vida:</strong> Tu desarrollo profesional necesita más enfoque y dedicación.</p>");
  }
  
  if (textos.length === 0) {
    textos.push("<p>Has mantenido un balance moderado en todas las áreas. Considera qué aspectos quieres potenciar más.</p>");
  }
  
  return textos.join('');
}

// Reiniciar el juego
function reiniciarJuego() {
  estado = {
    bienestar: 0,
    responsabilidad: 0,
    relaciones: 0,
    proyecto: 0
  };
 
  decisionesTomadas = 0;
 
  for (let area in areas) {
    areas[area].casos.forEach(c => c.usado = false);
  }
 
  mostrarEstado();
  mostrarAreas();
  mostrarProgresoGeneral();
 
  contenido.innerHTML = `
    <h2>Bienvenido a Decisiones de Vida</h2>
    <p>Este es un juego de simulación donde tus elecciones importan. Tomarás decisiones en diferentes áreas de tu vida y verás cómo afectan tu bienestar, responsabilidad, relaciones y proyecto de vida.</p>
    <p style="margin-top: 20px;">Selecciona un área en el menú lateral para comenzar tu aventura.</p>
    <p style="color: #94a3b8; font-style: italic;">Deberás tomar ${MAX_DECISIONES} decisiones para completar el juego.</p>
  `;
}

// Utilidad: capitalizar texto
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* ==============================
   EVENTOS
================================ */
btnInicio.onclick = reiniciarJuego;
btnFinalizar.onclick = mostrarFinal;

/* ==============================
   INICIALIZACIÓN
================================ */
reiniciarJuego();
