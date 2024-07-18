const handleConceptChange = (index, field, value, concepts, setConcepts, setIsModified) => {
    const newConcepts = concepts.map((concept, i) => {
        if (i === index) {
            return { ...concept, [field]: value };
        }
        return concept;
    });
    setConcepts(newConcepts);
    setIsModified(true);
};

export{
    handleConceptChange
}
