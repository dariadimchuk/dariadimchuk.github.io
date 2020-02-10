var id = 0;

class Actor{
    Id;
    Name;
    Description;
    AvatarImg;

    constructor(id, name, descr, avatar){
        this.Id = id;
        this.Name = name;
        this.Description = descr;
        this.AvatarImg = avatar;
    }
}

var actors = [];

function loadPage(){
    actors = JSON.parse(localStorage.getItem("actors")) || [];
    displayActors(...actors);
}

function updateLocalStorage(){
    localStorage.setItem("actors", JSON.stringify(actors)); //overwrite every time user adds new one
}

function toggleInsert(){
    var x = document.getElementById("addActor");
    document.getElementById("add-actor-error").style.display = 'none';

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
        x.reset();
    }
}

function search(){
    var input = document.getElementById("search-input").value;

    if(input.length == 0){
        displayActors(...actors);
    } else{
        input = input.toLowerCase(); //normalize
        var filteredActors = actors.filter(x => x.Name.toLowerCase().includes(input));
        displayActors(...filteredActors);
    }

}


function deleteArtist(){
    actors = actors.filter((x) => x.Id != this.value); //remove from list
    document.getElementById(this.value).remove(); //remove from html
    updateLocalStorage();
}


function addActor() {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("description").value;
    var avatar = document.getElementById("avatar").value;

    var err = document.getElementById("add-actor-error");

    if(name.length == 0 || desc.length == 0 || avatar.length == 0){
        err.innerText = "Error: Name, Description and Image url are required fields.";
        err.style.display = 'block';
        return false;
    }

    if(name.length > 40 || desc.length > 40){
        err.innerText = "Error: Name and Description must be < 40 characters.";
        err.style.display = 'block';
        return false;
    }

    //no errors detected
    err.style.display = 'none';

    var actor = new Actor(id++, name, desc, avatar);

    actors.push(actor); //updates in memory list
    updateLocalStorage();

    toggleInsert(); //hides & resets form
    displayActors(...actors); //refreshes list
}


function displayActors(...list){
    var actor_list_tbl = document.getElementById("artist-table");
    actor_list_tbl.innerHTML  = "";

    for(var i = 0; i < list.length; i++){

        var actor_div = document.createElement("div");
        actor_div.setAttribute('id', list[i].Id);
        actor_div.className += " actor-flex-1 actor-element";

        var avatarImg = document.createElement("img");
        avatarImg.className += " actor-avatar";
        avatarImg.src = list[i].AvatarImg;


        var actor_name = document.createElement("span");
        actor_name.className += " actor_name";
        actor_name.textContent = list[i].Name;
        actor_name.appendChild(document.createElement("br"));


        var actor_details = document.createElement("div");
        actor_details.className += " actor_details";

        var actor_descr = document.createElement("span");
        actor_descr.className += " desc_of_actor";
        actor_descr.textContent = list[i].Description;

        //must append in such an order
        actor_details.appendChild(actor_name);
        actor_details.appendChild(actor_descr);

        var del = document.createElement("div");
        del.className += "delete";
        var delBtn = document.createElement("button");
        delBtn.textContent += "Delete";
        delBtn.value = list[i].Id;
        delBtn.addEventListener("click", deleteArtist);
        del.appendChild(delBtn);


        actor_div.appendChild(avatarImg);
        actor_div.appendChild(actor_details);
        actor_div.appendChild(del);
        actor_list_tbl.appendChild(actor_div);


        id++;
    }
}


// TODO for later?
// function generateAvatarImg(){
//     var femUrl = "https://randomuser.me/api/portraits/med/women/";
//     var maleUrl = "https://randomuser.me/api/portraits/med/men/";
//
//     var extension = ".jpg";
//
//     var index = Math.floor(Math.random() * 99); //between 0 and 99
//
//     var chosenUrl = Math.random() < 0.5 ? femUrl : maleUrl;
//     var generatedAvatarUrl = chosenUrl + index + extension;
//
//     var avatarInput = document.getElementById("avatar");
//     avatarInput.value = generatedAvatarUrl;
//
// }

