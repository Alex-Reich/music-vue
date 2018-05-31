<template>
    <div class="">
        <h4>My Playlists</h4>
      <form @submit.prevent="createPlaylist">
          <input type="text" name="title" v-model="playlist.title">
          <button type="submit">Create Playlist</button>
      </form>
      <ol>
          <li v-for="playlist in allPlaylists">
            <h1>{{playlist.title}}</h1>
            <button @click="selectPlaylist(playlist)">Select playlist</button>
            <button @click="deletePlaylist(playlist)">Delete playlist</button>
          </li>
      </ol>

    </div>
</template>

<script>
    export default {
        name: 'myPlaylist',
        data() {
            return {
                playlist: {
                    title: ''
                }
            }
        },
        mounted(){
          this.$store.dispatch('getAllPlaylists')  
        },
        computed: {
            allPlaylists(){
                return this.$store.state.allPlaylists
            },
            results(){
                return this.$store.state.playlist
            }
        },
        // Finish this method
        methods: {
            createPlaylist(){
                this.$store.dispatch('createPlaylist', this.playlist)
            },
            selectPlaylist(playlist){
                this.$store.commit('setPlaylist', playlist)
            },
            deletePlaylist(playlist){
                this.$store.dispatch('deletePlaylist', playlist)
            }
        }
    }

</script>

<style>
</style>