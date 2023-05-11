const btn_clear_all = document.querySelector(".btn_clear");
const txt_inp_email = document.querySelector(".txt_email");
const txt_inp_pwd = document.querySelector(".txt_password");
btn_clear_all.addEventListener("click", function() {
    txt_inp_name.value = txt_inp_email.value = txt_inp_pwd.value = null;
});
document.querySelector(".chkbox").addEventListener("click", e => {
    txt_inp_pwd.type = !(document.querySelector(".chkbox").checked) ? "password" : "text";
});
const details = JSON.parse(localStorage.getItem('datas'));
let bln_account_registered = false;
let user_email_logged_in = localStorage.getItem('user_email_current_log_in');
let user_name_logged_in = localStorage.getItem('user_name_current_log_in');
if(user_email_logged_in!=null&&user_email_logged_in!="12") {
    window.location.href="./todo.html";
}
if(user_email_logged_in==null) {
    user_email_logged_in = "12";    
    localStorage.setItem('user_email_current_log_in',user_email_logged_in);
}
if(user_name_logged_in==null) {
    user_name_logged_in = "12";    
    localStorage.setItem('user_name_current_log_in',user_name_logged_in);
}
document.querySelector(".btn_login").addEventListener("click", event => {
    if(txt_inp_email.value.length!=0 && txt_inp_email.value!=null && txt_inp_email.value.length!=0 && txt_inp_email.value!=null) {
        let bln_account_registered = false;
        for(const user of details) {
            if(user.email == txt_inp_email.value) {            
                bln_account_registered = true;
                if(user.password == txt_inp_pwd.value) {
                    localStorage.setItem('user_name_current_log_in',user.username);
                    localStorage.setItem('user_email_current_log_in',user.email);
                    window.location.href="./todo.html";
                }
            }
        }
        alert(bln_account_registered?"Incorrect password entered.":"Account does not exist.");
    } else {
        alert("Field should not be empty.");
    }
});
