//server>controller>jobs.js
import express from "express";
import mongoose from "mongoose";

import taskPost from "../models/taskPost.js";

const router = express.Router();

export const fetchNotes = async (req, res) => {
  try {
    const notes = await taskPost.find();

    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const { title, about } = req.body;

  const newNote = new taskPost({ title, about });

  try {
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, about } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, about };

  await taskPost.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const {tag} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const existingNote = await taskPost.findById(id);

    if (!existingNote) return res.status(404).send(`No post with id: ${id}`);


    await taskPost.findByIdAndUpdate(
      id,
      { tag: tag },
      { new: true }
    );

    res.json({ message: "Post pinned successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await taskPost.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
