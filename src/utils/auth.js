import cookie from "js-cookie";

/*
 * handle logging in a user
 *
 * normally would only set the cookies however we validate
 * username and password since we hardcode these values
*/
export function handleLogin(username, password) {
    if (username == "admin" && password == "demoPassword") {
        cookie.set("username", username);
        cookie.set("token", "validToken");
        return true;
    }
    return false;
}

export function handleLogout() {
  cookie.remove("token");
  cookie.remove("username");
  window.localStorage.setItem("logout", Date.now());
}


// export function validate_token(token, userid) {

//     if (token == null) {
//         return false
//     }

//     return axios({
//         method: 'get',
//         url: `${process.env.REACT_APP_BASEURL}users/get_user_by_token?token=${token}`
//     })
//     .then(response => {
//         const data = response.data;
//         console.log("USERID")
//         console.log(userid)
//         console.log(data.userid)
//         if (parseInt(data.userid) === parseInt(userid)) {
//             console.log("its true")
//             return true
//         }

//         return false;
//     })
// }