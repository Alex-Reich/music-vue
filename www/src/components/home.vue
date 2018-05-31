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
          </div>
            <myPlaylist></myPlaylist>
            <div class="row">
              <div> {{playlist.title}}</div>
            </div>

        </div>
      </div>




    </div>
  </div>
</template>

<script>
  import searchResults from './searchResults.vue'
  import myPlaylist from './myPlaylist.vue'
  import songs from './songs.vue'

  export default {
    name: 'Home',
    components: {
      searchResults,
      myPlaylist
    },
    data() {
      return {
        query: '',
        artist: '',
        switch: true
      }
    },
    computed: {
      searchResults() {
        return this.$store.state.searchResults
      },
      playlist(){
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
    grid-template-areas: "results playlists activePlaylist"
  }

  .results {
    grid-area: results
  }

  .playlists {
    grid-area: playlists
  }

  .activePlaylist {
    grid-area: activePlaylist
  }
</style>