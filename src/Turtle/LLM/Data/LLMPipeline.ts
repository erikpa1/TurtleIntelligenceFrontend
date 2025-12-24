

export default class LLMPipeline {

    steps = new Array<PipelineStep>()

    FromJson(jObj: any) {

        (jObj.steps ?? []).forEach((val) => {
            const step = new PipelineStep()
            step.FromJson(val)
            this.steps.push(step)
        })

    }

}

export class PipelineStep {
    name = ""
    duration = 0
    startedAt= 0
    endedAt = 0
    status = "start"
    dataStr = ""

    FromJson(jObj: any) {
        this.name = jObj.name
        this.duration = jObj.duration
        this.startedAt = jObj.startedAt
        this.endedAt = jObj.endedAt
        this.status = jObj.status
        this.dataStr = jObj.dataStr
    }


}