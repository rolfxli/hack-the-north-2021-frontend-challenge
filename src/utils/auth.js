import cookie from "js-cookie";

/*
 * handle logging in a user
 *
 * normally would only set the cookies however we validate
 * username and password since we hardcode these values
*/
export function handleLogin(username, password) {
    if (username === "admin" && password === "password") {
        cookie.set("username", username);
        cookie.set("token", "validToken");
        return true;
    }
    return false;
}

/*
 * handle logging out a user
 *
 * clear the cookies for the token and username
*/
export function handleLogout() {
  cookie.remove("token");
  cookie.remove("username");
  window.localStorage.setItem("logout", Date.now());
}
