import clsx from "clsx";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { PodcastContext } from "../../providers/podcastContext";
import { UserContext } from "../../providers/userContext";
import update from 'immutability-helper';

import { Card, CardContent, Grid, TextField, MenuItem, Button, FormControlLabel, FormControl, InputLabel, Select, makeStyles, Input, Checkbox, ListItemText } from "@material-ui/core";
import { useEffect } from "react";

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




const CreateSeries = () => {

    const classes = useStyles();
    const podcastService = useContext(PodcastContext);
    const userService = useContext(UserContext);
    const [imgPath, setImgPath] = useState("");
    const [file, setFile] = useState("");
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const fetchPodcastList = () => {
        podcastService.getByArtist(currentUser._id)
            .then(data => {
                setPodcastList(data);
                console.log(data);
                initSelPodcast(data);

            })
    }

    const initSelPodcast = podcastList => {
        console.log(podcastList);
        let list = [];
        for (let podcast of podcastList) {
            list.push({ podcast: podcast, selected: false })
        }
        console.log(list);
        setSelectedPodcasts(list);
    }

    const [podcastList, setPodcastList] = useState([]);
    const [selectedPodcasts, setSelectedPodcasts] = useState([]);

    useEffect(() => {
        fetchPodcastList();
    }, [])


    const handleSelect = (e, index) => {
        console.log(e.target.checked);

        const newData = update(selectedPodcasts, {
            [index]: {
                selected: { $set: e.target.checked }
            }
        });


        setSelectedPodcasts(newData);
        console.log(selectedPodcasts);
    }



    // const MenuProps = {
    //     PaperProps: {
    //         style: {
    //             maxHeight: 10 * 4.5 + 5,
    //             width: 250,
    //         },
    //     },
    // };

    const seriesForm = {
        title: "",
        description: "",
        artist: "",
        created: new Date(),
        podcasts: Array,
        category: 'Society'
    }

    const onFormSubmit = (value) => {
        value['artist'] = userService.currentUser._id;
        let podcasts = [];
        for (let podcast of selectedPodcasts) {
            podcasts.push(podcast.podcast);
        }

        value['podcasts'] = podcasts;
        value['thumb'] = file;
        console.log(value);

        podcastService.addSeries(value)
            .then(data => {
                console.log(data);
            })
    }

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


    const renderForm = () => {
        if (userService.currentUser) {
            return (
                <Formik initialValues={seriesForm} onSubmit={onFormSubmit}>
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
                                    {
                                        selectedPodcasts.map((podcast, index) => {
                                            return (
                                                <FormControlLabel className="w-100"
                                                    control={<Checkbox checked={podcast.selected} onChange={e => handleSelect(e, index)} name={podcast.podcast.title} />}
                                                    label={podcast.podcast.title}
                                                />
                                            )
                                        })
                                    }

                                </Grid>

                                <Grid item xs={12}>

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

                            <Grid container justify="flex-end"></Grid>
                        </form>
                    )}
                </Formik>
            );
        }
    };

    return (
        <div className="col-md-10 mx-auto">
            <Card>
                <CardContent>
                    {renderForm()}
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateSeries;