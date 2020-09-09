class AuthService {

    login(userObject) {
        sessionStorage.setItem("user", JSON.stringify(userObject));
        sessionStorage.setItem("username", JSON.stringify(userObject.userName));
    }

    getUsername() {
        return JSON.parse(sessionStorage.getItem('username'));
    }


    logout() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }
}

export default new AuthService();
