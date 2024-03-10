import React from "react";
import { MentionsInput, Mention } from "react-mentions";
import mentionsInputStyle from "./mentionInputStyle";
import mentionStyle from "./mentionStyle";

const MentionTextArea = ({ placeholder, tagList, value, setValue, onEnter }) => {
    return (
        <MentionsInput
            placeholder={placeholder}
            a11ySuggestionsListLabel={"Suggested mentions"}
            rows={2}
            className="focus:outline-none rounded"
            // style={{
            //     resize: "none",
            //     fontSize: "16px",
            //     width: "95%",
            //     outline: "none",
            // }}
            style={mentionsInputStyle}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    onEnter(e.value)
                }
            }}
            allowSuggestionsAboveCursor={true}
            forceSuggestionsAboveCursor={true}
        >
            <Mention style={mentionStyle} data={tagList} />
        </MentionsInput>
    );
};

export default MentionTextArea;
