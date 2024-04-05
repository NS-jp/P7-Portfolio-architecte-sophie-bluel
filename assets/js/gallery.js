// Create the HTML elements to display the projects on the homepage  
export function DisplayGallery(works){
    const sectionFiches = document.querySelector(".gallery");
    sectionFiches.textContent = "";
    for (const work of works) {
        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img"); 
        imageElement.src = work.imageUrl;
        const figcaptionElement = document.createElement("figcaption")
        figcaptionElement.innerText = work.title

        sectionFiches.appendChild(workElement);
        workElement.appendChild (imageElement); 
        workElement.appendChild (figcaptionElement);
    } 
}
