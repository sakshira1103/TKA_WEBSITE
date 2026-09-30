/* =========================================================
   KIRAN ACADEMY
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close menu when clicking navigation link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    const position = statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.getAttribute("data-target"));

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 80));

            const updateCounter = () => {

                current += increment;

                if (current >= target) {
                    counter.textContent = target;
                    return;
                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);
            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);
startCounters();


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonials = [

    {
        text:
            "Kiran Academy helped me improve my programming fundamentals and gave me confidence to work on real-world projects.",

        name: "Amit Patil",

        role: "Java Development Student",

        avatar: "A"
    },

    {
        text:
            "The practical learning approach made difficult concepts much easier to understand. The interview preparation was also very useful.",

        name: "Sneha Sharma",

        role: "Python Development Student",

        avatar: "S"
    },

    {
        text:
            "I really liked the project-based training. It helped me understand how the concepts are actually used while developing applications.",

        name: "Rahul Verma",

        role: "Full Stack Student",

        avatar: "R"
    }

];

let testimonialIndex = 0;

const testimonialText =
    document.getElementById("testimonialText");

const studentName =
    document.getElementById("studentName");

const studentRole =
    document.getElementById("studentRole");

const studentAvatar =
    document.getElementById("studentAvatar");

const dotsContainer =
    document.getElementById("testimonialDots");


function renderDots() {

    dotsContainer.innerHTML = "";

    testimonials.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.classList.add("testimonial-dot");

        if (index === testimonialIndex) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            testimonialIndex = index;

            updateTestimonial();

        });

        dotsContainer.appendChild(dot);

    });

}


function updateTestimonial() {

    const testimonial =
        testimonials[testimonialIndex];

    testimonialText.textContent =
        testimonial.text;

    studentName.textContent =
        testimonial.name;

    studentRole.textContent =
        testimonial.role;

    studentAvatar.textContent =
        testimonial.avatar;

    renderDots();

}


document
    .getElementById("prevTestimonial")
    .addEventListener("click", () => {

        testimonialIndex--;

        if (testimonialIndex < 0) {
            testimonialIndex =
                testimonials.length - 1;
        }

        updateTestimonial();

    });


document
    .getElementById("nextTestimonial")
    .addEventListener("click", () => {

        testimonialIndex++;

        if (testimonialIndex >= testimonials.length) {
            testimonialIndex = 0;
        }

        updateTestimonial();

    });


renderDots();


/* Automatic testimonial */

setInterval(() => {

    testimonialIndex++;

    if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
    }

    updateTestimonial();

}, 6000);


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const course =
        document.getElementById("course").value;

    const message =
        document.getElementById("message").value.trim();


    /* Validation */

    if (
        !name ||
        !phone ||
        !email ||
        !course ||
        !message
    ) {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.className =
            "form-message error";

        return;
    }


    /* Phone validation */

    const phonePattern =
        /^[0-9]{10}$/;

    const cleanPhone =
        phone.replace(/\D/g, "");

    if (!phonePattern.test(cleanPhone)) {

        formMessage.textContent =
            "Please enter a valid 10-digit phone number.";

        formMessage.className =
            "form-message error";

        return;
    }


    /* Success */

    formMessage.textContent =
        `Thank you ${name}! Your enquiry for ${course} has been submitted successfully.`;

    formMessage.className =
        "form-message success";


    /* Reset */

    contactForm.reset();

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".course-card, .why-card, .trainer-card, .feature, .stat"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PREVENT EMPTY SOCIAL LINKS FROM JUMPING
========================================================= */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});