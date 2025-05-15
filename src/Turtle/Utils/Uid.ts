import turxios from "@Turtle/Api/Turxios";

export function CreateUid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

export async function fetchMongoUid(): Promise<string> {
    const mongoUid = (await turxios.get<string>("/api/tools/mongoid")).data

    console.log("Here")
    console.log(mongoUid)
    return mongoUid
}