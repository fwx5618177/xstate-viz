import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import React, { useRef } from 'react';

interface EditorWithXStateImportsProps {
  onChange?: (text: string) => void;
  defaultValue?: string;
}

export const EditorWithXStateImports = (
  props: EditorWithXStateImportsProps,
) => {
  return (
    <Editor
      height="auto"
      defaultLanguage="typescript"
      defaultValue={props.defaultValue}
      theme="vs-dark"
      onChange={(text) => {
        if (text) {
          props.onChange?.(text);
        }
      }}
      onMount={async (editor, monaco) => {
        const indexFile = await fetch(`/xstate.d.ts.txt`).then((res) =>
          res.text(),
        );

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          `${indexFile}`,
        );
      }}
    />
  );
};