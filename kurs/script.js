// JavaScript za Premium Edukacija kurseve

document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizacija popup-a za pretplatu
    initSubscriptionPopup();
    
    // Inicijalizacija smooth scrolling-a
    initSmoothScrolling();
    
    // Promena svih linkova "Kupi kurs" da vode na sekciju sa kursevima
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.setAttribute('href', '#courses');
        button.removeAttribute('target'); // Uklanjamo target="_blank" jer ostajemo na istoj stranici
    });
    
    // Promena glavnog dugmeta u navigaciji
    const mainBuyButton = document.querySelector('header .btn');
    if (mainBuyButton) {
        mainBuyButton.setAttribute('href', '#courses');
        mainBuyButton.removeAttribute('target');
    }
});

// Funkcija za inicijalizaciju popup-a za pretplatu
function initSubscriptionPopup() {
    const popup = document.getElementById('subscription-popup');
    const closePopup = document.getElementById('close-popup');
    const freeCourseBtn = document.getElementById('free-course-btn');
    const subscriptionForm = document.getElementById('subscription-form');
    const successMessage = document.getElementById('success-message');

    // Prikaži popup nakon 5 sekundi
    setTimeout(function() {
        popup.classList.add('active');
    }, 5000);

    // Prikaži popup kada se klikne na dugme za besplatan kurs (ako postoji)
    if (freeCourseBtn) {
        freeCourseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            popup.classList.add('active');
        });
    }

    // Zatvori popup kada se klikne na dugme za zatvaranje
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            popup.classList.remove('active');
        });
    }

    // Zatvori popup kada se klikne izvan popup container-a
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    // Obrada forme za pretplatu
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Sakrij formu i prikaži poruku o uspešnoj prijavi
        subscriptionForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Zatvori popup nakon 5 sekundi
        setTimeout(function() {
            popup.classList.remove('active');
            // Resetuj formu za buduću upotrebu
            setTimeout(function() {
                subscriptionForm.reset();
                subscriptionForm.style.display = 'flex';
                successMessage.style.display = 'none';
            }, 500);
        }, 5000);
    });
}

// Funkcija za inicijalizaciju smooth scrolling-a
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Funkcija za animiranje elemenata kada postanu vidljivi
function animateOnScroll() {
    const elements = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Pozovi animateOnScroll kada se stranica učita
window.addEventListener('load', animateOnScroll);