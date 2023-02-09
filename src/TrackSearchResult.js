import React from "react"
import "./trackSearchResult.css"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div className="track_container" onClick={handlePlay}>
      <img src={track.albumUrl} alt='album'/>
      <div >
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
    </div>
  )
}