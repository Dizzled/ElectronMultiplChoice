

let submitEmail = document.getElementById('submit');
let emailAddress = document.getElementById('inputEmail');
let fullName = document.getElementById("fullName");

/*Construtor for Username and Email Address*/
function UsernameEmail(name,email) {
    this.name = name || "";
        this.email = email || "";
};

/*Store the email Address and Full Name and redirect to Test HTML*/
let loadTest = () => {

    let completeData = new UsernameEmail(fullName.value,emailAddress.value);
    let stored = window.localStorage.setItem('user', JSON.stringify(completeData));
    //console.log(JSON.parse(window.localStorage.getItem('user')));
    if(fullName.value === ''){
        alert('Please Enter Full Name');

    }else {
        window.location.href = "MOfinal.html";
    }

};

if(submitEmail) {
    submitEmail.addEventListener("click", loadTest, false)
}


