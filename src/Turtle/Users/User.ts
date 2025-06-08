export class User {
    uid = ""
    name = ""
    surname = ""
    email = ""
    type = 0
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