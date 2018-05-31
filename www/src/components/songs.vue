<template>
  <div class="">
        <ol class="col-sm-6">
                <li v-for="song in list">
                    <div class="card align-items-center card-bg">
                        <div class="card-body">
                            <p>Artist: {{song.artist}}</p>
                            <p>Song: {{song.title}}</p>
                            <audio controls controlsList="nodownload">
                                <source :src="song.preview" type="audio/ogg"> Your browser does not support the audio tag.
                            </audio>
                            <button @click="handleButton(song)">{{buttonText}}</button>
                            <button @click="removeSongFromPlaylist">Remove from playlist</button>
                        </div>
                    </div>
                </li>
            </ol>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {

      }
    },
    computed: {},
    methods: {
        removeSongFromPlaylist(){
                this.$store.dispatch('removeSongFromPlaylist', )
            },
    }
  }

</script>

<style>


</style>
