<template>
  <div>
    <div class="editor">
      <editor-menu-bubble
        :editor="editor"
        :keep-in-bounds="keepInBounds"
        v-slot="{ commands, isActive, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <icon name="bold" size="small" />
          </button>
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <icon name="italic" size="small" />
          </button>
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <icon name="code" size="small" />
          </button>
          <select v-model="selectedColor">
                <option value="soft-blue">soft blue</option>
                <option value="soft-green">soft green</option>
            </select>
            <button class="menububble__button" @click="commands.highlight({class: selectedColor})">
                <icon name="fill-drip" size="small" />
            </button>
            <button class="menububble__button" @click="commands.highlight({class: null})">
                <icon name="eraser" size="small" />
            </button>
        </div>
      </editor-menu-bubble>
      <editor-content class="editor__content" :editor="editor" />
    </div>
    <div>
      <file-loader class="file-button" @load="updateEditorContents($event)"></file-loader>
        <label class="file-button" @click="exportText">    
            Export
        </label>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
import FileLoader from './FileLoader'
import HighlightMark from './HighlightMark'

import {
    Editor,
    EditorContent,
    EditorMenuBubble,

} from 'tiptap'
import {
    Blockquote,
    BulletList,
    CodeBlock,
    HardBreak,
    Heading,
    ListItem,
    OrderedList,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
} from 'tiptap-extensions'

export default {
    components: {
        EditorContent,
        EditorMenuBubble,
        Icon,
        FileLoader
        
    },    
    methods: {
        updateEditorContents(newContent){
            this.editor.setContent(newContent);
        },
        exportText() {
            const html = this.editor.getHTML();
            console.log("getHTML " + html);
            this.downloadContent(html, ".html", "export.html");
        },
        downloadContent(text, fileType, fileName) {
            const blob = new Blob([text], { type: fileType });

            const a = document.createElement('a');
            a.download = fileName;
            a.href = URL.createObjectURL(blob);
            a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
        },
    },
    data() {
        return {  
            selectedColor: "soft-green",
            keepInBounds: true,
            editor: new Editor({
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({
                        levels: [1, 2, 3]
                    }),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    new HighlightMark()
                ],
            }),
        }
    },
    beforeDestroy() {
        this.editor.destroy()
    },

}
</script>

<style>
.soft-green {
  background: rgb(180, 233, 180);
}

.soft-blue {
  background: rgb(130, 180, 233);
}

.file-button {
  position: relative;
  overflow: hidden;
  display: inline-block;

  border: 2px solid rgb(99, 99, 165);
  color: rgb(99, 99, 165);
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}

.file-button:hover {
  color:white;
  background-color: rgb(99, 99, 165);
}

.file-button input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
