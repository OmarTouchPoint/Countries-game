const getFirstData = (petitionsURL, setPageTitle, setGameInstructions, setConcepts, setLoading, setError)=>{

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
}

export{getFirstData}