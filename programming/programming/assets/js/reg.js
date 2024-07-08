$(document).ready(function(){
    // Name 
    $("#name").on('keyup',function(){
        let username = $(this).val();
        let nameRE = /^[A-Za-z\s]{3,12}$/; 
        if(!nameRE.test(username)){
            $(this).css({
                "border":"2px solid red"
            }); 
            $(this).next('small').html("Please enter a valid name (3-12 characters, letters and spaces only)").css({
                "color":"red",
                "margin-top":"2px",
                "font-weight":"bold"
            });
        } else {
            $(this).css({
                "border":"2px solid green"
            }); 
            $(this).next('small').hide();
        }
    });

    // Email
    $("#email").on("keyup",function(){
        let userEmail = $(this).val();
        let emailRE = /^[\w.-]+@[a-zA-Z\d-]{2,}\.[a-zA-Z]{2,}$/; 
        if(!emailRE.test(userEmail)){
            $(this).css({
                "border":"2px solid red"
            }); 
            $(this).next('small').html("Please enter a valid email address").css({
                "color":"red",
                "margin-top":"2px",
                "font-weight":"bold"
            });
        } else {
            $(this).css({
                "border":"2px solid green"
            }); 
            $(this).next('small').hide();
        }
    });

    // Password 
    $("#password").on('keyup',function(){
        let userPassword = $(this).val();
        let passwordRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/; 
        if(!passwordRE.test(userPassword)){
            $(this).css({
                "border":"2px solid red"
            }); 
            $(this).next('small').html("Password must be 8-15 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character").css({
                "color":"red",
                "margin-top":"2px",
                "font-weight":"bold"
            });
        } else {
            $(this).css({
                "border":"2px solid green"
            }); 
            $(this).next('small').hide();
        }
    });

    // Confirm password 
    $("#confirmPassword").on('keyup',function(){
        let confirmPassword = $(this).val();
        let password = $("#password").val();
        if(confirmPassword !== password){
            $(this).css({
                "border":"2px solid red"
            }); 
            $(this).next('small').html("Passwords do not match").css({
                "color":"red",
                "margin-top":"2px",
                "font-weight":"bold"
            });
        } else {
            $(this).css({
                "border":"2px solid green"
            }); 
            $(this).next('small').hide();
        }
    });

    // Number 
    $("#number").on('keyup',function(){
        let userNumber = $(this).val();
        let numberRE = /^[\d]{11}$/;  
        if(!numberRE.test(userNumber)){
            $(this).css({
                "border":"2px solid red"
            }); 
            $(this).next('small').html("Please enter a valid 11-digit number").css({
                "color":"red",
                "margin-top":"2px",
                "font-weight":"bold"
            });
        } else {
            $(this).css({
                "border":"2px solid green"
            }); 
            $(this).next('small').hide();
        }
    });

    //  empty inputs
    function emptyInput(id){
        if($(id).val() === ""){
            $(id).css({
                "border":"2px solid red" 
            });
            $(id).next('small').html("Please fill out this field").css({
                "color":"red",
                "margin-top":"2px",
                "font-weight":"bold"
            });
        }
    }

    // Registration form submission
    $("#Register").on("click",function(){
        let username = $('#name').val();
        let nameRE = /^[A-Za-z\s]{3,12}$/;
        let userEmail = $('#email').val();
        let emailRE = /^[\w.-]+@[a-zA-Z\d-]{2,}\.[a-zA-Z]{2,}$/;
        let userPassword = $('#password').val();
        let passwordRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        let confirmPassword = $('#confirmPassword').val();
        let userNumber = $('#number').val();
        let numberRE = /^[\d]{11}$/;

        if(!(username && userEmail && userPassword && confirmPassword && userNumber)){
            emptyInput("#name");
            emptyInput("#email");
            emptyInput("#password");
            emptyInput("#confirmPassword");
            emptyInput("#number");
        } else if (!nameRE.test(username) || !emailRE.test(userEmail) || !passwordRE.test(userPassword) || confirmPassword !== userPassword || !numberRE.test(userNumber)){
            alert("Invalid data. Please follow the valid pattern.");
        } else {
            if(localStorage.getItem("details") === null){
                localStorage.setItem("details", "[]");
            }
            let previewsData = JSON.parse(localStorage.getItem('details')) || [];
            let objectData = {
                name: username,
                email: userEmail,
                password: userPassword,
                number: userNumber
            };
            previewsData.push(objectData);
            localStorage.setItem('details', JSON.stringify(previewsData));
            alert("Data has been submitted");
            location.assign("login.html");
        }
    });

    // Login form submission
    $("#logIn").on("click",function(){
        let userEmail = $('#email').val();
        let emailRE = /^[\w.-]+@[a-zA-Z\d-]{2,}\.[a-zA-Z]{2,}$/;
        let userPassword = $('#password').val();
        let passwordRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        
        if(!(userEmail && userPassword)){
            emptyInput("#email");
            emptyInput("#password");
        } else if (!emailRE.test(userEmail) || !passwordRE.test(userPassword)){
            alert("Invalid data. Please follow the valid pattern.");
        } else if(userEmail && userPassword) {
            let userDetail = JSON.parse(localStorage.getItem("details")) || [];
            if(userDetail.length === 0){
                alert("Register your account first.");
                location.assign("registeration.html");
            } else {
                let match = false;
                for(let index in userDetail){
                    if(userDetail[index].email === userEmail && userDetail[index].password === userPassword){
                        alert("Logged in successfully");
                        window.location.href = "panel.html?userId=" + index;
                        match = true;
                        break;
                    }
                }
                if(!match){
                    alert("Data does not exist");
location.assign("registeration.html")

                }
            }
        }
    });

});
let url = window.location.href;
// panel
// let url = window.location.href;
// console.log(url)
let getUrl = new URL(url);
// console.log(getUrl)
let getUserId = getUrl.searchParams.get("userId");
// console.log(getUserId)
let userData = JSON.parse(localStorage.getItem('details'));
// console.log(userData);
for (let index in userData) {
    // console.log(userData[index])
    if (index == getUserId) {
        // console.log(userData[index])
        $("#uName").html(`Dear ${userData[index].name}`)
    }
}

// console.log(userData);
for (let index in userData) {
    // console.log(index)
    if (index == getUserId) {
        // console.log(userData[index])
        $("#uName").html(`Dear ${userData[index].name}`);
        $("#name").val(userData[index].name);
        $("#email").val(userData[index].email);
        $("#password").val(userData[index].password);
        $("#number").val(userData[index].number);
    }
}
$("#update").on('click', function(){
    let uName = $("#name").val();
    let uEmail = $("#email").val();
    let uPassword = $("#password").val();
    let uNumber = $("#number").val();
    // console.log(userData);
    for(let index in userData) {
        // console.log(index)
        if(index == getUserId) {
            // console.log(userData[index])
            userData[index].name = uName;
            userData[index].email = uEmail;
            userData[index].password = uPassword;
            userData[index].number = uNumber;
        }
    }
    localStorage.setItem('details', JSON.stringify(userData));
    alert('Data update successfully');
    location.assign('panel.html?userId=' + getUserId);
});

$("#delete").click(function(){
    for(let i in userData){
        // console.log(index)
        if(i==getUserId){
            // console.log(userData[index])
            userData.splice(i, 1);
            localStorage.setItem("details", JSON.stringify(userData));
            alert("Account delete successfully");
            location.assign("registeration.html");
        }
    }
});
    $("#logout").click(function(){
        for(let i in userData){
            // console.log(index)
            if(i==getUserId){
                alert("Account logout successfully");
                location.assign("login.html");
            }
        }
});
