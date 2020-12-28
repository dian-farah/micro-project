<template>
    <div>
        <!-- The search bar to put in github username -->
        <b-container fluid v-if='!search'>
            <b-row>
                <b-col class="text-center" style="margin-top:60px">
                    <h1>Enter your GitHub Username</h1>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col></b-col>
                <b-col sm="8" style="text-align:center">
                    <b-form-input v-model='username' id="input-small"></b-form-input>
                    <b-button variant="outline-primary" @click='getProjects()'>Get Projects!</b-button>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>

        <!-- Listing the projects aft the user enter his or her username -->
        <div v-else>
          <div v-if="!clicked">
            <h1 id="title">{{ username }}'s Projects</h1>
            <b-button-group vertical>
              <span v-for="repo in repos" :key="repo.name">
                <b-button variant="light" @click="showReadMe(repo.name)"><Project :proj="repo"/></b-button>
              </span>
            </b-button-group>
          </div>

          <!-- Show ReadMe file after user clicks on a project -->
          <div v-else>
            <ReadMe :readMe="showLink"/>
          </div>
        </div>
    </div>
</template>

<script>
import Project from './Project.vue'
import ReadMe from './ReadMe.vue'
import axios from 'axios'

export default {
  components: {
    Project,
    ReadMe
  },
  data () {
    return {
      username:'',
      search:false,
      repoName: '',
      repoReadMe: '',
      repos: [],
      clicked:false,
      showLink: ''
    }
  },
  methods: {
    //get github repo projects using github api
    getProjects() {
      this.search = !this.search
      axios
        .get('https://api.github.com/users/'+this.username+'/repos')
        .then((response) => {
          for (var repo of response.data) {
            this.repoName = repo.name
            this.repoReadMe = 'https://api.github.com/repos/'+this.username+'/'+this.repoName+'/readme'
            this.repos.push({name:this.repoName, readMeLink:this.repoReadMe})

          }
        })
    },

    //show readme file of chosen repo project
    showReadMe (name) {
      this.clicked = true
      for (var repo of this.repos) {
        if (repo.name == name) {
          this.showLink = repo.readMeLink
        }
      }
    }
  }
}
</script>

<style>
button {
    margin-top:10px
}
#title {
  font-weight:bold
}
</style>