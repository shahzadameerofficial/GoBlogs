/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import styles from "./TextEditor.module.css";
import { IconButton, ToggleButtonGroup } from "@mui/joy";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const TextEditor = ({onInput, value}) => {
  const editorRef = useRef(null);

  const handleBold = () => {
    document.execCommand("bold", false, null);
  };

  const handleItalic = () => {
    document.execCommand("italic", false, null);
  };

  const handleOrderedList = () => {
    document.execCommand("insertOrderedList", false, null);
  };

  const handleUnorderedList = () => {
    document.execCommand("insertUnorderedList", false, null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    //   handleLineBreak();
    }
    handleGetHtml();
  };
  const handleGetHtml = () => {
    if (editorRef.current) {
        onInput(editorRef.current.innerHTML)
    }
  };
  useEffect(()=>{
    
  if (value && editorRef.current) {
    editorRef.current.innerHTML = value
  }
  },[value])

  return (
    <div className={styles.textEditor}>
      <div className={styles.toolbar}>
        <ToggleButtonGroup>
          <IconButton value="bold"  onClick={handleBold} sx={{borderLeft: 0, borderTop: 0, borderBottomLeftRadius: 0}}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton value="italic" onClick={handleItalic} sx={{borderTop: 0}}>
            <FormatItalicIcon />
          </IconButton>
          <IconButton value="underlined" sx={{borderTop: 0}}>
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton sx={{borderTop: 0}}>
            <FormatListNumberedIcon onClick={handleOrderedList}/>
          </IconButton>
          <IconButton sx={{borderTop: 0, borderTopRightRadius: 0}}>
            <FormatListBulletedIcon onClick={handleUnorderedList}/>
          </IconButton>
        </ToggleButtonGroup>
      </div>
      <div
        ref={editorRef}
        className={styles.editorContent}
        contentEditable
        placeholder="Type your text here..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TextEditor;
