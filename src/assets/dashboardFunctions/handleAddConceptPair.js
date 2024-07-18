const handleAddConceptPair = (event, concepts, setConcepts, setIsModified) => {
    event.preventDefault
    setConcepts([...concepts, { concept1: '', concept2: '' }]);
    setIsModified(true);
};

export{handleAddConceptPair}
