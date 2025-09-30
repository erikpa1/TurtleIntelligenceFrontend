export function QueryHeader(obj: string): { query: string, } {
    return {
        query: JSON.stringify(obj)
    }

}