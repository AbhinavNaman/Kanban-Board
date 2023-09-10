//NoteCard.js
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { deletePost, updatePin, fetchNotes } from "../actions/notes";
import { useDispatch } from "react-redux";
import "./NoteCard.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const NoteCard = ({ prop, currentId, setCurrentId, setOpen, index }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Draggable draggableId={`${prop?._id}`} key={prop?._id} index={index}>
        {(provided, snapshot) => (
          <Grid item xs={12} sm={12} md={12}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgb(36, 35, 35)",
                color: "white",
                border: "1px solid #f4b304",
                borderRadius: "10px",
              }}
              className="expand-on-hover"
              // draggable={true}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              // isDragging={snapshot.isDragging}
            >
              <CardContent
                sx={{ flexGrow: 1 }}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentId(prop?._id);
                  setOpen(true);
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  style={{ textDecoration: "underline" }}
                >
                  {prop?.title}
                </Typography>

                <Typography gutterBottom>{prop?.tagline}</Typography>
                <Typography>{prop?.about}</Typography>
              </CardContent>
              <hr style={{ border: "1px solid #f4b304" }} />
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(deletePost(prop?._id)).then(() => {
  dispatch(fetchNotes())})
                    setCurrentId(null); // Reset the currentId
                    setOpen(false);
                  }}
                  style={{
                    color: "rgb(36, 35, 35)",
                    backgroundColor: "#f4b304",
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
            <br />
            {provided.placeholder}
          </Grid>
        )}
      </Draggable>
    </>
  );
};

export default NoteCard;
