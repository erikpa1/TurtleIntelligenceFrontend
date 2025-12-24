export class User {
    uid = ""
    firstname = ""
    surname = ""
    email = ""
    type = 0

    ToJson(): any {
        return {
            uid: this.uid,
            firstname: this.firstname,
            surname: this.surname,
            email: this.email,
            type: this.type,
        }
    }

    FromJson(jObj: any) {
        this.uid = jObj.uid ?? ""
        this.firstname = jObj.firstname ?? ""
        this.surname = jObj.surname ?? ""
        this.email = jObj.email ?? ""
        this.type = jObj.type ?? 0
    }
}


interface UserType {
    lang: string
    value: number
}

export function ListUserTypes(): Array<UserType> {
    return [
        {lang: "user", value: 0},
        {lang: "editor", value: 1},
        {lang: "admin", value: 2},
        {lang: "superadmin", value: 3},
    ]

}