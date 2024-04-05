import { DisplayGallery } from "./gallery.js";

//Create the HTML elements to add filters on the page
export function DisplayFilters(categories) {    
    const sectionPortfolio = document.getElementById("portfolio");
    const sectionFiches = document.querySelector(".gallery");
    const FiltersDiv = document.createElement("div");
    FiltersDiv.classList.add("filters")
    const AddBtnTous = document.createElement("button");
    AddBtnTous.textContent = "Tous"; 
    AddBtnTous.dataset.categoryId = 0;
    AddBtnTous.classList.add("selected"); 
    sectionPortfolio.insertBefore(FiltersDiv, sectionFiches);
    FiltersDiv.appendChild(AddBtnTous);

    for (const category of categories) {
        const AddBtnCategory = document.createElement("button");
        AddBtnCategory.textContent = category.name;
        AddBtnCategory.dataset.categoryId = category.id; 
        FiltersDiv.appendChild(AddBtnCategory); 
    }
}

// filter the selected category 
export function AddListenerToFilters (works) {
    const Btn_filters = document.querySelectorAll(".filters button")
    for (let i = 0; i < Btn_filters.length; i++){
        Btn_filters[i].addEventListener("click", function(event){
            const categoryId = event.target.dataset.categoryId;
            if (categoryId === "0") {
                DisplayGallery(works);
            } else {
                const filterWorks = works.filter((work) => work.categoryId == categoryId); 
                document.querySelector(".gallery").innerHTML ="";
                DisplayGallery(filterWorks);  
            };
            const SelectedFilter = Btn_filters[i]; 
            SelectedFilter.classList.add ("selected");
            const BtnArray = Array.prototype.slice.call(Btn_filters); 
            const NonselectedFilter = BtnArray.filter((BtnArray) => BtnArray !== Btn_filters[i]);  
            NonselectedFilter.forEach((Btn_filters) => Btn_filters.classList.remove("selected"));
        }); 
    }; 
}; 

