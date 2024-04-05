const baseURL = "http://localhost:5678/api"; 
const SavedToken = localStorage.getItem ("token");

// Get the project data using the Fetch API// 
export async function getWorks() {
    const response = await fetch (`${baseURL}/works`);
    const works = await response.json();
    return works;  
}

// Get the category data using the Fetch API// 
export async function getCategories () {
    const response = await fetch (`${baseURL}/categories`);
    const categories = await response.json();
    return categories;
}

//Remove an selected work from modale unisg the Fetch API
export function deleteImage(id) {
    return fetch (`${baseURL}/works/${id}`, {
    method: "DELETE", 
    headers: {
        Authorization: `Bearer ${SavedToken}`,
        "Content-type": "application/json", 
    } 
})
}

//Upload a new work using the Fetch API 
export function sendWork (formData) {
    return fetch (`${baseURL}/works`, {
    method: "POST", 
    headers:{
        Authorization: `Bearer ${SavedToken}`,
    },  
        body: formData, 
    })   
}
