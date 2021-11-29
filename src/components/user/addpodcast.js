import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from "../../providers/userContext";
import { useHistory } from "react-router";
import { Formik } from "formik";
import {
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import { PodcastContext } from "../../providers/podcastContext";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Addpodcast() {
  const classes = useStyles();
  const history = useHistory();
  const [publishNow, setPublishNow] = React.useState(true);
  const [file, setFile] = useState("");
  const podcastService = useContext(PodcastContext);
  const userService = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [imgPath, setImgPath] = useState("");
  const [useExisting, setUseExisting] = useState(false);
  const [audioList, setAudioList] = useState([]);
  const [selAudio, setSelAudio] = useState("");
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));


  const addPodcast = {
    publishdate: "",
    category: "society",
    title: "",
    description: "",
    created: new Date(),
    published: false,
    artist: "",
    podcastfile: "",
    publishDate: "",
  };

  const onFormSubmit = (value, { setSubmitting }) => {
    console.log(value);

    if (useExisting) {
      value["podcastfile"] = selAudio;
    } else {
      value["podcastfile"] = file;
    }
    value["artist"] = userService.currentUser._id;
    value['publishDate'] = new Date();
    value['thumb'] = imgPath;
    console.log(value);
    setSubmitting = true;

    podcastService.addPodcast(value).then((res) => {

      console.log(res);
      setOpen(true);
    });
  };

  const fetchAudioList = () => {
    podcastService.getAudioByUser(currentUser._id)
      .then(data => {
        console.log(data);
        setAudioList(data);
      })
  }

  useEffect(() => {
    fetchAudioList();
  }, [])



  const handleUpload = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    setFile(event.target.files[0].name);
    podcastService.uploadFile(data).then((res) => console.log(res));

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // erroMsg = 'Only images are supported.';
      return;
    }
  };

  const uploadThumbnail = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    setFile(event.target.files[0].name);
    podcastService.uploadFile(data).then((res) => console.log(res));

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // erroMsg = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setImgPath(reader.result);
    };
  };

  const showThumb = () => {
    if (imgPath) {
      return (
        <img src={imgPath} className="img-fluid" />
      )
    }
  }

  const showAddFile = () => {
    if (useExisting) {
      return (
        <FormControl variant="filled" className={clsx(classes.formControl, "w-100")}>
          <InputLabel id="audio">Select Audio File</InputLabel>
          <Select
            labelId="audio"
            id="audio"
            name="audio"
            value={selAudio}
            onChange={e => setSelAudio(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              audioList.map(audio => {
                return (
                  <MenuItem value={audio.file}>{audio.title}</MenuItem>
                )
              })
            }

          </Select>
        </FormControl>
      )
    } else {
      return (
        <div>
          <label>Upload File</label>
          <input
            type="file"
            className="form-control"
            onChange={handleUpload}
          />
        </div>
      )
    }
  }

  const renderForm = () => {
    if (userService.currentUser) {
      return (
        <Formik initialValues={addPodcast} onSubmit={onFormSubmit}>
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="title"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Podcast Title"
                    value={values.title}
                    onChange={handleChange}
                    autoFocus
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="description"
                    label="Podcast Description"
                    name="description"
                    autoComplete="description"
                    value={values.description}
                    onChange={handleChange}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="filled" className={clsx(classes.formControl, "w-100")}>
                    <InputLabel id="cate">Category</InputLabel>
                    <Select
                      labelId="cate"
                      id="category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"society"}>Society</MenuItem>
                      <MenuItem value={"comedy"}>Comedy</MenuItem>
                      <MenuItem value={"interview"}>Interview</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox id="existing" checked={useExisting} onChange={e => setUseExisting(e.target.checked)} />}
                    label="Use Existing Recordings"
                  />
                  {showAddFile()}

                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={uploadThumbnail}
                  />
                  {showThumb()}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Upload Podcast
              </Button>

              <FormControlLabel
                control={<Checkbox id="published" checked={values.published} onChange={handleChange} />}
                label="Publish Instantly"
              />

              <Grid container justify="flex-end"></Grid>
            </form>
          )}
        </Formik>
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        TransitionComponent={Fade}
      >
        <Alert severity="success">Podcast Successfully Added</Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CloudUploadIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload a Podcast
        </Typography>

        {renderForm()}

      </div>
    </Container>
  );
}
