const routineType = JSON.parse(localStorage.getItem("routineType")) || {};

let type = routineType.routineType;

const API_KEY = "v/EVLMSZsd3rZ6+2KhAlRQ==5S5x2WGcNu7BHf2u"; 
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

async function getExercises(type) {

    const url = `${BASE_URL}?type=${encodeURIComponent(type)}`;

    try {
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                
                'X-Api-Key': API_KEY, 
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();        
        
        console.log(data);
        const shuffled = data.sort(() => Math.random() - 0.5);
        renderExercises(shuffled.slice(0, 3));
        
    } catch (error) {
        console.error("Error connecting to API Ninjas:", error);
    }
}

function renderExercises(exercises) {
    const container = document.getElementById('routinesContainer');
    if (!container) return;

    if (!exercises || exercises.length === 0) {
        container.innerHTML = '<p>No exercises found with the provided criteria.</p>';
        return;
    }

    const listHTML = exercises.map(ex => `
        <div class="exercise-item">
            <h2>${ex.name || 'No name available'}</h2>
            <p><strong>Muscle:</strong> ${ex.muscle || 'Not specified'}</p>
            <p><strong>Difficulty:</strong> ${ex.difficulty || 'Not specified'}</p>
            <p><strong>Instructions:</strong> ${ex.instructions || 'No instructions available'}</p>
        </div>
    `).join('');

    container.innerHTML = listHTML;
}

getExercises(type);