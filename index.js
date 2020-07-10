const express = require("express");
const app = express();

const path = require("path");
const PORT = process.env.PORT || 5000;

const songs = require("./album/songs");

app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/songs", (req, res) => {
  res.send(songs);
});

// POST
app.post("/songs", (req, res) => {
  const { title, album } = req.body;
  const id = songs[songs.length - 1].id + 1;
  songs.push({ id, title, album });
  console.log(id);

  res.send({
    message: "Data berhasil ditambahkan",
    songAdded: songs,
  });
});

app.get("/song/:title/:album", (req, res) => {
  const { title, album } = req.params;
  console.log(title);

  const id = songs[songs.length - 1].id + 1;
  songs.push({ id, title, album });
  console.log(id);

  res.send({
    message: "Data berhasil ditambahkan",
    songAdded: songs,
  });
});

// PUT
app.put("/song/:id", (req, res) => {
  const { id } = req.params;
  const { title, album } = req.body;

  let newTitle;
  let newAlbum;

  if (title === null || title === "") {
    newTitle = songs[id].title;
  } else {
    newTitle = title;
  }

  if (album === null || album === "") {
    newAlbum = songs[id].album;
  } else {
    newAlbum = album;
  }

  songs.splice(id, 1, {
    id,
    title: newTitle,
    album: newAlbum,
  });

  res.send({
    message: "Data berhasil diubah",
    updatedSongs: songs,
  });
});

app.get("/song/:id/:title/:album", (req, res) => {
  const { id, title, album } = req.params;

  let newTitle;
  let newAlbum;

  if (title === null || title === "") {
    newTitle = songs[id].title;
  } else {
    newTitle = title;
  }

  if (album === null || album === "") {
    newAlbum = songs[id].album;
  } else {
    newAlbum = album;
  }

  songs.splice(id, 1, {
    id,
    title: newTitle,
    album: newAlbum,
  });

  res.send({
    message: "Data berhasil diubah",
    updatedSongs: songs,
  });
});

app.delete("/song/:id", (req, res) => {
  const id = req.params.id;

  songs.splice(id, 1);

  res.send({
    message: "Data berhasil dihapus",
    updatedSongs: songs,
  });
});

app.listen(PORT, () => console.log(`Server run at PORT ${PORT}`));
