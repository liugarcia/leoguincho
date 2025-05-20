function ligarAgora() {
  window.location.href = "tel:+5561981740582";
}

// Seleção de elementos
const slidesContainer = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');

let slideIndex = 1;
let isAnimating = false;

// Clona primeiro e último slide
const firstClone = imagens[0].cloneNode(true);
const lastClone = imagens[imagens.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, imagens[0]);

const allSlides = document.querySelectorAll('.slides img');
const totalSlides = allSlides.length;

const slideWidth = allSlides[0].clientWidth;
slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;

// Função para trocar slides com transição
function mudarSlide(n) {
  if (isAnimating) return;
  isAnimating = true;

  slideIndex += n;
  slidesContainer.style.transition = "transform 0.5s ease-in-out";
  slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

// Lida com transições falsas (voltar ao começo ou fim verdadeiro)
slidesContainer.addEventListener("transitionend", () => {
  const currentSlide = allSlides[slideIndex];

  if (currentSlide.id === 'first-clone') {
    slidesContainer.style.transition = "none";
    slideIndex = 1;
    slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  }

  if (currentSlide.id === 'last-clone') {
    slidesContainer.style.transition = "none";
    slideIndex = totalSlides - 2;
    slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  }

  isAnimating = false;
});

// Botões de navegação
function mudarSlideManual(n) {
  mudarSlide(n);
}

// Carrossel automático
setInterval(() => {
  mudarSlide(1);
}, 4000);
