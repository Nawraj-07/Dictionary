/*document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const wordHeading = document.getElementById('wordHeading');
    const definition = document.getElementById('definition');
    const spinner = document.getElementById('spinner');

    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const word = searchInput.value.trim();
        if (!word) {
            wordHeading.textContent = 'Please enter a word';
            definition.textContent = 'The search field cannot be empty.';
            return;
        }

        try {
            // Show loading spinner
            spinner.style.display = 'block';
            definition.textContent = '';
            
            const response = await fetchDictionary(word);
            
            // Update UI
            wordHeading.textContent = response.word || word;
            
            if (response.definition) {
                definition.textContent = formatDefinition(response.definition);
            } else {
                definition.textContent = 'No definition found for this word.';
            }
        } catch (error) {
            console.error('Error:', error);
            wordHeading.textContent = 'Error';
            definition.textContent = 'Failed to fetch definition. Please try again.';
        } finally {
            // Hide loading spinner
            spinner.style.display = 'none';
        }
    });

    async function fetchDictionary(word) {
        const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '573fea7784mshd478c062b630ea1p1b5d28jsneb430bd03702',
                'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    function formatDefinition(rawDefinition) {
        // Basic formatting - you can enhance this further
        return rawDefinition
            .replace(/\d+\./g, '\n$&')  // Add new line before numbered definitions
            .replace(/;/g, ';\n')       // Add new line after semicolons
            .trim();
    }
});*/

const dictionary = async (word) => {
    const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '573fea7784mshd478c062b630ea1p1b5d28jsneb430bd03702',
            'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        // Update the word display
        wordHeading.innerHTML = result.word;
        
        // Check if definition exists and is valid
        if (result.definition) {
            definition.innerHTML = result.definition;
        } else {
            definition.innerHTML = "No definition found for this word.";
        }
    } catch (error) {
        console.error(error);
        wordHeading.innerHTML = "Error";
        definition.innerHTML = "An error occurred while fetching the definition. Please try again.";
    }
}

// Get DOM elements
const searchbtn = document.getElementById("searchbtn");
const searchinput = document.getElementById("searchinput");
const wordHeading = document.getElementById("word");
const definition = document.getElementById("definition");

searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchinput.value.trim() !== "") {
        dictionary(searchinput.value.trim());
    } else {
        wordHeading.innerHTML = "Please enter a word";
        definition.innerHTML = "The search field cannot be empty.";
    }
});