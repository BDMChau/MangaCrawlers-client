import React, { useEffect, useMemo, useRef, useState } from 'react'

import './styles/Editor.css'
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';

import 'draft-js/dist/Draft.css';

import editorStyles from "./styles/editorStyles.module.css";
import mentionsStyles from './styles/mentionsStyles.module.css';

import { EditorState, convertToRaw, AtomicBlockUtils, ContentState } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from "@draft-js-plugins/mention";
import createImagePlugin from '@draft-js-plugins/image';
import createEmojiPlugin, { defaultTheme } from '@draft-js-plugins/emoji';

import Entry from './features/Entry';
import { Tooltip } from 'antd';


export default function MyTextArea({ 
  isAddedCmt, 

  onSearchFunc, 
  suggestionsProp, 

  setContent, 
  setToUsersId,

   isEditting,
     objEdit,

      replying
     }) {
      const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);

  const [open, setOpen] = useState(false);
  const editorRef = useRef(null);

  const {
    MentionSuggestions,
    plugins,
    EmojiSuggestions,
    EmojiSelect
  } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      theme: mentionsStyles,
      mentionPrefix: '@'
    });
    const { MentionSuggestions } = mentionPlugin;

    const imagePlugin = createImagePlugin();
    const emojiPlugin = createEmojiPlugin({
      theme: defaultTheme
    });

    const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

    const plugins = [mentionPlugin, imagePlugin, emojiPlugin];
    return { plugins, MentionSuggestions, EmojiSuggestions, EmojiSelect };
  }, []);


  useEffect(() => {
    if (objEdit && Object.keys(objEdit).length > 0) {
      setEditorState(EditorState.createWithContent(
        ContentState.createFromText(objEdit.content)
      ))
    }
  }, [objEdit])


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

    const inputDiv = document.getElementById("inputDiv");
    inputDiv.scrollTop = inputDiv.scrollHeight; // auto scroll to bottom
  }, [editorState])


  useEffect(() => {
    if (isAddedCmt) setEditorState(EditorState.createEmpty());
  }, [isAddedCmt])


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

    let inputContent = ""
    raw.blocks.forEach(block => inputContent = inputContent + block.text.trim());

    if (objEdit) objEdit.content = inputContent;
    onSetUsersMention(raw.entityMap);
    setContent(inputContent);
  };


  const onSetUsersMention = (objEntityMap) => {
    const mentionedUsers = [];
    for (let key in objEntityMap) {
      const entity = objEntityMap[key];
      if (entity.type === "mention") mentionedUsers.push(entity.data.mention.user_id.toString());
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
    <div className={editorStyles.editor} id="inputDiv">
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleChange}
        plugins={plugins}
        placeholder={isEditting ? "Edit your comment here..." : "Write a comment..."}
      />

      <EmojiSuggestions />
      <Tooltip title="Insert an emoji" >
        <div className={editorStyles.options}>
          <EmojiSelect />
        </div>

      </Tooltip>

      <MentionSuggestions
        open={open}
        onOpenChange={(e) => setOpen(e)}
        onSearchChange={handleOnSearch}
        suggestions={suggestions}
        entryComponent={Entry}
      />
    </div>
  );
}
