import { Button, Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cssClasses from "../cssClasses";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/userContext";

const ManageUser = props => {

  const userService = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseClasses = cssClasses();

  const fetchUsers = () => {
    userService.getAll()
      .then(data => {
        console.log(data);
        setUserList(data);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const deleteUser = (id) => {
    userService.deleteUser(id)
      .then(res => {
        console.log(res);
        fetchUsers();
      })
  }

  const displayUsers = () => {
    return userList.map((user, index) => {
      if (!loading) {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{user.fullname}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <div style={{ display: 'block' }}>
                <p>Email</p>
                <p>{user.email}</p>

                <hr />

                <Button varaint="outline">Update</Button>
                <Button
                  varaint="outline"
                  color="secondary"
                  onClick={(e) => deleteUser(user._id)}
                >
                  Delete
                </Button>
              </div>




            </AccordionDetails>
          </Accordion>
        );
      } else {
        return;
      }
    });
  };

  return <div style={{ marginTop: "5rem" }}>{displayUsers()}</div>;
}

export default ManageUser;