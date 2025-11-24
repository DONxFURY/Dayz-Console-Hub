
/* Slider: autoplay + arrows */
document.addEventListener('DOMContentLoaded', function(){
  const track = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.querySelector('.arrow.left');
  const next = document.querySelector('.arrow.right');
  let index = 0, autoplay = true, interval = 4000, timer;

  function show(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index*100}%)`;
  }
  function nextSlide(){ show(index+1) }
  function prevSlide(){ show(index-1) }

  next.addEventListener('click', function(){ nextSlide(); resetTimer(); });
  prev.addEventListener('click', function(){ prevSlide(); resetTimer(); });

  function startTimer(){ timer = setInterval(nextSlide, interval); }
  function stopTimer(){ clearInterval(timer); }
  function resetTimer(){ stopTimer(); startTimer(); }

  // hover stops autoplay on desktop
  document.querySelector('.slider').addEventListener('mouseenter', stopTimer);
  document.querySelector('.slider').addEventListener('mouseleave', startTimer);

  startTimer();
});
