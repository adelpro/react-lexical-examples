import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingTagType } from '@lexical/rich-text';
import { FORMAT_HEADING_COMMAND } from '../../plugins';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

export const CustomHeadingActions = () => {
   const [editor] = useLexicalComposerContext();
   // Make it reversible
   const handleOnClick = (tag: HeadingTagType) => {
      editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      const parentNode = selection.anchor.getNode().getParent();
      const isHeading = $isHeadingNode(parentNode);
      if (isHeading) {
        $setBlocksType(selection, () => $createParagraphNode());
      } else {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });    
   };

   return (
      <ActionsContainer title="Heading actions">
         {(['h1', 'h2', 'h3', 'h4', 'h5'] as Array<HeadingTagType>).map(
            (tag) => {
               return (
                  <ActionButton key={tag} onClick={() => handleOnClick(tag)}>
                     {tag}
                  </ActionButton>
               );
            },
         )}
      </ActionsContainer>
   );
};
