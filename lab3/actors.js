var id = 0;

var actors = [
    { Id: id++, Name: "Bella Donna", Description: "Singer", Img: "https://randomuser.me/api/portraits/med/women/1.jpg"},
    { Id: id++, Name: "Ben Jaskier", Description: "Award Winner", Img: "https://randomuser.me/api/portraits/med/men/1.jpg"}
];

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


function deleteArtist(){
    actors = actors.filter((x) => x.Id != this.value); //remove from list
    document.getElementById(this.value).remove(); //remove from html
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

    var actor = {
        Id: id++,
        Name: name,
        Description: desc,
        Img: avatar
    };

    actors.push(actor); //updates in memory list
    toggleInsert(); //hides & resets form
    displayActors(); //refreshes list
}


function displayActors(){
    var artistTable = document.getElementById("artist-table");


    for(var i = 0; i < actors.length; i++){
        if(!document.getElementById(actors[i].Id)) { //only create element if it is not already in table
            var div = document.createElement("div")
            div.setAttribute('id', actors[i].Id);
            div.className += " inner-flex artist-row";

            var avatar = document.createElement("img");
            avatar.className += " artist-img";
            avatar.src = actors[i].Img;

            var info = document.createElement("div");
            info.className += " details";

            var name = document.createElement("span");
            name.className += " actorname";
            name.textContent = actors[i].Name;
            name.appendChild(document.createElement("br"));

            var descr = document.createElement("span");
            descr.className += " actordescription";
            descr.textContent = actors[i].Description;

            info.appendChild(name);
            info.appendChild(descr);


            var del = document.createElement("div");
            del.className += "delete";
            var delBtn = document.createElement("button");
            delBtn.textContent += "Delete";
            delBtn.value = actors[i].Id;
            delBtn.addEventListener("click", deleteArtist);

            del.appendChild(delBtn);


            div.appendChild(avatar);
            div.appendChild(info);



            div.appendChild(del);

            artistTable.appendChild(div);
        }
        id++;
    }
}

