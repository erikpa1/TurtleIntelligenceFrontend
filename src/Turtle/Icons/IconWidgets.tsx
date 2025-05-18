import ColorConstants from "@Turtle/Constants/ColorConstants";


export default function IconWidgets({
                                        color = "#666666",
                                        width = 24,
                                        height = 24,
                                    }) {

    return (
        <svg width={width} height={height} fill="#666666">
            <path
                fill={color}
                d="M659.08-460.77 461.54-658.31l197.54-197.53 197.53 197.53-197.53 197.54Zm-506.77-66.92v-280h280v280h-280Zm375.38 375.38v-280h280v280h-280Zm-375.38 0v-280h280v280h-280Zm60-435.38h160v-160h-160v160Zm447.77 43.38 113-113-113-113-113 113 113 113Zm-72.39 332h160v-160h-160v160Zm-375.38 0h160v-160h-160v160Zm160-375.38Zm174.77-69.62Zm-174.77 285Zm215.38 0Z"/>
        </svg>
    )

}

