var actors = [
    { Name: "Bella Donna", Description: "test descr", Img: "https://randomuser.me/api/portraits/med/women/1.jpg"},
    { Name: "Ben Jer", Description: "test2", Img: "https://randomuser.me/api/portraits/med/men/1.jpg"}
];

function toggleInsert(){
    var x = document.getElementById("addActor");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
        x.reset();
    }
}


function addActor()
{
    var name = document.getElementById("name").value;
    var desc = document.getElementById("description").value;
    var avatar = document.getElementById("avatar").value;

    var actor = {
      Name: name,
      Description: desc,
      Img: avatar
    };

    console.log(actor);
    actors.push(actor);

    toggleInsert(); //hides & resets form
    displayActors();
}


function displayActors(){
    var artistTable = document.getElementById("artist-table");

    for(var i = 0; i < actors.length; i++){
        if(!document.getElementById(i)) { //only create element if it is not already in table
            var div = document.createElement("div");
            div.setAttribute('id', i);
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
            del.appendChild(delBtn);


            div.appendChild(avatar);
            div.appendChild(info);



            div.appendChild(del);

            artistTable.appendChild(div);
        }

    }
}

