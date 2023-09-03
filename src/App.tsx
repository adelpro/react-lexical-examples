import React, { useMemo } from 'react';
import {
   InitialConfigType,
   LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import {
   CustomTextActions,
   CustomHistoryActions,
   CustomAlignActions,
   CustomHeadingActions,
   CustomBannerActions,
   MarkdownActions,
} from './components';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { BannerNode, ImageNode } from './nodes';
import {
   CustomDraggableBlockPlugin,
   DraggableWrapper,
   useDraggableStore,
   CustomBannerPlugin,
   CustomHeadingPlugin,
   // TODO
   CustomLexicalTypeaheadMenuPlugin,
   CustomOnChangePlugin,
} from './plugins';

// Link Plugins
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import { MATCHERS, validateUrl } from './utils';

import initialState from './initialState.json';
import './App.css';
import { YouTubeActions } from './plugins/CustomYouTubePlugin/actions';
import { YouTubePlugin } from './plugins/CustomYouTubePlugin';
import { YouTubeNode } from './plugins/CustomYouTubePlugin/nodes';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

export const App: React.FC = () => {
   const { isMarkdown } = useDraggableStore();
   const CustomContent = useMemo(() => {
      return (
         <DraggableWrapper>
            <div
               style={{
                  position: 'relative',
                  paddingLeft: isMarkdown ? undefined : '23px',
               }}
            >
               <ContentEditable />
               {/*<FloatingToolbar />*/}
            </div>
         </DraggableWrapper>
      );
   }, [isMarkdown]);

   const CustomPlaceholder = useMemo(() => {
      return (
         <div
            style={{
               position: 'relative',
               top: -19,
               left: 23,
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
      nodes: [
         BannerNode,
         HeadingNode,
         ImageNode,
         QuoteNode,
         CodeNode,
         ListNode,
         ListItemNode,
         LinkNode,
         AutoLinkNode,
         YouTubeNode,
      ],
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
         code: 'markdown-code',
         embedBlock: {
            base: 'embedBlock',
            focus: 'embedBlock_focus',
         },
      },
      onError: (e) => {
         console.log('ERROR:', e);
      },
      // editorState: JSON.stringify(initialState),
   };

   return (
      <div
         style={{
            padding: '0px 20px',
         }}
      >
         <LexicalComposer initialConfig={lexicalConfig}>
            <div
               style={{
                  marginBottom: '20px',
               }}
            >
               <YouTubeActions />
               <CustomHistoryActions />
               <CustomBannerActions />
               <CustomHeadingActions />
               <CustomTextActions />
               <CustomAlignActions />
               <MarkdownActions />
            </div>
            <RichTextPlugin
               contentEditable={CustomContent}
               placeholder={CustomPlaceholder}
               ErrorBoundary={LexicalErrorBoundary}
            />
            <YouTubePlugin />
            <HistoryPlugin />
            <CustomOnChangePlugin />
            {/* This will allow to wrap node with a pasted link*/}
            <LinkPlugin validateUrl={validateUrl} />
            {/* This will allow to automatically wrap with a link entered text */}
            <AutoLinkPlugin matchers={MATCHERS} />
            {/* This will allow to click on a link in edit mode */}
            <LexicalClickableLinkPlugin />
            {/* TODO: This will show a popover dialog on "/" (like Notion)*/}
            {/*<CustomLexicalTypeaheadMenuPlugin />*/}
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <CustomHeadingPlugin />
            <CustomBannerPlugin />
            <CustomDraggableBlockPlugin />
         </LexicalComposer>
      </div>
   );
};
