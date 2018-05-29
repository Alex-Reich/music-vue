<template>
  <div>
    <div class="container-fluid searchbar">
      <form class="form-inline mx-auto" @submit.prevent="findMusic">
        <div class="form-group">
          <input type="text" v-model="query" class="form-control" name="artist" placeholder="Artist Name" />
          <button type="submit">Get Music</button>
        </div>
      </form>

      <div class="songs-section">
        <div class="results">
          <h4>Results for {{artist}}:</h4>
          <div class="row">
            <searchResults :list="searchResults" button-text="Add to playlist" :handleButton="addSong"></searchResults>
          </div>
        </div>
        <hr>
        <div class="myPlaylist">
          <div class="row">
            <myPlaylist :list="myPlaylist" button-text="Remove from playlist" :handleButton="removeSong"></myPlaylist>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
  // Ask Wes about this import section
  import searchResults from './searchResults.vue'
  import myPlaylist from './myPlaylist.vue'

  export default {
    name: 'Home',
    components: {
      searchResults,
      myPlaylist
    },
    data() {
      return {
        query: '',
        artist: ''
      }
    },
    computed: {
      searchResults() {
        return this.$store.state.searchResults
      },
      myPlaylist() {
        return this.$store.state.playlist
      }
    },
    methods: {
      findMusic() {
        this.$store.dispatch('findMusic', this.query)
        this.artist = this.query
        this.query = ''
      },
      addSong(song) {
        this.$store.dispatch('addSong', song)
      },
      removeSong(song) {
        this.$store.dispatch('removeSong', song)
      }
    }
  }
</script>

<style scoped>
  .songs-section {
    display: grid;
    grid-template-areas: "results myPlaylist"
  }

  .results {
    grid-area: results
  }

  .myPlaylist {
    grid-area: myPlaylist
  }
</style>