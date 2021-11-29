import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useGradientAvatarStyles } from "@mui-treasury/styles/avatar/gradient";
import { makeStyles } from "@material-ui/core/styles";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useGrowAvatarStyles } from "@mui-treasury/styles/avatar/grow";
import { useMusicInfoStyles } from "@mui-treasury/styles/info/music";
import IconButton from "@material-ui/core/IconButton";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import Rating from "@material-ui/lab/Rating";
import {
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoCaption,
} from "@mui-treasury/components/info";
import { PodcastContext } from "../providers/podcastContext";
import { useParams } from "react-router-dom";
import app_config from "../config";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { UserContext } from "../providers/userContext";

const Podcastdetail = React.memo(function GradientAvatar() {
  const styles = useGradientAvatarStyles({
    size: 80,
    gap: 3,
    thickness: 3,
    gapColor: "#f4f7fa",
    color: "linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)",
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    text: {
      display: "flex",
      alignItems: "center",
      "& > svg": {
        fontSize: 18,
        color: "#888",
        marginRight: 4,
      },
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const commonProps = {
    blur: "12px",
    radius: 16,
    size: 48,
    opacity: 0.6,
  };
  const src =
    "https://cdn1.vectorstock.com/i/1000x1000/85/40/music-abstract-poster-cover-1980s-style-background-vector-11958540.jpg";
  const avatarStyles = useGrowAvatarStyles({ src, ...commonProps });
  const src2 =
    "https://www.designformusic.com/wp-content/uploads/2016/04/orion-trailer-music-album-cover-design.jpg";
  const avatarStyles2 = useGrowAvatarStyles({ src: src2, ...commonProps });
  const classes = useStyles();
  const url = app_config.api_url + "/";

  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [seriesData, setSeriesData] = useState(null);
  const podcastService = useContext(PodcastContext);
  const userService = useContext(UserContext);
  const [rating, setRating] = useState(3);
  const [text, setText] = useState("");

  const [playing, setPlaying] = useState("");
  const [currentTrack, setCurrentTrack] = useState(
    "http://localhost:5000/bensound-perception.mp3"
  );

  useEffect(() => {
    fetchPodcast();
  }, []);

  const fetchPodcast = () => {
    podcastService.getSeriesById(id).then((data) => {
      console.log(data);
      let podcast = data.podcasts[0];
      setPlaying(url + podcast.podcastfile);
      setSeriesData(data);
    });
  };

  const setPlay = (podcast) => {
    setCurrentTrack(url + podcast.podcastfile);
  };

  const renderReviews = () => {
    if (seriesData.reviews)
      return seriesData.reviews.map((review, index) => {
        return (
          <Card key={index}>
            <CardContent>
              <h3>{review.user.fullname}</h3>
              <Rating value={review.rating} name="rating"></Rating>
              <p>{review.text}</p>
            </CardContent>
          </Card>
        );
      });
  };

  const handleRate = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const addRating = (e) => {
    podcastService
      .AddRating(seriesData._id, {
        rating: rating,
        text: text,
        user: userService.currentUser._id,
      })
      .then((res) => {
        console.log(res);
        fetchPodcast();
        // setOpen(true);
      });
  };

  const ratingForm = () => {
    if (userService.loggedin) {
      return (
        <Card>
          <CardContent>
            <Rating onChange={handleRate} value={rating}></Rating>
            <TextField
              className="w-100"
              label="Review Text"
              multiline
              rows={5}
              value={text}
              name="give-rating"
              onChange={handleText}
              variant="filled"
            />

            <Button onClick={addRating}>Add Review</Button>
          </CardContent>
        </Card>
      );
    }
  };

  if (seriesData) {
    return (
      <div>
        <div className="row my-3 mx-4">
          <div className="col-md-4 my-3">
            <div className={styles.root}>
              <Avatar
                alt={seriesData.artist.fullname}
                src={url + seriesData.artist.avatar}
                className={classes.large}
              />
            </div>
          </div>
          <div className="col-md-5">
            <h1>Your podcast series</h1>
          </div>
        </div>
        <div className="col-md-11 mx-auto">
          <div className="row">
            <div className="col-md-8">
              {seriesData.podcasts.map((podcast, index) => {
                return (
                  <Row mt={2}>
                    <Item>
                      <div className={avatarStyles2.root}>
                        <Avatar src={url + podcast.avatar} />
                      </div>
                    </Item>
                    <Info useStyles={useMusicInfoStyles} minWidth={0}>
                      <InfoTitle>{podcast.title}</InfoTitle>
                      <InfoSubtitle>{seriesData.artist.fullname}</InfoSubtitle>
                      <InfoCaption className={styles.text}>
                        <PlayCircleFilled onClick={(e) => setPlay(podcast)} />
                      </InfoCaption>
                    </Info>
                    <Item position={"right"}>
                      <IconButton size={"small"}>
                        <MoreHoriz />
                      </IconButton>
                    </Item>
                  </Row>
                );
              })}
            </div>
            <div className="col-md-4">
              <h3 className="text-center">Reviews</h3>
              <hr />
              {renderReviews()}
              {ratingForm()}
            </div>
          </div>

          <AudioPlayer
            className="my-3"
            src={currentTrack}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
        </div>
      </div>
    );
  } else {
    return <h1>Nothing Here</h1>;
  }
});
export default Podcastdetail;
