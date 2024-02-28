import React from "react";
import { MentionsInput, Mention } from "react-mentions";
import mentionsInputStyle from './mentionInputStyle';
import mentionStyle from './mentionStyle';

const MentionTextArea = ({placeholder, tagList, value, setValue}) => {
    return (
        <MentionsInput
            placeholder={placeholder}
            a11ySuggestionsListLabel={"Suggested mentions"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={2}
            className="focus:outline-none rounded"
            // style={{
            //     resize: "none",
            //     fontSize: "16px",
            //     width: "95%",
            //     outline: "none",
            // }}
            style={mentionsInputStyle}
        >
            <Mention style={mentionStyle} data={tagList} />
        </MentionsInput>
    );
};

export default MentionTextArea;
