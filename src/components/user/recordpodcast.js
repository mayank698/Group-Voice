import {
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  IconButton,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { PodcastContext } from "../../providers/podcastContext";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StopIcon from "@material-ui/icons/Stop";
import MicIcon from "@material-ui/icons/Mic";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import MicOffIcon from "@material-ui/icons/MicOff";

const useStyles = makeStyles((theme) => ({
  listCard: {
    height: "20rem",
  },
}));

const RecordPodcast = () => {
  const styles = useStyles();

  const VoxeetSDK = window.VoxeetSDK;
  const [currentPart, setCurrentPart] = useState({});
  const [aliasName, setAliasName] = React.useState("");
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioList, setAudioList] = useState([]);
  // const [stream, setStream] = useState(null);
  // const [mediaRecorder, setMediaRecorder] = useState(null)
  // const [chunks, setChunks] = useState([]);
  const [conference, setConference] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioTitle, setAudioTitle] = useState("");
  const [recorder, setRecorder] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const podcastService = useContext(PodcastContext);
  const initVoxeet = async () => {
    try {
      // Open the session here !!!!
      await VoxeetSDK.session.open({ name: currentUser.fullname });
    } catch (e) {
      alert("Something went wrong : " + e);
    }
  };

  const recordAudio = () =>
    new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();
      const stop = () =>
        new Promise((resolve) => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
            console.log("record..");
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const handleAction = async () => {
    // await sleep(3000);
    // await sleep(3000);
    // actionButton.disabled = false;
  };

  const fetchAudioList = () => {
    podcastService.getAudioByUser(currentUser._id).then((data) => {
      console.log(data);
      setAudioList(data);
    });
  };

  React.useEffect(() => {
    initVoxeet();
    fetchAudioList();
  }, []);

  const saveRecording = (blob) => {
    const data = new FormData();
    const d = new Date();
    const path =
      "recording_" +
      d.getMonth() +
      d.getDate() +
      d.getHours() +
      d.getMinutes() +
      ".mp3";
    data.append("file", audio.audioBlob, path);
    podcastService.uploadFile(data).then((res) => {
      console.log(res);
      const form = {
        title: audioTitle,
        artist: currentUser._id,
        created: new Date(),
        file: path,
      };
      podcastService.addAudio(form).then((data) => {
        console.log(data);
        fetchAudioList();
      });
    });
  };

  const handleJoin = (e) => {
    VoxeetSDK.conference
      .create({ alias: aliasName })
      .then((conference) =>
        VoxeetSDK.conference.join(conference, { liveRecording: true })
      )
      .then((con) => {
        setMuted(false);
        console.log(con);
        setJoined(true);
        const parts = VoxeetSDK.conference.participants;
        console.log(parts);
        setCurrentPart(Array.from(parts.values()).pop());
      })
      .catch((e) => console.log("Something wrong happened : " + e));
  };

  const handleStart = (e) => {
    setAliasName(currentUser.fullname);
    VoxeetSDK.conference
      .create({ alias: currentUser.fullname })
      .then((conference) =>
        VoxeetSDK.conference.join(conference, { liveRecording: true })
      )
      .then((con) => {
        setMuted(false);
        console.log(con);
        setConference(con);
        // VoxeetSDK.conference.on("joined", (user) => {
        //     console.log(user);
        //     setParticipants([user]);
        // });
        const parts = VoxeetSDK.conference.participants;
        console.log(parts);
        setCurrentPart(parts.values().next().value);
        VoxeetSDK.conference.on("participantAdded", (user) => {
          console.log(user);
          setParticipants([...participants, user]);
        });
        setJoined(true);
      })
      .catch((e) => console.log("Something wrong happened : " + e));
  };

  const handleLeave = (e) => {
    VoxeetSDK.conference
      .leave()
      .then(() => {
        setJoined(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRecord = () => {
    recordAudio().then((target) => {
      target.start();
      console.log(target);
      setRecorder(target);
    });
    console.log(VoxeetSDK.conference.participants);
  };

  const handleStop = () => {
    recorder.stop().then((audio) => {
      setAudio(audio);
    });
  };

  const handlePlay = () => {
    audio.play();
  };

  const handleAudioStop = () => { };

  const handleAliasChange = (e) => {
    setAliasName(e.target.value);
  };

  const getParts = () => {
    const parts = VoxeetSDK.conference.participants;
    console.log(parts);
  };

  const showMic = () => {
    if (muted) {
      return <MicOffIcon />;
    } else {
      return <MicIcon />;
    }
  };

  const handleMute = () => {
    if (muted) {
      console.log("unmute");
      VoxeetSDK.conference.startAudio(currentPart).then((data) => {
        console.log(data);
        setMuted(false);
      });
    } else {
      console.log("mute");
      VoxeetSDK.conference.stopAudio(currentPart).then((data) => {
        console.log(data);
        setMuted(true);
      });
    }
  };

  const renderAudioList = () => {
    if (audioList) {
      return audioList.map(audio => {
        return (
          <li key={audio._id} className="list-group-item bg-dark text-white">{audio.title}</li>
        )
      })
    }
  }

  return (
    <div className="col-md-10 mx-auto">
      <Card className="mt-5">
        <CardContent>
          <h2>Audio Conference</h2>
          <hr />
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={(e) => setAliasName(e.target.value)}
            value={aliasName}
            label="Enter Conference Name to Join"
          />
          <Button color="primary" disabled={joined} onClick={handleJoin}>
            Join Conference
          </Button>
          <Button color="primary" disabled={joined} onClick={handleStart}>
            Start Conference
          </Button>
          <Button color="primary" disabled={!joined} onClick={handleLeave}>
            Leave Conference
          </Button>
          <div className="parts">
            <h4>Conference Participants</h4>
            <ul className="list-group"></ul>
          </div>
          <div className="col-md-8 mx-auto">
            <div className="row">
              <div className="col mx-auto">
                <IconButton
                  onClick={handleMute}
                  disabled={!joined}
                  color="inherit"
                  aria-label="Toggle Audio"
                  component="span"
                >
                  {showMic()}
                </IconButton>
              </div>
              <div className="col mx-auto">
                <IconButton
                  disabled
                  color="inherit"
                  aria-label="upload picture"
                  component="span"
                >
                  <FiberManualRecordIcon />
                </IconButton>
              </div>
              <div className="col mx-auto">
                <IconButton
                  disabled
                  color="inherit"
                  aria-label="upload picture"
                  component="span"
                >
                  <PlayArrowIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="row">
        <div className="col-md-6">
          <Card className="mt-5">
            <CardContent>
              <h2>Group Voice Studio</h2>
              <hr />
              <div className="row">
                <div className="col mx-auto">
                  <IconButton
                    onClick={handleRecord}
                    color="inherit"
                    aria-label="upload picture"
                    component="span"
                  >
                    <FiberManualRecordIcon />
                  </IconButton>
                </div>
                <div className="col mx-auto">
                  <IconButton
                    onClick={handleStop}
                    color="inherit"
                    aria-label="upload picture"
                    component="span"
                  >
                    <StopIcon />
                  </IconButton>
                </div>
                <div className="col mx-auto">
                  <IconButton
                    onClick={handlePlay}
                    color="inherit"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </div>
              </div>
              <TextField
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
              ></TextField>
              <Button onClick={saveRecording}>Save Recording</Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className={clsx(styles.listCard, "mt-5")}>
            <CardContent>
              <h2>Recording List</h2>
              <hr />
              <ul className="list-group">{renderAudioList()}</ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecordPodcast;
