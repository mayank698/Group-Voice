import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/userContext";
import cssClasses from "../cssClasses";
import update from "immutability-helper";
import { Bar } from "react-chartjs-2";
import { PodcastContext } from "../../providers/podcastContext";

const customStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2rem",
  },
  infoTitle: {
    fontSize: "2em",
    fontWeight: "bold",
  },
  info: {
    fontSize: "4em",
    fontWeight: "bold",
  },
}));

const AdminDashboard = (props) => {
  const baseClasses = cssClasses();
  const customClasses = customStyles();
  const [usersList, setUsersList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [podcastList, setPodcastList] = useState([]);
  const [regData, setRegData] = useState({});
  const [podcastData, setPodcastData] = useState({});
  const [seriesData, setSeriesData] = useState({});
  const useService = useContext(UserContext);
  const podcastService = useContext(PodcastContext);

  const fetchUsers = () => {
    return useService.getAll().then((data) => {
      console.log(data);
      setUsersList(data);
      return data;
    });
  };

  const fetchPodcasts = () => {
    return podcastService.getAll().then((data) => {
      console.log(data);
      setPodcastList(data);
      return data;
    });
  };

  const fetchSeries = () => {
    return podcastService.getAllSeries().then((data) => {
      console.log(data);
      setSeriesList(data);
      return data;
    });
  };

  useEffect(() => {
    fetchUsers().then((data) => {
      console.log(data);
      prepareRegData(data, setRegData);
    });
    fetchSeries().then((data) => {
      console.log(data);
      prepareRegData(data, setSeriesData);
    });
    fetchPodcasts().then((data) => {
      console.log(data);
      prepareRegData(data, setPodcastData);
    });
  }, []);

  const prepareRegData = async (users, call) => {
    getDatewiseValues(users, "created").then((data) => {
      console.log(data);
      let reg = {};
      reg["dates"] = data[0];
      reg["values"] = data[1];
      call(reg);
    });
  };

  const getDatewiseValues = async (records, colname) => {
    console.log(records);
    let dates = [];
    let values = [];
    return getUniqueValues(colname, records).then((unique_values) => {
      for (let value of unique_values[1]) {
        console.log(value);
        dates.push(formatDate(new Date(value)));
        values.push(getCount(unique_values[0], value));
      }
      return [dates, values];
    });
  };

  const getUniqueValues = async (col_name, data) => {
    // console.log(col_name+' '+data);
    let values = data.map((ele) => {
      let date = new Date(ele[col_name]).setHours(0, 0, 0, 0);
      // console.log(new Date(date).getTime());
      return new Date(date).getTime();
    });

    let uniquevalues = [];
    for (let value of values) {
      if (!uniquevalues.includes(value)) {
        uniquevalues.push(value);
        // console.log(value);
      }
    }

    return [values, uniquevalues];
  };

  const getCount = (records, item) => {
    let count = 0;
    for (let record of records) {
      if (record == item) {
        count++;
      }
    }

    return count;
  };

  const drawBar = (labels, data, legend) => {
    let options = {
      maintainAspectRatio: false,
    };

    if (data) {
      return (
        <Bar
          data={{
            labels: labels,
            datasets: [{ label: legend, data: data }],
          }}
          options={options}
        />
      );
    }
  };

  const formatDate = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  };

  return (
    <div className="col-md-11 mx-auto">
      <div className="row">
        <div className="col-md-6">
          <Card className={clsx(baseClasses.card, customClasses.card)}>
            <CardContent>
              <div className="row">
                <div className="col-8">
                  <p className={customClasses.infoTitle}>Registrations : </p>
                </div>
                <div className="col-4 mx-auto">
                  <p className={customClasses.info}>{usersList.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className={clsx(baseClasses.card, customClasses.card)}>
            <CardContent>
              <div className="row">
                <div className="col-8">
                  <p className={customClasses.infoTitle}>Podcasts : </p>
                </div>
                <div className="col-4 mx-auto">
                  <p className={customClasses.info}>{podcastList.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className={clsx(baseClasses.card, customClasses.card)}>
            <CardContent>
              <div className="row">
                <div className="col-8">
                  <p className={customClasses.infoTitle}>Series: </p>
                </div>
                <div className="col-4 mx-auto">
                  <p className={customClasses.info}>{seriesList.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Card className={clsx(baseClasses.card, customClasses.card)}>
            <CardContent>
              {drawBar(regData.dates, regData.values, "Registrations")}
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className={clsx(baseClasses.card, customClasses.card)}>
            <CardContent>
              {drawBar(podcastData.dates, podcastData.values, "Podcasts")}
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
