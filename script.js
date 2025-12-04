// ===========================
// MENU RESPONSIVO - HAMBURGER
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/fechar menu ao clicar no hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// ANIMAÇÃO AO SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
const cards = document.querySelectorAll('.project-card, .skill-item, .stat');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===========================
// BARRA DE PROGRESSO DE SKILLS
// ===========================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.transition = 'width 1.5s ease';
    skillObserver.observe(bar);
});

// ===========================
// FORMULÁRIO DE CONTATO
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pegar valores do formulário
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Validação básica
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }

    // Validar email
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido!', 'error');
        return;
    }

    // Simular envio
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // Simular delay de envio
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===========================
// NOTIFICAÇÕES
// ===========================

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos inline para notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    // Cores por tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = '#ffffff';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = '#ffffff';
    } else {
        notification.style.backgroundColor = '#3b82f6';
        notification.style.color = '#ffffff';
    }

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// ANIMAÇÕES CSS DINÂMICAS
// ===========================

// Adicionar keyframes de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// ===========================
// EFEITO DE SCROLL SUAVE
// ===========================

// Já está definido no CSS com scroll-behavior: smooth

// ===========================
// CONTADOR DE STATS (Animação de números)
// ===========================

const stats = document.querySelectorAll('.stat h3');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = parseInt(element.textContent);
            let currentValue = 0;
            const increment = finalValue / 30; // Duração de 30 frames

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    element.textContent = finalValue + '+';
                    clearInterval(counter);
                } else {
                    element.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);

            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// EFEITO PARALLAX SIMPLES
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// ===========================
// LOG DE INICIALIZAÇÃO
// ===========================

console.log('Portfólio carregado com sucesso! 🚀');
