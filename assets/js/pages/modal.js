import { postLogin } from "./index.js"; 
import { getWorks, getCategories, deleteImage, sendWork} from "../api.js";
import { DisplayGallery } from "../gallery.js";

let works = await getWorks ();
const categories = await getCategories ();  

// Display the post-login and modal window after logging in
const SavedToken = localStorage.getItem ("token");
if (SavedToken) {
    postLogin();
    DisplayModal();   
};

// Display the modadl window when clicked
function DisplayModal () {
    const modalLink = document.querySelector(".edit p");
    modalLink.addEventListener("click", function(event){
        Modalwindow ()
    });
}

// Display the first modal window
function Modalwindow () {
    const modalBackgroud = document.createElement("aside");
    modalBackgroud.id = "modal";
    document.body.appendChild(modalBackgroud);
    // close the modal window when the background of the modal window is clicked. 
    modalBackgroud.addEventListener("click", function(){
        modalClose()
    })
    
    // Create the content of the modal window
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal-wrapper"); 
    modalBackgroud.appendChild(modalDiv);
    // Don't close the modal window when the inside part of the modal window is clicked
    modalDiv.addEventListener("click", function(event){
        event.stopPropagation();
    })
    Modalcontent ()
}

// create the elements of the first modal window
function Modalcontent () {    
    const modalDiv = document.querySelector (".modal-wrapper")
    const closemodalBtn = document.createElement("button");
    closemodalBtn.classList.add("closebtn");
    closemodalBtn.innerHTML ='<i class="fa-solid fa-xmark"></i>'
    modalDiv.appendChild(closemodalBtn);
    closemodalBtn.addEventListener("click", function(){
        modalClose()
    });

    const modalTitle = document.createElement("h3");
    modalTitle.classList.add("modaltitle");
    modalTitle.innerHTML="Galerie photo";
    modalDiv.appendChild (modalTitle); 

    const modalGallery = document.createElement ("div")
    modalGallery.classList.add("modalgallery");
    modalDiv.appendChild (modalGallery); 

    DisplaymodalGallery (works);

    const Line = document.createElement ("hr");
    Line.classList.add("displayline");
    modalDiv.appendChild(Line);  

    // Display the second modal window whan clicked
    const Addphotobtn= document.createElement("button");
    Addphotobtn.classList.add("selected"); 
    Addphotobtn.classList.add("addphotobtn"); 
    Addphotobtn.innerHTML = "Ajouter une photo"; 
    modalDiv.appendChild(Addphotobtn);
    Addphotobtn.addEventListener("click", function(event){
        event.preventDefault(); 
        Modalcontent2 () 
    });
}

// Close the modal window 
function modalClose () { 
    const modalBackgroud = document.getElementById("modal");
    document.body.removeChild(modalBackgroud); 
}

// Display the projects in the first modal window
function DisplaymodalGallery () {
    const modalGallery = document.querySelector(".modalgallery"); 
    modalGallery.textContent= "";
    for (const work of works) {
        const workElement = document.createElement("figure");
        workElement.classList.add ("figure");
        const imageElement = document.createElement("img"); 
        imageElement.src = work.imageUrl; 
        const Deletebtn = document.createElement("button");
        Deletebtn.classList.add("deletebtn");
        Deletebtn.dataset.imageId = work.id; 
        Deletebtn.innerHTML ='<i class="fa-solid fa-trash-can" data-image-id="' + work.id + '" ></i>';
        modalGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(Deletebtn);

        //Remove the corresponding image from the gallery when clicked and updates the gallery display
        Deletebtn.addEventListener("click", function(event){
            event.preventDefault(); 
            const clickedElement = event.target.dataset.imageId;
            deleteImage(clickedElement);
            if (clickedElement) {
               const selectedImage = document.querySelectorAll(`[data-image-id="${clickedElement}"]`);
                selectedImage.forEach(node => {
                    const parent = node.parentNode;
                    if (parent){
                    parent.parentNode.removeChild(parent);
                    }  
                });
                works = works.filter((work) => work.id !== parseInt(clickedElement))
                DisplayGallery(works);
            };
        });
    }
}

