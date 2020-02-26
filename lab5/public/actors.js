class Actor{
    id;
    name;
    description;
    avatarImg;

    constructor(id, name, descr, avatar){
        this.id = id;
        this.name = name;
        this.description = descr;
        this.avatarImg = avatar;
    }
}

var actors = [];


async function loadActorsFromNode(){
    const response = await fetch('/getall');
    const data = await response.json();
    console.log(data);

    actors = data;
}

async function loadPage(){
	await loadActorsFromNode();
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
        generateAvatarImg();
    } else {
        x.style.display = "none";
        x.reset();
    }
}

function showNoArtistsFoundMsg(...list){
    var emptyTbl = document.getElementById("empty-table");
    if(list.length === 0){
        emptyTbl.style.display = "flex";
    } else{
        emptyTbl.style.display = "none";
    }
}

function search(){
    var input = document.getElementById("search-input").value;

    if(input.length == 0){
        displayActors(...actors);
    } else{
        input = input.toLowerCase(); //normalize
        var filteredActors = actors.filter(x => x.name.toLowerCase().includes(input));
        displayActors(...filteredActors);
    }

}


function deleteArtist(){
    actors = actors.filter((x) => x.id != this.value); //remove from list
    document.getElementById(this.value).remove(); //remove from html
    updateLocalStorage();

    showNoArtistsFoundMsg(...actors);
}


async function addActor() {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("description").value;
    var avatar = document.getElementById("avatar").value;

    var err = document.getElementById("add-actor-error");

    if(name.length == 0 || desc.length == 0 || avatar.length == 0){
        err.innerText = "Error: name, description and Image url are required fields.";
        err.style.display = 'block';
        return false;
    }

    if(name.length > 40 || desc.length > 40){
        err.innerText = "Error: name and description must be < 40 characters.";
        err.style.display = 'block';
        return false;
    }

    //no errors detected
    err.style.display = 'none';

    var params = JSON.stringify({ name: name, desc: desc, url: avatar });

    await fetch("/add", {
        method: "POST",
        body: params,
        headers: { 'Content-Type': 'application/json' }
    });

    await loadActorsFromNode();

    toggleInsert(); //hides & resets form
    displayActors(...actors); //refreshes list
}


function displayActors(...list){
    var actor_list_tbl = document.getElementById("artist-table");

    while(actor_list_tbl.hasChildNodes()){
        actor_list_tbl.removeChild(actor_list_tbl.firstChild);
    }

    for(var i = 0; i < list.length; i++){

        var actor_div = document.createElement("div");
        actor_div.setAttribute('id', list[i].id);
        actor_div.className += " actor-flex-1 actor-element";

        var avatarImg = document.createElement("img");
        avatarImg.className += " actor-avatar";
        avatarImg.src = list[i].avatarImg;


        var actor_name = document.createElement("span");
        actor_name.className += " actor_name";
        actor_name.textContent = list[i].name;
        actor_name.appendChild(document.createElement("br"));


        var actor_details = document.createElement("div");
        actor_details.className += " actor_details";

        var actor_descr = document.createElement("span");
        actor_descr.className += " desc_of_actor";
        actor_descr.textContent = list[i].description;

        //must append in such an order
        actor_details.appendChild(actor_name);
        actor_details.appendChild(actor_descr);

        var del = document.createElement("div");
        del.className += "delete";
        var delBtn = document.createElement("button");
        delBtn.textContent += "Delete";
        delBtn.value = list[i].id;
        delBtn.addEventListener("click", deleteArtist);
        del.appendChild(delBtn);

        actor_div.appendChild(avatarImg);
        actor_div.appendChild(actor_details);
        actor_div.appendChild(del);
        actor_list_tbl.appendChild(actor_div);
    }

    showNoArtistsFoundMsg(...list);
}


 function generateAvatarImg(){
     var femUrl = "https://randomuser.me/api/portraits/med/women/";
     var maleUrl = "https://randomuser.me/api/portraits/med/men/";

     var extension = ".jpg";

     var index = Math.floor(Math.random() * 99); //between 0 and 99

     var chosenUrl = Math.random() < 0.5 ? femUrl : maleUrl;
     var generatedAvatarUrl = chosenUrl + index + extension;

     var avatarInput = document.getElementById("avatar");
     avatarInput.value = generatedAvatarUrl;
 }

