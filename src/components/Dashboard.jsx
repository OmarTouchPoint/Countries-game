import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [pageTitle, setPageTitle] = useState('');
    const [gameInstructions, setGameInstructions] = useState('');
    const [concepts, setConcepts] = useState([{ concept1: '', concept2: '' }]);

    useEffect(() => {
        // Obtener datos del backend al montar el componente
        fetch('http://tu-backend-api.com/getGameData')
            .then(response => response.json())
            .then(data => {
                setPageTitle(data.title);
                setGameInstructions(data.instructions);
                setConcepts(data.concepts);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleAddConceptPair = () => {
        setConcepts([...concepts, { concept1: '', concept2: '' }]);
    };

    const handleConceptChange = (index, field, value) => {
        const newConcepts = concepts.map((concept, i) => {
            if (i === index) {
                return { ...concept, [field]: value };
            }
            return concept;
        });
        setConcepts(newConcepts);
    };

    const handleRemoveConceptPair = (index) => {
        setConcepts(concepts.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const gameData = {
            title: pageTitle,
            instructions: gameInstructions,
            concepts: concepts
        };

        fetch('http://tu-backend-api.com/saveGameData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h1>Dashboard de Juego</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título de la página:
                    <input
                        type="text"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                        required
                    />
                </label>
                <br /><br />

                <label>
                    Instrucciones del juego:
                    <br />
                    <textarea
                        value={gameInstructions}
                        onChange={(e) => setGameInstructions(e.target.value)}
                        rows="4"
                        cols="50"
                        required
                    />
                </label>
                <br /><br />

                <label>Conceptos a relacionar:</label>
                <br />
                {concepts.map((concept, index) => (
                    <div key={index} className="concept-pair">
                        <input
                            type="text"
                            placeholder="Concepto 1"
                            value={concept.concept1}
                            onChange={(e) => handleConceptChange(index, 'concept1', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Concepto 2"
                            value={concept.concept2}
                            onChange={(e) => handleConceptChange(index, 'concept2', e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => handleRemoveConceptPair(index)}>Eliminar</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddConceptPair}>Añadir más conceptos</button>
                <br /><br />

                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default Dashboard;
