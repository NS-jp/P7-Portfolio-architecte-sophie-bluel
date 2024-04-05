import { getWorks, getCategories} from "../api.js";
import { DisplayGallery } from "../gallery.js";
import { DisplayFilters,AddListenerToFilters } from "../filters.js"; 

const works = await getWorks ();
const categories = await getCategories ();  

DisplayGallery(works) // Display the projects on the page 
DisplayFilters(categories) // Display the filters on the pré-login page 
AddListenerToFilters (works)

// Display the post-login page// 
export function postLogin () { 
    const LoginLink = document.querySelector(".log");
    LoginLink.innerText = "logout"; 
    LoginLink.addEventListener("click", function(){
        localStorage.removeItem("token");
        window.location.href = "./index.html"
    }); 
    
    const ContainerDiv = document.getElementById ("container");
    const BlackbandDiv = document.createElement("div");
    ContainerDiv.insertAdjacentElement ("beforebegin", BlackbandDiv); 
    BlackbandDiv.innerHTML = `<i class="fa-regular fa-pen-to-square" style="color:white;"></i>
    <p>Mode édition</p>`;
    BlackbandDiv.id = "Blackband";

    const filters = document.querySelector(".filters"); 
    filters.style.display = "none";
    
    const Editzone = document.querySelector (".modify"); 
    const EditdivElement = document.createElement ("div");
    Editzone.appendChild(EditdivElement);
    EditdivElement.classList.add("edit"); 
    const BtnEdit = document.querySelector (".edit");
    BtnEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>`; 
}


