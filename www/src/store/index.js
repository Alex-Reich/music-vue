import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'


let api = axios.create({
    baseURL: 'mongodb://student:student@ds016298.mlab.com:16298/music-vue',
    timeout: 3000
})

let musicApi = axios.create({
    baseURL: 'https://itunes.apple.com/',
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
        playlist: [],
        user: {}
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
    },
    actions: {
        addSong({ dispatch, commit, state }, song) {
            if (state.playlist.find(s => s.id == song.id)) {
                return dispatch('showNotification', {
                    type: 'error',
                    message: 'That song is already in your list'
                })
            }
            api.put('/playlist/' + song._id, song)
            .then(res => {
                console.log(res)
            })
            // old code i used
            // commit('addSong', song)
        },
        removeSong({dispatch, commit, state}, song) {
            var index = state.playlist.findIndex(s=> s.id==song.id)
            commit('removeSong', index)    
        },
        showNotification({
            commit
        }, notification) {
            console.log(notification)
        },
        findMusic({ commit, dispatch }, query) {
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
                }
    }
    })