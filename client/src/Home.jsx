//Home.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import NoteCard from "./components/TaskCard";
import { fetchNotes, createNote, updateNote } from "./actions/notes";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "7px solid #f4b304",
  borderRadius: "20px",
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setCurrentId(null);
    setPostData({ title: "", tagline: "", about: "" });
  };
  const handleClose = () => setOpen(false);

  const [currentId, setCurrentId] = useState(null);

  const note = useSelector((state) =>
    currentId ? state.notes.notes.find((n) => n._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    title: "",
    about: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (note) setPostData(note);
  }, [note]);


  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchNotes());
    };
    fetchData();
  }, []);

  const { notes } = useSelector((state) => state.notes);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateNote(currentId, postData));
    } else {
      dispatch(createNote(postData));
    }
    dispatch(fetchNotes());
    handleClose();
  };


  useEffect(() =>{
    setTodo(notes);
  },[notes])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    if (!destination) return; // Check if there's a valid destination
  
    // Find the source and destination lists
    const sourceList = getSourceList(source);
    const destinationList = getSourceList(destination);
  
    // Find the dragged task by its draggableId
    const draggedTask = sourceList.find((item) => item._id === draggableId);
  
    // Remove the task from the source list
    sourceList.splice(source.index, 1);
  
    // Insert the task at the specified destination index in the destination list
    destinationList.splice(destination.index, 0, draggedTask);
  };
  
  

  function getSourceList(source) {
    switch (source.droppableId) {
      case "todo":
        return todo;
      case "doing":
        return doing;
      case "done":
        return done;
      default:
        return [];
    }
  }


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f4b304" }}>
        <Toolbar>
          <TextSnippetIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NOTESApp
          </Typography>
          <Button
            color="inherit"
            onClick={handleOpen}
            sx={{ boxShadow: "6" }}
            style={{ border: "1px solid white" }}
          >
            Add Note
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container>
              <Grid item xs={4} sm={4} md={4}>
                <Typography style={{ color: "white" }}>ToDo</Typography>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Typography style={{ color: "white" }}>Doing</Typography>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Typography style={{ color: "white" }}>Done</Typography>
              </Grid>
            </Grid>
            <br />
            <hr />
            <br />
            <Grid container spacing={4}>
              <Droppable droppableId="todo">
                {(provided, snapshot) => (
                  <>
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {todo?.map((card, index) => (
                        <NoteCard
                        key={card._id}
                          prop={card}
                          index={index}
                          currentId={currentId}
                          setCurrentId={setCurrentId}
                          setOpen={setOpen}
                        />
                      ))}
                    </Grid>
                    {provided.placeholder}
                  </>
                )}
              </Droppable>

              <Droppable droppableId="doing">
                {(provided, snapshot) => (
                  <>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {doing?.map((card, index) => (
                      <NoteCard
                      key={card?._id}
                        prop={card}
                        index={index}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        setOpen={setOpen}
                      />
                    ))}
                  </Grid>
                  {provided.placeholder}
                  </>
                )}
              </Droppable>

              <Droppable droppableId="done">
                {(provided, snapshot) => (
                  <>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}

                  >
                    {done?.map((card, index) => (
                      <NoteCard
                        key={card._id}
                        prop={card}
                        index={index}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        setOpen={setOpen}
                      />
                    ))}
                  </Grid>
                  {provided.placeholder}
                  </>
                )}
              </Droppable>
            </Grid>
          </Container>
        </DragDropContext>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            {currentId ? "Edit Note" : "Add Note"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />

            <TextField
              margin="normal"
              id="about"
              label="Body"
              name="about"
              multiline
              rows={4}
              fullWidth
              value={postData.about}
              onChange={(e) =>
                setPostData({ ...postData, about: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#f4b304" }}
            >
              {currentId ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
