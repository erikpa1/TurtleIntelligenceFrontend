import ColorConstants from "@Turtle/Constants/ColorConstants";

export const TurtleTheme = {
    token: {
        colorPrimary: ColorConstants.AZURE_BLUE,
        borderRadius: 0,
    },
    components: {
        Button: {
            defaultBorderColor: ColorConstants.AZURE_BLUE,
            defaultHoverBorderColor: ColorConstants.AZURE_BLUE_HOVER
        },
        Input: {
            borderRadius: 0, // Makes inputs square
        },
        // Also apply to other input components if needed
        InputNumber: {
            borderRadius: 0,

        },
        Select: {
            borderRadius: 0,
        },
        DatePicker: {
            borderRadius: 0,
        },
        // Add other input components as needed
    },
}