class UserLogging implements IUserLogging {
    email = "";
    password = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

interface IUserLogging {
    email: string;
    password: string;
}