// Create the elements of the second modal window 
function Modalcontent2 () {
    const modalDiv = document.querySelector(".modal-wrapper");
    modalDiv.innerHTML ="";

    const Arrow = document.createElement("button");
    Arrow.classList.add("arrow")
    Arrow.innerHTML ='<i class="fa-solid fa-arrow-left"></i>';
    modalDiv.appendChild(Arrow);

    GobacktoPreviousView ()

    const closemodalBtn2 = document.createElement("button");
    closemodalBtn2.classList.add("closebtn");
    closemodalBtn2.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    modalDiv.appendChild(closemodalBtn2);
    closemodalBtn2.addEventListener("click", function(){
        modalClose()
    });

    const modalTitle2 = document.createElement("h3");
    modalTitle2.classList.add("modaltitle");
    modalTitle2.innerHTML="Ajout photo";
    modalDiv.appendChild (modalTitle2); 

    const modalForm = document.createElement("form"); 
    modalForm.id = "modalForm"; 
    modalDiv.appendChild (modalForm);

    // Create the filed for uploading an image 
    const UploadContainerDiv = document.createElement("div");
    UploadContainerDiv.classList.add("uploadContainer")
    modalForm.appendChild (UploadContainerDiv);

    const imageIcon = document.createElement("i");
    imageIcon.classList.add("fa-regular", "fa-image"); 
    UploadContainerDiv.appendChild(imageIcon); 

    const Uploadfilelabel = document.createElement("label");
    Uploadfilelabel.setAttribute("for", "uploadfile");
    Uploadfilelabel.classList.add("uploadfileLabel");
    UploadContainerDiv.appendChild(Uploadfilelabel);
    
    const UploadBtn =  document.createElement("button");
    UploadBtn.classList.add("uploadbtn"); 
    UploadBtn.textContent = "+ Ajouter photo"
    UploadContainerDiv.appendChild(UploadBtn); 
    UploadBtn.addEventListener("click", function(event){
        event.preventDefault();
        Uploadfile.click();
    }); 
    
    const Uploadfile = document.createElement("input");
    Uploadfile.type = "file";
    Uploadfile.id = "uploadfile";
    Uploadfile.name = "uploadfile"; 
    Uploadfile.setAttribute("accept", ".jpg, .png");
    Uploadfile.required = true; 
    Uploadfile.style.visibility = "hidden"
    UploadContainerDiv.appendChild(Uploadfile);
    
    Uploadfile.addEventListener("change",function(event) {
        const file = Uploadfile.files[0]; 
        DisplayPreviewImage(file)
        PreviewImage.style.opacity ="1";
        UploadBtn.style.opacity = "0"; 
        const filesize = file.size
        const filesizInMB = filesize / (1024*1024); 
        if (filesizInMB > 4 ) {
            alert ("Le fichier est trop volumineux. Veuillez sélectionner un fichier de taille inférieure à 4 Mo.");
            Uploadfile.value = "";
        } 
    }); 
    
    const PreviewImage = document.createElement("img");
    PreviewImage.id = "previewImage";
    PreviewImage.src = "#";
    PreviewImage.classList.add("previewImage");
    UploadContainerDiv.appendChild(PreviewImage);

    const notice =  document.createElement('p');
    notice.classList.add("notice")
    notice.textContent = "jpg, png : 4mo max"; 
    UploadContainerDiv.appendChild(notice);

    // Div tage to create one filed to name the project and one to choose a category  
    const InfoContainerDiv = document.createElement("div");
    InfoContainerDiv.classList.add("infoContainer")
    modalForm.appendChild (InfoContainerDiv);

    // Create one filed to name the project
    const Titrelabel = document.createElement("label");
    Titrelabel.setAttribute("for", "title");
    Titrelabel.innerHTML = "Titre";
    InfoContainerDiv.appendChild(Titrelabel);

    const AddTitle = document.createElement("input");
    AddTitle.type = "text";
    AddTitle.name = "title"; 
    AddTitle.id = "title"
    InfoContainerDiv.appendChild(AddTitle); 

    // Create one filed to choose a category 
    const Categorylabel = document.createElement("label");
    Categorylabel.setAttribute("for", "category");
    Categorylabel.innerHTML = "Catégorie";
    InfoContainerDiv.appendChild(Categorylabel);

    const SelectCategory = document.createElement ("select");
    SelectCategory.name = "category"; 
    SelectCategory.id = "category"
    InfoContainerDiv.appendChild(SelectCategory); 

    const emptyOption = document.createElement ("option");
    emptyOption.value = "";
    emptyOption.textContent = "Sélectionnez une catégorie"; 
    emptyOption.dataset.categoryId = 0;
    SelectCategory.appendChild(emptyOption); 

    for (const category of categories) {
        const CategoryOption = document.createElement ("option");
        CategoryOption.value = category.name; 
        CategoryOption.textContent = category.name;
        CategoryOption.dataset.categoryId = category.id; 
        SelectCategory.appendChild(CategoryOption);
    }

    const Line = document.createElement ("hr");
    Line.classList.add("displayline");
    modalForm.appendChild(Line);  

    // Create a submit button
    const ValidBtn= document.createElement("input");
    ValidBtn.type = "submit";
    ValidBtn.value = "Valider";  
    ValidBtn.id = "validbtn";
    ValidBtn.disabled = true;
    ValidBtn.style.backgroundColor = "#a7a7a7"; 
    modalForm.appendChild(ValidBtn);

    ValidateForm (); 
    SubmitForm ();  
}

