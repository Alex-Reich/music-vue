<template>
  <div class="searchResults container">
    <ol>
      <li v-for="song in list" class="row">
        <div class="col">
          <div class="card align-items-center card-bg">
            <img :src="song.albumArt" alt="" class="albumart">
            <div class="card-body">
              <h3>Artist: {{song.artist}}</h3>
              <h3>Song: {{song.title}}</h3>
              <h3>Album: {{song.collection}}</h3>
              <audio controls controlsList="nodownload">
                <source :src="song.preview" type="audio/ogg"> Your browser does not support the audio tag.
              </audio>
              <h3>
                <a href="https://www.apple.com/itunes/music/" class="btn btn-primary" target="_blank">Price: {{song.price}}</a>
              </h3>
              <button @click="handleButton(song)">Add to playlist</button>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>


  export default {
    name: 'searchResults',
    props: {
      list: {
        type: Array,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      },
      handleButton: {
        type: Function,
        required: true
      }
    },
    computed: {
      results(){
        return this.$store.state.searchResults
      }
    },
    methods: {}
  }

</script>

<style>
</style>