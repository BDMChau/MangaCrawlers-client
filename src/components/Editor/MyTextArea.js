import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles/Editor.css'
import editorStyles from "./styles/editorStyles.module.css";
import mentionsStyles from './styles/mentionsStyles.module.css';

import { Button } from 'antd';
import { EditorState, convertToRaw } from "draft-js";
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from "@draft-js-plugins/mention";
import '@draft-js-plugins/mention/lib/plugin.css';
import Entry from './features/Entry';


export default function MyTextArea({ onSearchFunc, suggestionsProp, setContent, setToUsersId }) {
  const [suggestions, setSuggestions] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      theme: mentionsStyles,
      mentionPrefix: '@',
    });

    const { MentionSuggestions } = mentionPlugin;

    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);


  useEffect(() => {
    if (suggestionsProp.length) {
      suggestionsProp.forEach(item => {
        item.isFriend = true;
      });

      setSuggestions(suggestionsProp);
    }
  }, [suggestionsProp])

  useEffect(() => {
    console.log(editorState);
  }, [editorState])


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
    console.log(raw);
  };

  const onSetUsersMention = (obj) => {
    const userId = obj.user_id;

    setToUsersId(prev => [...prev, userId]);
  };

  return (
    <div className="textarea-editor" >
      <div className={editorStyles.editor}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleChange}
          plugins={plugins}
          placeholder="Write a comment..."
        />

        <MentionSuggestions
          open={open}
          onOpenChange={(e) => setOpen(e)}
          onSearchChange={handleOnSearch}
          suggestions={suggestions}
          onAddMention={onSetUsersMention}
          entryComponent={Entry}
        />
      </div>

      <Button>
        Extract mentions
      </Button>
    </div>
  );
}
