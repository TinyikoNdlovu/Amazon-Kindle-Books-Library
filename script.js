// Class of a User
class User{
    constructor(fullnames, email, phone, imagepic, pword){
        this.fullnames = fullnames;
        this.email = email;
        this.phone = phone;
        this.imagepic = imagepic;
        this.pword = pword;
    }

    getHtml(){
        let text = "<div class 'user'>";
        text = text + "<img src='" + this.imagepicv +"' />";
        text = text + "<p> Email: " + this.email + "</p></div>";
        return text;
    }
}

//Class for the App
class storeData {
    constructor(){
        this.user = new User("", "", "", "", "");
        this.users = [];
        this.usersState = "offline";
    }

    //Registratio form function
    registerUser(){
        //Get information from the Inputs
        console.log("New user, Register here")
        let fullnames = document.forms["registerform"]["namesurname"].value;
        let email = document.forms["registerform"]["email"].value;
        let phone = document.forms["registerform"]["phonenumber"].value;
        let imagepic = document.forms["registerform"]["imageinput"].value;
        let pword = document.forms["registerform"]["input-pass"].value;
        let pword2 = document.forms["registerform"]["confirm"].value;


        //Check if all Inputs are Filled
        let flag = false;
        if (fullnames === "" || email === "" || phone === "" || pword === "" || pword2 === ""){
            flag = true;
            console.log("empty inputs, fields are required.");
        }

        if (flag === false){
            //Check if User does not Exist
            let flag2 = false;
            for(let x = 0; x <this.users.length; x++) {
                if (email == this.users[x].email || phone === this.users[x].phone) {
                   //the user exist
                   flag2 = true;
                   break; 
                }
            }

            if(flag2 === false) {
                //check if password match
                if (pword === pword2) {
                    //register user
                    let newUser = new User(fullnames, email, phone, imagepic, pword);
                    this.users.push(newUser);
                    let text = fullnames + " successfully registered! Please login";
                    alert(text);
                    openLogin();
                } else {
                    alert("Password does not match");
                }
            } else {
                alert("User already exist");
            }
        } else {
            alert("Please fill in all the required inputs");
        }
    }

    //Login form function
    loginUser() {
        //get information from inputs
        let uemail = document.forms["loginform"]["email"].value;
        let pword = document.forms["loginform"]["input-pass"].value;
    
        //Check if inputs are empty
        if(uemail === "" || pword === "") {
            alert("Inputs are empty! please fill in");
        } else {
            //check if user is registered
            let flag = false;
            for(let x = 0; x < this.users.length; x++) {
                if (uemail === this.users[x].email || uemail === this.users[x].phone) {
                    flag = true;
                    this.user = this.users[x];
                    break;
                }
            }
    
            //if user is registered
            if (flag === true) {
                //check if password match
                if (pword === this.user.pword) {
                    //login
                    this.loginState = "online";
                    displayUser();
                    openHomePage();
                } else {
                    alert("Incorrect login");
                }
            } else {
                alert("User not yet registered, please register first!");
            }
        }
    }

}

 /*============ SHOW / HIDDEN INPUT ============*/
 const showHiddenInput = (inputOverlay, inputPass, inputIcon) => {
    const overlay = document.getElementById(inputOverlay),
    input = document.getElementById(inputPass),
    iconEye = document.getElementById(inputIcon)

    iconEye.addEventListener('click', () =>{
        //Change password to text
        if(input.type === 'password'){
            //Switch to text
            input.type = 'text'

            //Change icon
            iconEye.classList.add(bx-show)
        }else{
            //Change to password
            input.type = 'password'

            //Remove icon
            iconEye.classList.remove('bx-show')
        }

        //Toggle the overlay
        overlay.classList.toggle('overlay-content')
    })

}

showHiddenInput('input-overlay','input-pass','input-icon')
 

//function to register
function registerUser() {
    app.registerUser();
}

//function to login user
function loginUser() {
    app.loginUser();
}

//function to open register window
function openRegister() {
    document.forms["loginform"].style.display = "none";
    document.forms["registerform"].style.display = "grid";
    document.querySelector("#homepage").style.display = "none";
    document.querySelector("#signuplogin").style.display = "grid";
    document.querySelector("#loginsignup").style.display = "none";
}

//function to open login window
function openLogin() {
    document.forms["loginform"].style.display = "grid";
    document.forms["registerform"].style.display = "none";
    document.querySelector("#homepage").style.display = "none";
    document.querySelector("#signuplogin").style.display = "none";
    document.querySelector("#loginsignup").style.display = "grid";
}

//function to open Homepage/Langingpage window
function openHomePage() {
    document.forms["loginform"].style.display = "none";
    document.forms["registerform"].style.display = "none";
    document.querySelector("#homepage").style.display = "grid";
    document.querySelector("#signuplogin").style.display = "none";
    document.querySelector("#loginsignup").style.display = "none";
}

//function to display user on the Homepage
function displayUser() {
    let userProfile = document.querySelector("#userProfile");
    userProfile.innerHTML = "<h3></h3>";
    for (let x = 0; x< userProfile.children.length; x++) {
        userProfile.removeChild(userProfile.children[x]);
    }

    let text = "";
    text = text + "<img src='Images/munhu.jpg' alt='Profile Picture of " + app.user.fullnames + "' />" ;
    text = text + "<p>Welcome back: " + app.user.email + "</p>";

    userProfile.innerHTML = text;
}

//////the script here/////////////

let app = new storeData();
openLogin();