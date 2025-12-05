export interface COUView {
    onBeforeUpdate?: () => void
    onAfterUpdate?: () => void
}

export interface COUEntityView<T> {
    entity: T
    onBeforeUpdate?: () => void
    onAfterUpdate?: () => void
}

