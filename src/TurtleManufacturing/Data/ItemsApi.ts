import {DeleteEntity, GetEntity, PostEntity, QueryEntities} from "@Turtle/Api/Turxios"
import Item from "@TurtleManufacturing/Data/Item"

// ItemsApi talks to the dedicated inventory/items backend routes
// (see inventory/items/items_api.go).
export default class ItemsApi {
    static async List(): Promise<Item[]> {
        return await QueryEntities("/api/inventory/items", {}, Item)
    }

    static async ListAsMap(): Promise<Map<string, Item>> {
        return new Map((await this.List()).map((val) => [val.uid, val]))
    }

    static async Get(uid: string): Promise<Item | null> {
        return await GetEntity("/api/inventory/item", uid, Item)
    }

    static async COU(item: Item) {
        await PostEntity("/api/inventory/item", item)
    }

    static async Delete(uid: string) {
        await DeleteEntity("/api/inventory/item", uid)
    }
}
