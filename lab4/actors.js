var id = 0;

var actors = [
    {
        Id: id++,
        Name: "Bella Donna",
        Description: "Singer",
        AvatarImg: "https://randomuser.me/api/portraits/med/women/1.jpg"
    },
    {
        Id: id++,
        Name: "Ben Jaskier",
        Description: "Award Winner",
        AvatarImg: "https://randomuser.me/api/portraits/med/men/1.jpg"
    }
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
        AvatarImg: avatar
    };

    actors.push(actor); //updates in memory list
    toggleInsert(); //hides & resets form
    displayActors(); //refreshes list
}


function displayActors(){
    var actor_list_tbl = document.getElementById("artist-table");

    for(var i = 0; i < actors.length; i++){
        if(document.getElementById(actors[i].Id)){ //skip if duplicate
            continue;
        }

        var actor_div = document.createElement("div");
        actor_div.setAttribute('id', actors[i].Id);
        actor_div.className += " actor-flex-1 actor-element";

        var avatarImg = document.createElement("img");
        avatarImg.className += " actor-avatar";
        avatarImg.src = actors[i].AvatarImg;


        var actor_name = document.createElement("span");
        actor_name.className += " actor_name";
        actor_name.textContent = actors[i].Name;
        actor_name.appendChild(document.createElement("br"));


        var actor_details = document.createElement("div");
        actor_details.className += " actor_details";

        var actor_descr = document.createElement("span");
        actor_descr.className += " desc_of_actor";
        actor_descr.textContent = actors[i].Description;

        //must append in such an order
        actor_details.appendChild(actor_name);
        actor_details.appendChild(actor_descr);

        var del = document.createElement("div");
        del.className += "delete";
        var delBtn = document.createElement("button");
        delBtn.textContent += "Delete";
        delBtn.value = actors[i].Id;
        delBtn.addEventListener("click", deleteArtist);
        del.appendChild(delBtn);


        actor_div.appendChild(avatarImg);
        actor_div.appendChild(actor_details);
        actor_div.appendChild(del);
        actor_list_tbl.appendChild(actor_div);


        id++;
    }
}

