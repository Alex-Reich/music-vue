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
    /* Style for vue-draggable */
    .drag-wrapper {
  display: flex;
  justify-content: center;
}

ul {
  display: flex;
  flex-direction: column;
  padding: 3px !important;
  min-height: 70vh;
  width: 100px;
  float:left;
  list-style-type:none;
  overflow-y:auto;
  border:2px solid #888;
  border-radius:0.2em;
  background:#8adccc;
  color:#555;
  margin-right: 5px;
}

/* drop target state */
ul[aria-dropeffect="move"] {
  border-color:#68b;
  background:#fff;
}

/* drop target focus and dragover state */
ul[aria-dropeffect="move"]:focus,
ul[aria-dropeffect="move"].dragover
{
  outline:none;
  box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
}

/* draggable items */
li {
  display:block;
  list-style-type:none;
  margin:0 0 2px 0;
  padding:0.2em 0.4em;
  border-radius:0.2em;
  line-height:1.3;
}

li:hover {
  box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items focus state */
li:focus
{
  outline:none;
  box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items grabbed state */
li[aria-grabbed="true"]
{
  background:#5cc1a6;
  color:#fff;
}

@keyframes nodeInserted {
    from { opacity: 0.2; }
    to { opacity: 0.8; }
}

.item-dropzone-area {
    height: 2rem;
    background: #888;
    opacity: 0.8;
    animation-duration: 0.5s;
    animation-name: nodeInserted;
}
</style>