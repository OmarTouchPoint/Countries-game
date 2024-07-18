import { useState, useEffect } from 'react';
import { petitionsURL } from '../assets/urlBuilder';
import { getFirstData, handleAddConceptPair, handleConceptChange, handleRemoveConceptPair, handleSubmit } from '../assets/dashboardFunctions';
import { AddIcon, SaveIcon, DeleteIcon } from './Icons';

const Dashboard = () => {
    const [pageTitle, setPageTitle] = useState('');
    const [gameInstructions, setGameInstructions] = useState('');
    const [concepts, setConcepts] = useState([{ concept1: '', concept2: '' }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        // getFirstData(petitionsURL, setPageTitle, setGameInstructions, setConcepts, setLoading, setError)
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
            <form onSubmit={(event=>handleSubmit(event, concepts, pageTitle, gameInstructions, petitionsURL, setMessage, setIsModified))}>
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
                                onChange={(e) => handleConceptChange(index, 'concept1', e.target.value, concepts, setConcepts, setIsModified)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Concepto 2"
                                value={concept.concept2}
                                onChange={(e) => handleConceptChange(index, 'concept2', e.target.value, concepts, setConcepts, setIsModified)}
                                required
                            />
                            <button type="button" className='delete-button' onClick={() => handleRemoveConceptPair(index, concepts, setConcepts, setIsModified)}>
                                <DeleteIcon/>
                            </button>
                        </div>
                    ))}
                </div>
                <span className='add-concepts-btn' onClick={(event)=>handleAddConceptPair(event,concepts, setConcepts, setIsModified)}>
                    Añadir más conceptos 
                    <AddIcon/>
                </span>
                <br /><br />

                <button className='save-button' type="submit" disabled={!isModified}>
                    <SaveIcon/>
                    Guardar
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
        </>
    );
};

export default Dashboard;
