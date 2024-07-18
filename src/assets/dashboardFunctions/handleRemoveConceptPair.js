const handleRemoveConceptPair = (index,concepts, setConcepts, setIsModified ) => {
    setConcepts(concepts.filter((_, i) => i !== index));
    setIsModified(true);
};

export{
    handleRemoveConceptPair
}
