import "./aemoji-path";
import React, { useState, useCallback } from "react";
import { emojiMap, getEmojiReg } from "aemoji";
import "./styles.css";

const transEmoji = (text) => {
    const matchArr = [];
    let startIndex = 0;
    let arr = getEmojiReg().exec(text);
    while (arr) {
        if (startIndex < arr.index) {
            matchArr.push(text.substring(startIndex, arr.index));
        }
        const raw = arr[0];
        const [className, ariaLabel] = emojiMap[raw];
        matchArr.push(
            <span
                className={`emoji emoji${className}`}
                aria-label={ariaLabel}
                role="img"
                key={arr.index}
            />
        );
        startIndex = arr.index + arr[0].length;
        arr = getEmojiReg().exec(text);
    }
    if (startIndex < text.length) {
        matchArr.push(text.substring(startIndex, text.length));
    }
    return matchArr;
};

export default function App() {
    const [preview, setPreview] = useState("");
    const handleChange = useCallback((event) => {
        const text = event.target.value;
        setPreview(transEmoji(text));
    }, []);
    return (
        <div className="App">
            <h1>aEmoji</h1>
            <textarea rows="20" cols="100" onChange={handleChange} />
            <p>{preview}</p>
        </div>
    );
}
