// ==========================================
// 1. LÓGICA DEL CARRUSEL DE IMÁGENES
// ==========================================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Iniciar paso automático
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Event Listeners del carrusel
nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

startAutoSlide();


// ==========================================
// 2. LÓGICA DE SELECCIÓN DE TURNOS Y WHATSAPP
// ==========================================
const horariosPorDia = {
    "Sábado": ["09:00", "10:00", "11:30", "13:00", "16:00", "17:30", "19:00"],
    "Domingo": ["10:00", "11:00", "12:00", "13:00", "14:00"]
};

// Reemplazá con tu número real de WhatsApp (código de país sin el +)
const numeroWhatsApp = "549388XXXXXXX";

const daySelect = document.getElementById('day-select');
const timeSelect = document.getElementById('time-select');
const bookingForm = document.getElementById('booking-form');

daySelect.addEventListener('change', function() {
    const diaSeleccionado = this.value;
    
    timeSelect.innerHTML = '<option value="" disabled selected>Elegí un horario...</option>';
    
    if (diaSeleccionado && horariosPorDia[diaSeleccionado]) {
        timeSelect.disabled = false;
        
        horariosPorDia[diaSeleccionado].forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            timeSelect.appendChild(option);
        });
    }
});

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dia = daySelect.value;
    const hora = timeSelect.value;
    
    if (dia && hora) {
        const mensaje = `Hola! Quería reservar un turno en la barbería para el día ${dia} a las ${hora}.`;
        const mensajeCodificado = encodeURIComponent(mensaje);
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
        
        window.open(linkWhatsApp, '_blank');
    } else {
        alert("Por favor, seleccioná un día y un horario.");
    }
});