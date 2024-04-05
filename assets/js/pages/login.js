function addEventListenerloginForm (){
    const loginForm = document.querySelector("#login form");
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        const loginData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        }; 
        const jsonString = JSON.stringify(loginData);
        
        fetch ("http://localhost:5678/api/users/login", {
            method: "POST", 
            headers: {"Content-type": "application/json"}, 
            body: jsonString
        })
        .then (response => response.json())
        .then (login => {
          if (login.token){
                localStorage.setItem("token", login.token);
                window.location.href = "./index.html"
            } else {
                console.error ("user not found");
                document.getElementById("input_error").innerHTML = "⚠ Erreur dans l’identifiant ou le mot de passe ⚠";  
            }
        })
    }); 
} 

addEventListenerloginForm ()





