import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import "./dashboard.css"

const spotifyApi = new SpotifyWebApi({
  clientId: "9b47b2c3fa614b70957ca57f85b96f08",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return
        axios
        .get("http://localhost:3001/lyrics", {
            params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
            },
        })
        .then(res => {
            setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <div className="container">
        
        <div className="searchbar">
            <h4>Search & Play song to display lyrics</h4>
            <input type="search" placeholder="Search Songs/Artists" value={search}onChange={e => setSearch(e.target.value)}/>
            <h4>Some songs are missing lyrics</h4>
        </div>
        <div className="lyrics_container">
            
            {lyrics}
        </div>

        <div className="search_result">
            {searchResults.map(track => (
            <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
            />
            ))}
        </div>
        
        <div>
            <div className="player">
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </div>
        </div>
    </div>
  )
}