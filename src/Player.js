import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)}}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: "#fff",
        bgColor: "#2e3c54",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#839dbf",
        trackArtistColor: "#fff",
        trackNameColor: "#fff",
        height: "55px",
        playerPosition: 'bottom'
      }}
    />
  )
}
