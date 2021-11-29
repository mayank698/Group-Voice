import { Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cssClasses from "../cssClasses";
import { Link } from "react-router-dom";
import { PodcastContext } from "../../providers/podcastContext";

const ManagePodcast = props => {
  const podcastService = useContext(PodcastContext);
  const [podcasttList, setPodcastList] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseClasses = cssClasses();

  const fetchPodcasts = () => {
    podcastService.getAll()
      .then(data => {
        console.log(data);
        setPodcastList(data);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchPodcasts();
  }, [])

  const deletePodcast = (id) => {
    podcastService.deletePodcast(id)
      .then(res => {
        console.log(res);
        fetchPodcasts();
      })
  }

  const displayEquipments = () => {
    return podcasttList.map((podcast, index) => {
      if (!loading) {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{podcast.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row">
                <div className="col-4">
                  <p>Description</p>
                </div>
                <div className="col-8">
                  <p>{podcast.description}</p>
                </div>
              </div>
              <br />
              <Button varaint="outline">Update</Button>
              <Button
                varaint="outline"
                color="secondary"
                onClick={(e) => deletePodcast(podcast._id)}
              >
                Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      } else {
        return;
      }
    });
  };

  return <div style={{ marginTop: "5rem" }}>{displayEquipments()}</div>;
}

export default ManagePodcast;