/*
    This is our http api, which we use to send requests to
    our back-end API. Note we're using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it's a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE'LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /playlist). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const getAllPlaylists = () => api.get(`/playlists`)
export const getPlaylistPairs = () => api.get('playlistpairs')
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const createPlaylist = () => api.post('/playlist', {name: "New Playlist",songs: []}) //am i doing this right
export const deletePlaylist = (id) => api.delete('/playlist/' + id) //lol i cant do the dollar sign thing
export const createNewSong = (id) => api.put('/playlist/' + id)
export const updatePlaylistById = (id, playlist) =>api.put('/playlist/', {id, playlist})
// export const removeSong = (id, songId) => api.put('/playlist/' + id,songId);

const apis = {
    getAllPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    createPlaylist,
    deletePlaylist,
    createNewSong,
    updatePlaylistById,
    // removeSong
}

export default apis
