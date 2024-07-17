function shuffleArray(array) {
    // Hacer una copia del array original
    const arrayCopy = array.slice();

   // Algoritmo de Fisher-Yates para mezclar el array copiado
   for (let i = arrayCopy.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Intercambia los elementos
   }
   return arrayCopy;
}
export {shuffleArray}