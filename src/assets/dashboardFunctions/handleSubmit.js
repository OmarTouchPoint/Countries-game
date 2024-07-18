const handleSubmit = (event, concepts, pageTitle, gameInstructions, petitionsURL, setMessage, setIsModified
) => {
    event.preventDefault();

    const gameData = {
        pageTitle,
        instructions: gameInstructions,
        concepts
    };

    fetch(petitionsURL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Éxito:', data);
        setMessage('¡Datos guardados con éxito!');
        setIsModified(false);  // Deshabilitar el botón después de guardar
        setTimeout(() => setMessage(''), 3000); // Limpiar el mensaje después de 3 segundos
    })
    .catch((error) => {
        console.error('Error:', error);
        setMessage('Hubo un error al guardar los datos.');
        setTimeout(() => setMessage(''), 3000); // Limpiar el mensaje después de 3 segundos
    });
};

export{
    handleSubmit
}