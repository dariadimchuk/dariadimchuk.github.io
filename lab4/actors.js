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
}


function getActorsList(){
    console.log(actors);
    return actors;
}


function displayActors(){
    document.getElementById("artist-table");

    for(var i = 0; i < actors.length; i++){
        var elem = document.createElement("div");
        elem.setAttribute('id', array[i]);
        document.body.appendchild(elem);
    }
}

