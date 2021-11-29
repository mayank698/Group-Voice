import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useNewsInfoStyles } from "@mui-treasury/styles/info/news";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { PodcastContext } from "../providers/podcastContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import app_config from "../config";

const SimpleMediaQuery = () => {
  const matches = useMediaQuery("(min-width:600px)");

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
};
const useStyles = makeStyles(() => ({
  card: {
    position: "relative",
    boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
    overflow: "visible",
    borderRadius: "0.5rem",
    transition: "0.4s",
    "&:hover": {
      transform: "translateY(-2px)",
      "& $shadow": {
        bottom: "-1.5rem",
      },
      "& $shadow2": {
        bottom: "-2.5rem",
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      zIndex: 0,
      display: "block",
      width: "100%",
      bottom: -1,
      height: "100%",
      borderRadius: "0.5rem",
      backgroundColor: "rgba(0,0,0,0.08)",
    },
  },
  main: {
    overflow: "hidden",
    borderTopLeftRadius: "1.5rem",
    borderTopRightRadius: "1.5rem",
    zIndex: 1,
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      display: "block",
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, #014a7d, rgba(0,0,0,0))",
    },
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 1,
    padding: "1.5rem 1.5rem 1rem",
  },
  avatar: {
    width: 48,
    height: 48,
  },
  tag: {
    display: "inline-block",
    fontFamily: "'Sen', sans-serif",
    backgroundColor: "#ff5dac",
    borderRadius: "0.5rem",
    padding: "2px 0.5rem",
    color: "#fff",
    marginBottom: "0.5rem",
  },
  title: {
    fontFamily: "'Sen', sans-serif",
    fontSize: "2rem",
    fontWeight: 800,
    color: "#fff",
  },
  author: {
    zIndex: 1,
    position: "relative",
    borderBottomLeftRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
  },
  shadow: {
    transition: "0.2s",
    position: "absolute",
    zIndex: 0,
    width: "88%",
    height: "100%",
    bottom: 0,
    borderRadius: "0.5rem",
    backgroundColor: "rgba(0,0,0,0.06)",
    left: "50%",
    transform: "translateX(-50%)",
  },
  shadow2: {
    bottom: 0,
    width: "72%",
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}));

export default function ListPodcast() {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();

  const podcastService = useContext(PodcastContext);
  const [podcastList, setPodcastList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);

  const url = app_config.api_url + "/";

  useEffect(() => {
    podcastService.getAllSeries().then((data) => {
      console.log(data);
      setSeriesList(data);
    });
  }, []);
  return (
    <div className="col-md-10 mx-auto mt-5">
      <div className="row">
        <div className="col-md">
          <div className="row">
            {seriesList.map((series) => {
              return (
                <div key={series._id} className="col-md-3 mt-5">
                  <Card
                    className={styles.card}
                    component={Link}
                    to={"/main/podcastdetail/" + series._id}
                  >
                    <Box
                      className={styles.main}
                      minHeight={400}
                      position={"relative"}
                    >
                      <CardMedia
                        classes={mediaStyles}
                        image={url + series.thumb}
                      />
                      <div className={styles.content}>
                        <div className={styles.tag}>Fashion</div>
                        <Typography variant={"h4"} className={styles.title}>
                          {series.title}
                        </Typography>
                      </div>
                    </Box>
                    <Row
                      className={styles.author}
                      m={0}
                      p={3}
                      pt={2}
                      gap={2}
                      bgcolor={"common.white"}
                    >
                      <Item>
                        <Avatar
                          className={styles.avatar}
                          src={url + series.artist.avatar}
                        />
                      </Item>
                      <Info position={"middle"} useStyles={useNewsInfoStyles}>
                        <InfoTitle>{series.artist.fullname}</InfoTitle>
                        <InfoSubtitle>Jun 20 | 2 Min Read</InfoSubtitle>
                      </Info>
                    </Row>
                    <div className={styles.shadow} />
                    <div className={`${styles.shadow} ${styles.shadow2}`} />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
