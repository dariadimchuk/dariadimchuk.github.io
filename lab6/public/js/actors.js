
/**
 * Validates new actor
 */
function validateActor(event) {

    var name = document.getElementById("name").value;
    var desc = document.getElementById("description").value;
    var avatar = document.getElementById("avatar").value;

    var err = document.getElementById("add-actor-error");

    if (name.length == 0 || desc.length == 0 || avatar.length == 0) {
        err.innerText = "Error: name, description and Image url are required fields.";
        err.style.display = 'block';
        event.preventDefault(); //prevent submission
        return false;
    }

    if (name.length > 40 || desc.length > 40) {
        err.innerText = "Error: name and description must be < 40 characters.";
        err.style.display = 'block';
        event.preventDefault(); //prevent submission
        return false;
    }

    //no errors detected
    err.style.display = 'none';
    return true;
}



/**
 * Toggles the "Add Actor" div to be hidden/visible
 * */
function toggleInsert() {
    var x = document.getElementById("addActor");
    document.getElementById("add-actor-error").style.display = 'none';

    if (x.style.display === "none") {
        x.style.display = "block";
        generateAvatar(); //DEBUG: this is for easier actor creation
    } else {
        x.style.display = "none";
        x.reset();
    }
}


/**
 * If there are no actors in the array, will show "Empty" message.
 * Otherwise shows the actors.
 */
function showNoArtistsFoundMsg() {
    var emptyTbl = document.getElementById("empty-table");
    if (actors.length === 0) {
        emptyTbl.style.display = "flex";
    } else {
        emptyTbl.style.display = "none";
    }
}


/**
 * Auto generates a random female or male avatar image.
 * This is just for easier test purposes.
 */
function generateAvatar() {
    var femUrl = "https://randomuser.me/api/portraits/med/women/";
    var maleUrl = "https://randomuser.me/api/portraits/med/men/";

    var extension = ".jpg";

    var index = Math.floor(Math.random() * 99); //between 0 and 99

    var chosenUrl = Math.random() < 0.5 ? femUrl : maleUrl;
    var generatedAvatarUrl = chosenUrl + index + extension;

    var avatarInput = document.getElementById("avatar");
    avatarInput.value = generatedAvatarUrl;
}

