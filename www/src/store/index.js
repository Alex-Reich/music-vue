import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'


let api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 3000
})

let musicApi = axios.create({
    baseURL: 'https://itunes.apple.com',
    timeout: 3000
})

vue.use(vuex)

function swapUrlSize(url, pixels) {
    var sizeString = `${pixels}x${pixels}`;
    var newURL = url.replace("60x60", sizeString);
    return newURL;
}

export default new vuex.Store({
    state: {
        searchResults: [],
        playlist: {},
        user: {},
        allPlaylists: []
    },
    mutations: {
        setSearchResults(state, searchResults) {
            state.searchResults = searchResults
        },
        addSong(state, song) {
            state.playlist.push(song)
        },
        removeSong(state, indexToRemove) {
            state.playlist.splice(indexToRemove, 1)
        },
        setAllPlaylists(state, playlists) {
            state.allPlaylists = playlists
        },
        setPlaylist(state, playlist){
            console.log(playlist)
            state.playlist = playlist
        } 
    },
    actions: {
        addSong({ dispatch, commit, state }, song) {
            if (state.playlist.find(s => s.id == song.id)) {
                return dispatch('showNotification', {
                    type: 'error',
                    message: 'That song is already in your list'
                })
            }
            api.put('/playlists/'+state.playlist._id+'/songs', song)
                .then(res => {
                    commit('addSong', song)
                    commit('setPlaylist', this.playlist)
                })
        },
        removeSong({ dispatch, commit, state }, song) {
            api.delete('/playlists/songs' + song._id)
            .then(res =>{
                commit('removeSong', res.data)
            })
        },
        showNotification({
            commit
        }, notification) {
            console.log(notification)
        },
        findMusic({ dispatch, commit  }, query) {
            musicApi.get('search?media=music&term=' + query)
                .then(res => {
                    console.log(res.data.results)

                    var songList = res.data.results.map(function (song) {
                        return {
                            title: song.trackName,
                            albumArt: swapUrlSize(song.artworkUrl60, 400),
                            artist: song.artistName,
                            collection: song.collectionName,
                            price: song.collectionPrice,
                            preview: song.previewUrl,
                            id: song.trackId
                        }
                    });

                    commit('setSearchResults', songList)
                }).catch(err => dispatch('showNotification', err))
        },
        createPlaylist({dispatch}, playlist) {
            debugger
            api.post('/playlists', playlist)
            .then(res =>{
                dispatch('getAllPlaylists')
            })
        },
        getAllPlaylists({dispatch, commit}){
            api.get('/playlists')
            .then(res =>{
                commit('setAllPlaylists', res.data)
            })
        },
        deletePlaylist({dispatch, commit}, playlist) {
            console.log("you made it")
            api.delete('/playlists/'+playlist._id, playlist)
            .then(res=>{
                dispatch('getAllPlaylists')
            })
        }
    }
})