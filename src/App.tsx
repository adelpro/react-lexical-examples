import React, { useMemo } from 'react';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import {
   OnChangePlugin,
   CustomTextActions,
   CustomHistoryActions,
   CustomAlignActions,
   CustomHeadingActions,
   CustomHeadingPlugin,
   CustomBannerPlugin,
   CustomBannerActions,
} from './components';
import { HeadingNode } from '@lexical/rich-text';
import initialState from './initialState.json';
import { BannerNode } from './nodes';
import { CustomDraggableBlockPlugin } from './plugins';

import './App.css';

export const App: React.FC = () => {
   const CustomContent = useMemo(() => {
      return (
         <div style={{ position: 'relative' }}>
            <ContentEditable />
         </div>
      );
   }, []);

   const CustomPlaceholder = useMemo(() => {
      return (
         <div
            style={{
               position: 'relative',
               top: -19,
               left: 30,
               color: 'rgba(0,0,0,0.42)',
               zIndex: -10,
               pointerEvents: 'none',
            }}
         >
            Enter some text...
         </div>
      );
   }, []);

   const lexicalConfig: InitialConfigType = {
      namespace: 'My Rich Text Editor',
      nodes: [BannerNode, HeadingNode],
      editable: true,
      theme: {
         root: 'root',
         text: {
            bold: 'text-bold',
            italic: 'text-italic',
            underline: 'text-underline',
            code: 'text-code',
            highlight: 'text-highlight',
            strikethrough: 'text-strikethrough',
            subscript: 'text-subscript',
            superscript: 'text-superscript',
         },
         banner: 'banner',
      },
      onError: (e) => {
         console.log('ERROR:', e);
      },
      editorState: JSON.stringify(initialState),
   };

   return (
      <div
         style={{
            padding: '20px',
         }}
      >
         <LexicalComposer initialConfig={lexicalConfig}>
            <div
               style={{
                  margin: '20px 0px',
               }}
            >
               <CustomHistoryActions />
               <CustomBannerActions />
               <CustomHeadingActions />
               <CustomTextActions />
               <CustomAlignActions />
            </div>
            <RichTextPlugin
               contentEditable={CustomContent}
               placeholder={CustomPlaceholder}
               ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin />
            <CustomHeadingPlugin />
            <CustomBannerPlugin />
            <CustomDraggableBlockPlugin />
         </LexicalComposer>
      </div>
   );
};
