import { useState, useEffect } from 'react';
import { petitionsURL } from '../assets/urlBuilder';

const Dashboard = () => {
    const [pageTitle, setPageTitle] = useState('');
    const [gameInstructions, setGameInstructions] = useState('');
    const [concepts, setConcepts] = useState([{ concept1: '', concept2: '' }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        fetch(petitionsURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPageTitle(data.pageTitle);
                setGameInstructions(data.instructions);
                setConcepts(data.concepts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAddConceptPair = () => {
        setConcepts([...concepts, { concept1: '', concept2: '' }]);
        setIsModified(true);
    };

    const handleConceptChange = (index, field, value) => {
        const newConcepts = concepts.map((concept, i) => {
            if (i === index) {
                return { ...concept, [field]: value };
            }
            return concept;
        });
        setConcepts(newConcepts);
        setIsModified(true);
    };

    const handleRemoveConceptPair = (index) => {
        setConcepts(concepts.filter((_, i) => i !== index));
        setIsModified(true);
    };

    const handleSubmit = (event) => {
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

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <div className='content-container'>
            <h1 className='game-instructions'>Dashboard de Juego</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título de la página:
                </label>
                    <br />
                    <br />
                    <input
                        type="text"
                        value={pageTitle}
                        onChange={(e) => { setPageTitle(e.target.value); setIsModified(true); }}
                        required
                    />
                <br /><br />

                <label>
                    Instrucciones del juego:
                    <br /> <br />
                    <textarea
                        value={gameInstructions}
                        onChange={(e) => { setGameInstructions(e.target.value); setIsModified(true); }}
                        rows="4"
                        cols="50"
                        required
                    />
                </label>
                <br /><br />

                <label>Conceptos a relacionar:</label>
                <br />
                <div className="concept-pair-container">
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
                            <button type="button" className='delete-button' onClick={() => handleRemoveConceptPair(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <span className='add-concepts-btn' onClick={handleAddConceptPair}>
                    Añadir más conceptos 
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </span>
                <br /><br />

                <button className='save-button' type="submit" disabled={!isModified}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy2-fill" viewBox="0 0 16 16">
                        <path d="M12 2h-2v3h2z"/>
                        <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"/>
                    </svg>
                    Guardar
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
        </>
    );
};

export default Dashboard;
