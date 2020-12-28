<template>
    <div>
        <h1 id="title">ReadMe File</h1>
        <b-jumbotron style="margin:20px">
            <div v-html="html" style="text-align:left"></div>
        </b-jumbotron>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    readMe:String
  },
  data () {
      return {
          html:''
      }
  },
  mounted () {
    axios
      .get(this.readMe)
      .then((response) => {
        var showdown  = require('showdown')
        var converter = new showdown.Converter()
        converter.setOption('parseImgDimensions', true)
        var decodedReadMe = atob(response.data.content)
        this.html = converter.makeHtml(decodedReadMe)
      }).catch(err => {
        if (err.response.status === 404) {
          this.html = '<h1 id="error">There is no ReadMe.md file. Sorry</h1>'
        }
      })
  }
}
</script>

<style>
#error {
    text-align:center;
    font-weight:bold
}
</style>