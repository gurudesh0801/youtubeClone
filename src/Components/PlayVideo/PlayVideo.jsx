import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import videol from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {

  const {videoId} =  useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, SetCommentData] = useState([]);

  const fetchVideoData = async () => {
    // Fetching The Api Data
    const videoDetails_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&videoCategoryId=0&key=${API_KEY}`;
    await fetch(videoDetails_URL)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };
  const fetchOtherData = async () => {
    const channelData_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_URL)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(res=>res.json()).then(data=>SetCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={videol} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-videoInfo">
        <p>
          {value_converter(apiData ? apiData.statistics.viewCount : "1212")}{" "}
          views &bull;{" "}
          {apiData
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "a day ago"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : "19"}
          </span>
          <span>
            <img src={dislike} alt="" />3
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "channel Name"}</p>
          <span>
            {value_converter(
              channelData ? channelData.statistics.subscriberCount : "10"
            )}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-discription">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250) + "....."
            : "Subscribe this channel"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "10"}{" "}
          Comments
        </h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className="comments">
              <img src={item?item.snippet.topLevelComment.snippet.authorProfileImageUrl:""} alt="" />
              <div>
                <h3>
                  {item?item.snippet.topLevelComment.snippet.authorDisplayName:"User"} <span>1 day ago</span>
                </h3>
                <p>{item?item.snippet.topLevelComment.snippet.textDisplay.slice(0,255)+"......":"lorem 23"}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(item?item.snippet.topLevelComment.snippet.likeCount:"10")}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
