const dna = document.getElementById('dna strand');
const stage = document.getElementById('stage');
const svg = document.querySelector('#stage svg');
const allDots = document.querySelectorAll('.dot');
const svgColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

let dnaVisible = false;
let moveTween; // For movement
let colorTweens = []; // Store color animations

function randomFloatDNA() {
  const stageWidth = stage.offsetWidth;
  const stageHeight = stage.offsetHeight;

  const randomX = Math.random() * (stageWidth + 800);
  const randomY = Math.random() * (stageHeight + 800);

  moveTween = gsap.to(dna, {
    x: randomX,
    y: randomY,
    duration: Math.random() * 2 + 2,
    ease: 'sine.inOut',
    onComplete: randomFloatDNA
  });
}

function startColorAnimation() {
  allDots.forEach(dot => {
    const tween = gsap.to(dot, {
      backgroundColor: svgColors[Math.floor(Math.random() * svgColors.length)],
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    colorTweens.push(tween);
  });
}

function stopAnimations() {
  if (moveTween) moveTween.kill();
  colorTweens.forEach(tween => tween.kill());
  colorTweens = [];
}

svg.addEventListener('click', () => {
  dnaVisible = !dnaVisible;
  if (dnaVisible) {
    dna.style.display = 'flex';
    randomFloatDNA();
    startColorAnimation();
  } else {
    stopAnimations();
    dna.style.display = 'none';
  }
});
