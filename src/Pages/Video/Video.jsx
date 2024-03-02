import React from "react";
import "./Video.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import Recomendation from "../../Components/Recomendation/Recomendation";
import { useParams } from "react-router-dom";

const Video = () => {

  const {videoId,categoryId} = useParams()

  return (
    <div className="play-conatiner">
      <PlayVideo videoId={videoId}/>
      <Recomendation categoryId={categoryId}/>
    </div>
  );
};

export default Video;
