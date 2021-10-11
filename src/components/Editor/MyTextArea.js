import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles/Editor.css'
// import '@draft-js-plugins/mention/lib/plugin.css';

import editorStyles from "./styles/editorStyles.module.css";
import mentionsStyles from './styles/mentionsStyles.module.css';


import { EditorState, convertToRaw, AtomicBlockUtils } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from "@draft-js-plugins/mention";
import createImagePlugin from '@draft-js-plugins/image';

import Entry from './features/Entry';


export default function MyTextArea({ onSearchFunc, suggestionsProp, content, setContent, setToUsersId }) {
  const [suggestions, setSuggestions] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      theme: mentionsStyles,
      mentionPrefix: '@'
    });
    const { MentionSuggestions } = mentionPlugin;

    const imagePlugin = createImagePlugin();

    const plugins = [mentionPlugin, imagePlugin];
    return { plugins, MentionSuggestions };
  }, []);


  useEffect(() => {
    if (suggestionsProp.length) {
      suggestionsProp.forEach(item => {
        item.isFriend = true;
        item.name = item.user_name;
      });

      setSuggestions(suggestionsProp);
    } else {
      setSuggestions([]);
    }
  }, [suggestionsProp])


  useEffect(() => {
    onExtractData();

    const inputDiv = document.getElementById("inputDivId");
    inputDiv.scrollTop = inputDiv.scrollHeight; // auto scroll to bottom
  }, [editorState])


  useEffect(() => {
    if(!content) setEditorState(EditorState.createEmpty());
  },[content])


  const handleChange = (editorState) => {
    setEditorState(editorState);
  }


  const handleOnSearch = (event) => {
    const trigger = event.trigger;
    const value = event.value;

    onSearchFunc(value);
  }


  const onExtractData = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const inputContent = raw.blocks[0].text;

    onSetUsersMention(raw.entityMap);
    setContent(inputContent);
  };


  const onSetUsersMention = (objEntityMap) => {
    const mentionedUsers = [];
    for (let key in objEntityMap) {
      const ent = objEntityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention.user_id.toString());
      }
    }

    setToUsersId(mentionedUsers);
    setSuggestions([]);
  };


  const insertImage = (editorState, img) => { // img is url or base64
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: img },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  return (
    <div className="textarea-editor" >
      <div className={editorStyles.editor} id="inputDivId">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleChange}
          plugins={plugins}
          placeholder="Write a comment..."
          value="acasc"
        />

        <MentionSuggestions
          open={open}
          onOpenChange={(e) => setOpen(e)}
          onSearchChange={handleOnSearch}
          suggestions={suggestions}
          entryComponent={Entry}
        />
      </div>

    </div>
  );
}
