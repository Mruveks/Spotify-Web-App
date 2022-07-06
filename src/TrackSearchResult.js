import React from "react"
import "./trackSearchResult.css"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div className="track_container" onClick={handlePlay}>
      <img src={track.albumUrl}/>
      <div >
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  )
}