//Return to the first modal window when clicked
function GobacktoPreviousView () {
    const modalDiv = document.querySelector(".modal-wrapper");
    const Arrow = document.querySelector(".arrow");
    Arrow.addEventListener ("click", function() {
        modalDiv.innerHTML ="";
        Modalcontent(works)
    });
}

// Display a preview of the uploaded image 
function DisplayPreviewImage (file) {
    const previewImage = document.getElementById("previewImage"); 
    const reader = new FileReader();
    reader.onload = function(event){
        const imageUrl = event.target.result; 
        previewImage.src = imageUrl
    }
    reader.readAsDataURL(file); 
}  

// Validate the date entered in the form 
function ValidateForm () {
    const modalForm = document.getElementById("modalForm");
    const ValidBtn = document.getElementById("validbtn"); 

    modalForm.addEventListener("change", function(){
        const imageFile = document.querySelector("[name=uploadfile]").files[0];
        const titleValue = document.querySelector("[name=title]").value; 
        const selectedCategory = document.querySelector("option:checked").dataset.categoryId; 
        if(imageFile && titleValue !=="" && selectedCategory !== "0") {
            ValidBtn.style.backgroundColor = "#1d6154";  
            ValidBtn.disabled = false;  
        } else {
            ValidBtn.style.backgroundColor ="#a7a7a7"; 
            ValidBtn.disabled = true; 
        }
    })
}

//Submit the form when clicked, reinitialize the second modal window and updated the projects on the first modal window 
function SubmitForm () {
    const modalForm = document.getElementById("modalForm");
    const ValidBtn = document.getElementById("validbtn"); 
    
    ValidBtn.addEventListener("click", function(event){
        event.preventDefault(); 
        const imageFile = document.querySelector("[name=uploadfile]").files[0];
        const titleValue = document.querySelector("[name=title]").value; 
        const selectedCategory = document.querySelector("option:checked").dataset.categoryId;

        const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('title', titleValue);
            formData.append('category', parseInt(selectedCategory)); 

        sendWork (formData)
        .then (response => {
            return response.json()
        })
        .then (data => {
            Modalcontent2 ()
            UpdateModal()
        })        

    });

    async function UpdateModal () {
        works = await getWorks ();
        DisplayGallery(works);
    }
      
}

