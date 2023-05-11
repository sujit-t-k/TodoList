const username = document.querySelector(".txt_username"),
email = document.querySelector(".txt_email"),
password = document.querySelector(".txt_password"),
cpwd = document.querySelector(".txt_password_conform");
lbl_pwd_indicator = document.querySelector(".pwd_ind");
function isAlphaOrSpace(c) {
    return typeof c === 'string' && c.length == 1 && ((c >= 'a' && c <= 'z') || (c>='A' && c <= 'Z') || c == ' ' || c=='' || c==null);
}
username.addEventListener("input", function() {
    let txt = username.value;
    if(!isAlphaOrSpace(txt.charAt(txt.length-1))) {
        username.value = txt.substr(0,txt.length-1);     
    }
    if(username.value.length > 22) {
        username.value = txt.substr(0,22);
        alert("Maximum length reached for \"Username\" field.");
    }
});
function containsSpecialSymbolAvailable(str_given) {
    var spl_symbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return spl_symbols.test(str_given);
}
function containsDigit(str_given) {
    return /\d/.test(str_given);
}
function containsUpperCase(str_given) {
    return /[A-Z]/.test(str_given);
}
function containsLowerCase(str_given) {
    return /[a-z]/.test(str_given);
}
function containsAtSymbol(str_given) {
    return /[@]/.test(str_given);
}
function containsThreeSameCharactersConsecutively(str_given) {
    for(var pos = 0; pos<str_given.length-2;pos++) {
        if(str_given.charAt(pos) == str_given.charAt(pos+1) && str_given.charAt(pos) == str_given.charAt(pos+2)) {
        return true;
        }
    }
    return false;
}
function getPasswordStrength(str_pwd) {
    var pwd_strength_magnitude = 0;
    if (str_pwd.length>7) pwd_strength_magnitude+=2;
    else return "Weak";
    if (containsLowerCase(str_pwd)) pwd_strength_magnitude++;
    if (containsUpperCase(str_pwd)) pwd_strength_magnitude++;
    if (containsDigit(str_pwd)) pwd_strength_magnitude++;
    if (containsSpecialSymbolAvailable(str_pwd)) pwd_strength_magnitude+=2;
    if (!containsThreeSameCharactersConsecutively(str_pwd)) pwd_strength_magnitude+=2;
    if (pwd_strength_magnitude<4) return "Weak";
    else if(pwd_strength_magnitude<7) return "Medium";
    else if (pwd_strength_magnitude<8) return "Strong";
    return "Very Strong";
}
function update_pwd_strength_indicator_label() {
    if(password.value.length == 0) {
        lbl_pwd_indicator.style.visibility = "hidden";
    } else {
        lbl_pwd_indicator.style.visibility = "visible";
    }
    switch(getPasswordStrength(password.value)) {
        case "Weak" :
            lbl_pwd_indicator.style.color = "#bf2608";
            lbl_pwd_indicator.style.borderColor = "#bf2608";
            lbl_pwd_indicator.style.backgroundColor = "#fa9d9d";
            lbl_pwd_indicator.textContent = "Weak";
        break;
        case "Medium" :
            lbl_pwd_indicator.style.color = "#bd8908";
            lbl_pwd_indicator.style.borderColor = "#bd8908";
            lbl_pwd_indicator.style.backgroundColor = "#ffdc85";
            lbl_pwd_indicator.textContent = "Medium";
        return;
        case "Strong" :
            lbl_pwd_indicator.style.color = "#610696";
            lbl_pwd_indicator.style.borderColor = "#610696";
            lbl_pwd_indicator.style.backgroundColor = "#d285ff";
            lbl_pwd_indicator.textContent = "Strong";
        break;
        case "Very Strong" :
            lbl_pwd_indicator.style.color = "darkgreen";
            lbl_pwd_indicator.style.borderColor = "darkgreen";
            lbl_pwd_indicator.style.backgroundColor = "#95fa66";
            lbl_pwd_indicator.textContent = "Very Strong";
        return;
    }
}
update_pwd_strength_indicator_label();
password.addEventListener("input", e=> {
    isPasswordSame();
    update_pwd_strength_indicator_label();
});
function isPasswordSame() {
    if(cpwd.value.length>0) {
        cpwd.style.borderColor = (cpwd.value==password.value) ? "green" : "red";
    } else {
        cpwd.style.borderColor = "#999999";
    }
}
cpwd.addEventListener("input", e => isPasswordSame());
document.querySelector(".btn_clear").addEventListener("click", function() {    
    cpwd.style.borderColor = "#999999";
    username.value = email.value = password.value = cpwd.value = null;
    update_pwd_strength_indicator_label();
});
document.querySelector(".btn_signup").addEventListener("click", function() {    
    update_pwd_strength_indicator_label();    
    if(username.value.length<4) {
        alert("Username should be atleast of four characters.");
        return;
    }    
    if(!(containsAtSymbol(email.value))) {
        alert("Enter a valid email.");
        return;
    }    
    if(cpwd.value!=password.value) {
        alert("Password mismatch in confirm password field.");
        return;
    }
    if(lbl_pwd_indicator.textContent == "Weak") {
        alert("The password is too weak. Please change the password and try again.");
        return;
    }
    let details = JSON.parse(localStorage.getItem('datas'));
    const info = new Details(username.value,email.value,password.value); 
    if(details == null) {
        details=new Array();
    } else {
        for (const detail of details) {
            if(detail.email==email.value) {
                alert("Already registered in the specified e-mail. Sign up failed. Try using different e-mail to sign-up.");
                return;
            }
        }
    }
    details.push(info);
    localStorage.setItem('datas',JSON.stringify(details));
    alert("Account created succeessfully!");
    cpwd.style.borderColor = "#999999";
    username.value = email.value = password.value = cpwd.value = null;
    update_pwd_strength_indicator_label();
});
class Details {
    constructor(username,email,password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}