<template>
  <div class="create-wrap">
    <div class="top-wrap">
      <div class="title">title</div>
      <div class="user-info"></div>
    </div>
    <div class="edit-wrap">
      <textarea class="md-box" name="field" id="mdBox" cols="30" rows="10"></textarea>
    </div>
    <div v-html="demoVal"></div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'

export default {
  data() {
    return {
      simplemde: null,
      demoVal: null
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.simpleMDEInit()
    })
  },
  methods: {
    simpleMDEInit() {
      const element = document.getElementById('mdBox')

      this.simplemde = new SimpleMDE({
        element,
        spellChecker: false,
        autofocus: true,
        autoDownloadFontAwesome: false,
        placeholder: "Type here...",
        autosave: {
          enabled: true,
          uniqueId: "MyUniqueID",
          delay: 1000,
        },
        toolbar: ["bold", "|", "italic", "|", "strikethrough", "|", "heading", "|", "heading-1", "|", "heading-2", "|", "heading-3", "|", "code", "|", "unordered-list", "|", "ordered-list", "|", "clean-block", "|", "link", "|", "image", "|", "table", "|", "side-by-side", "|", "fullscreen"],
        previewRender: (plainText, preview) => {
          // Async method
          setTimeout(() => {
            preview.innerHTML = this.customMarkdownParser(plainText)
          }, 250)

          return "Loading..."
        },
        tabSize: 4,
        status: false,
        lineWrapping: false,
        renderingConfig: {
          codeSyntaxHighlighting: false
        },
      })
      this.simplemde.codemirror.on("change", () => {
        console.log(this.simplemde.markdown(this.simplemde.value()), 435)
      })
      this.simplemde.isPreviewActive()
      this.simplemde.isSideBySideActive()
      this.simplemde.isFullscreenActive()
      this.simplemde.clearAutosavedValue()
      this.simplemde.toggleSideBySide()
    },
    customMarkdownParser(val) {
      this.demoVal = this.simplemde.markdown(val)
      return this.simplemde.markdown(val)
    }
  },
}
</script>

<style lang="less">
.create-wrap {
  .edit-wrap {
    .CodeMirror {
      min-height: 600px;
    }
  }
}
</style>