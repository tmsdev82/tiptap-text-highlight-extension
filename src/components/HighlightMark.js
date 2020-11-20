import { Mark} from 'tiptap'
import { toggleMark, updateMark } from 'tiptap-commands'

export default class HighlightMark extends Mark {
    get name() {
      return "highlight";
    }
  
    get schema() {
      return {
        attrs: {          
          class: {
              default: null
          }          
        },
        parseDOM: [
          {
            tag: "highlight",            
          }
        ],
        toDOM: highlight => [
          "highlight",
          {
            class: highlight.attrs.class,            
          },
          0
        ]
      };
    }
  
    commands({ type }) {
      return attrs => {
        if(!attrs || attrs['class'] === null){
          // if class is null the mark should be removed all together
          return toggleMark(type, attrs);
        }
        
        // update/create the mark with the new class
        return updateMark(type, attrs);
      }
    }
  
  }