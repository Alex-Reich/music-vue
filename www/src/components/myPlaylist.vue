<template>
    <div class="">
        <ol class="col-sm-6">
            <h4>My Playlist</h4>
            <li v-for="song in list">
                <div class="card align-items-center card-bg">
                    <div class="card-body">
                        <p>Artist: {{song.artist}}</p>
                        <p>Song: {{song.title}}</p>
                        <audio controls controlsList="nodownload">
                            <source :src="song.preview" type="audio/ogg"> Your browser does not support the audio tag.
                        </audio>
                        <button @click="handleButton(song)">{{buttonText}}</button>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'myPlaylist',
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
        data() {
            return {

            }
        },
        computed: {},
        methods: {}
    }

</script>

<style>
</style>