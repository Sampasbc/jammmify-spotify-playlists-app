import React from "react";
import PlaylistItem from "./PlaylistItem";
import styles from "../css//modules/_PlaylistContainer.module.css";

const PlaylistContainer = ({ playlists }) => {
  return (
    <div className={styles.playlistContainer}>
      <h3 className={styles.title}>Playlists</h3>
      <ul>
        {playlists.map((list) => (
          <PlaylistItem
            src={list.imgSrc}
            playlistName={list.name}
            playlistAuthor={list.author}
          />
        ))}
      </ul>
    </div>
  );
};

export default PlaylistContainer;
