export default class Container {

    name = ""
    uid = ""
    dimenstion = [1, 1, 1]


    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,

        }
    }

    FromJson(): any {

    }

}