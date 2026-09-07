export type FileKind = "text" | "image" | "pdf" | "video" | "audio" | "binary"

const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg", "ico"])
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "ogv", "mov", "avi", "mkv"])
const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "ogg", "m4a", "flac", "aac"])
const TEXT_EXTENSIONS = new Set([
    "", "txt", "md", "json", "js", "jsx", "ts", "tsx", "css", "scss", "less",
    "html", "htm", "py", "go", "java", "c", "cpp", "h", "hpp", "cs", "sh",
    "yaml", "yml", "xml", "csv", "log", "sql", "env", "ini", "conf", "toml",
    "rs", "rb", "php", "gitignore", "dockerfile", "gradle", "properties"
])

export function getFileKind(extension: string): FileKind {
    const ext = extension.toLowerCase()
    if (ext === "pdf") {
        return "pdf"
    }
    if (IMAGE_EXTENSIONS.has(ext)) {
        return "image"
    }
    if (VIDEO_EXTENSIONS.has(ext)) {
        return "video"
    }
    if (AUDIO_EXTENSIONS.has(ext)) {
        return "audio"
    }
    if (TEXT_EXTENSIONS.has(ext)) {
        return "text"
    }
    return "binary"
}
