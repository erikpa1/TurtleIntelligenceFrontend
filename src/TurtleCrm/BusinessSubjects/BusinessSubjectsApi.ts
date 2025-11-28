import BusinessSubject from "@TurtleCrm/BusinessSubjects/BusinessSubject";
import Turxios from "@Turtle/Api/Turxios";


export default class BusinessSubjectsApi {

    static async List(): Promise<Array<BusinessSubject>> {
        const response = (await Turxios.get<any[]>("/api/business-subjects")).data

        return response.map((val) => {
            const tmp = new BusinessSubject()
            tmp.FromJson(val)
            return tmp
        })
    }

    static async COU(subject: BusinessSubject) {
        const form = new FormData()
        form.set("data", JSON.stringify(subject.ToJson()))
        await Turxios.post("/api/business-subject", form)
    }

    static async Delete(subjectUid: string) {
        await Turxios.delete("/api/business-subject", {
            params: {
                uid: subjectUid
            }
        })
    }


}