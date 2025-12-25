export class StaticMemoryData {


    memoryText = ""

    FromJson(jObj: any) {
        this.memoryText = jObj.memoryText ?? this.memoryText
    }

    ToJson(): any {
        return {
            memoryText: this.memoryText,
        }
    }


}