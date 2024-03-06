/* eslint-disable import/no-anonymous-default-export */
export default {
    control: {
        backgroundColor: "#fff",
        fontSize: 16,
        fontWeight: 'normal',
    },

    "&multiLine": {
        control: {
            // fontFamily: "monospace",
            // minHeight: 120,
        },
        highlighter: {
            // padding: 9,
            border: "1px solid transparent",
        },
        input: {
            // padding: 9,
            // border: "1px solid silver",
            fontWeight: "normal",
            resize: "none",
            fontSize: "16px",
            width: "95%",
            outline: "none",
        },
    },

    "&singleLine": {
        display: "inline-block",
        width: "100%",

        highlighter: {
            padding: 1,
            border: "2px inset transparent",
        },
        input: {
            // padding: 1,
            border: "2px inset",
        },
    },

    suggestions: {
        list: {
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 16,
            maxHeight: '150px',
            overflow: 'auto',
            zIndex: 999999
        },
        item: {
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            "&focused": {
                backgroundColor: "#cee4e5",
                zIndex: 999999
            },
            zIndex: 999999
        },
    },
};
