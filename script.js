const imagePaths = [
  'imgs/image01.jpeg',
  'imgs/image02.jpeg',
  'imgs/image03.jpeg',
  'imgs/image04.jpeg',
  'imgs/image05.jpeg',
  'imgs/image06.jpeg',
  'imgs/image07.jpeg',
  'imgs/image08.jpeg',
  'imgs/image09.jpeg',
  'imgs/image10.jpeg',
  'imgs/image11.jpeg',
];

const slideshow = document.getElementById('slideshow');

imagePaths.forEach((path, i) => {
  const img = document.createElement('img');
  img.src = path;
  if (i === 0) img.classList.add('active');
  slideshow.appendChild(img);
});

let current = 0;
const imgs = slideshow.querySelectorAll('img');

setInterval(() => {
  imgs[current].classList.remove('active');
  current = (current + 1) % imgs.length;
  imgs[current].classList.add('active');
}, 3000);

setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 90 + 'vw';
  heart.style.animationDuration = (5 + Math.random() * 5) + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 500);


function calcularDiasJuntos() {
    const dataInicio = new Date(2014, 4, 12);
    const hoje = new Date();

    const diffMs = hoje - dataInicio;

    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDias;
}

window.onload = function() {
    const dias = calcularDiasJuntos();
    const el = document.getElementById('days-together');
    el.textContent = `Estamos juntos há ${dias} dias 💖!`;
}