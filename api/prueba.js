const response = await fetch('http://127.0.0.1:5500/web/js/cursos.json');
const cursos = await response.json();

console.log(cursos);