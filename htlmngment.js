//all globle variable decilaration
let allUserInfo = [];
let regForm = document.querySelector('.reg-form');
let loginForm = document.querySelector('.login-form');
let allInput = regForm.querySelectorAll("input");
let allLoginInput = loginForm.querySelectorAll("input");
let regBtn = regForm.querySelector("button");
let loginBtn = loginForm.querySelector("button");
console.log(allLoginInput);

//getting data from local storage
if(localStorage.getItem('allUserInfo') != null)
{
    allUserInfo  = JSON.parse(localStorage.getItem('allUserInfo'))
}


//resistration coding
regForm.onsubmit = (e) =>{  
    e.preventDefault()
    let chekEmail = allUserInfo.find((data) => data.email == allInput[4].value)
    if(chekEmail == undefined){
        let data = {};
        for(let el of allInput){
            let key = el.name;  
            data[key] = el.value
        }
       regBtn.innerText = 'proccessing...'
       setTimeout(() => {
        regBtn.innerText = 'resister...'
        allUserInfo.push(data);
        localStorage.setItem('allUserInfo',JSON.stringify(allUserInfo))
        swal('good job','registration success','success');
       },2000)
    }else
    {
        swal('failed','Email already exist','warning');
    }
    
}

//login coding...
loginForm.onsubmit = (e) => {
    e.preventDefault();
    if(allLoginInput[0].value != "" ){
        if(allLoginInput[1].value != ""){
           //chek email in your database
           let chekEmail = allUserInfo.find((data) => {
            return data.email == allLoginInput[0].value
           });
           if(chekEmail != undefined)
            {
              //match password
              if(chekEmail.password == allLoginInput[1].value)
                {
                   loginBtn.innerText = "please Wait..";
                   setTimeout(() => {
                    loginBtn.innerText = "Login";
                    window.location = "profile/index.html"
                    chekEmail.password = null;
                    sessionStorage.setItem("__au__",JSON.stringify(chekEmail));
                   },2000)
                  
                }
                else{
                    swal("warning","wrong password ","warning");
                }
            }
            else{
                swal("warning"," Wrong Email","warning");
            }
        }
        else{
            swal("warning","password is empty","warning");
        }
    }
    else{
        swal("warning","empty","warning");
    }
}

console.log(allUserInfo)