var meny = Meny.create({
  menuElement: document.querySelector('.meny'),
  contentsElement: document.querySelector('.contents'),
  position: 'left',
  width: 200,
  overlap: 8,
  threshold: 15,
  transitionDuration: '0.75s',
  transitionEasing: 'ease',
  mouse: true,
  touch: true
});
