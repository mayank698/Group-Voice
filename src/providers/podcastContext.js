import React, { useEffect } from "react";
import { createContext } from "react";
import app_config from "../config";

export const PodcastContext = createContext();

export const PodcastProvider = (props) => {
  const url = app_config.api_url + "/podcast";
  const url2 = app_config.api_url + "/series";
  const url3 = app_config.api_url + "/audio";

  useEffect(() => { }, []);

  const addPodcast = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(url + "/add", requestOptions).then((response) =>
      response.json()
    );
  };

  const addSeries = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(url2 + "/addseries", requestOptions).then((response) =>
      response.json()
    );
  };

  const addAudio = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(url3 + "/add", requestOptions).then((response) =>
      response.json()
    );
  };

  const getAudioByUser = id => {

    return fetch(url3 + "/getbyuser/" + id).then((response) =>
      response.json()
    );
  };

  const uploadFile = (data) => {
    const requestOptions = {
      method: "POST",
      body: data,
    };

    return fetch(app_config.api_url + "/util/uploadfile", requestOptions).then(
      (response) => response.json()
    );
  };

  const getById = (id) => {
    return fetch(url + "/getbyid/" + id).then((response) => response.json());
  };

  const getAll = () => {
    return fetch(url + "/getall/").then((response) => response.json());
  };

  const deletePodcast = (id) => {
    return fetch(url + "/delete/" + id, { method: "DELETE" }).then((response) =>
      response.json()
    );
  };

  const getByArtist = (id) => {
    return fetch(url + "/getbyauthor/" + id).then((response) => response.json());
  };

  const updatePodcast = (data) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(url + "/update", requestOptions).then((response) =>
      response.json()
    );
  };
  const getAllSeries = () => {
    return fetch(url2 + "/getall/").then((response) => response.json());
  };

  const getSeriesById = (id) => {
    return fetch(url2 + "/getbyid/" + id).then((response) => response.json());
  };

  const getByAuthor = (id) => {
    return fetch(url2 + "/getbyauthor/" + id).then((response) => response.json());
  };

  const AddRating = (id, reviewData) => {


    return newRating(reviewData)
      .then(data => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews: data._id })
        }
        return fetch(url2 + '/addreview/' + id, requestOptions)
          .then(response => response.json());
      })

  }

  const newRating = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(app_config.api_url + '/review/add', requestOptions)
      .then(response => response.json());
  }


  const toProvide = {
    addPodcast,
    getById,
    updatePodcast,
    deletePodcast,
    uploadFile,
    getAll,
    getAllSeries,
    getByAuthor,
    getByArtist,
    addSeries,
    getSeriesById,
    addAudio,
    getAudioByUser,
    AddRating,
  };

  return (
    <PodcastContext.Provider value={toProvide}>
      {props.children}
    </PodcastContext.Provider>
  );
};
