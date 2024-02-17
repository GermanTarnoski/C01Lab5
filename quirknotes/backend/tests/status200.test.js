test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {

    //first, we need to delete all notes
const preDeleteResRes = await fetch(`${SERVER_URL}/deleteAllNotes/`, {
    method: "DELETE",
  });

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response).toEqual([]);
 });

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {

      const titles = ["Note1", "Note2"];
    const contents = ["Content1", "Content2"];

    const insertedIds = [];

    for (let i = 0; i < 2; i++) {
      const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titles[i],
          content: contents[i],
        }),
      });

        const postNoteBody = await postNoteRes.json();
        insertedIds.push(postNoteBody.insertedId);
    }


  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
  const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);
  });

test("/deleteNote - Delete a note", async () => {

    //First we need to post a note, to get the id of the note and then we delete it
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

      const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${id}`, {
    method: "DELETE",
  });
  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${id} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
//Just like the deleteNote test, we need to post a note to get the id and then we patch it

    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

    const newTitle = "NewTitle";
    const newContent = "NewContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title: newTitle,
        content: newContent,
    }),
   });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${id} patched.`);
});

test("/patchNote - Patch with just title", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

    const newTitle = "NewTitle";
    const newContent = "NewContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title: newTitle,
    }),
   });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${id} patched.`);
});

test("/patchNote - Patch with just content", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

    const newTitle = "NewTitle";
    const newContent = "NewContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        content: newContent,
    }),
   });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${id} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {

    //We first need to delete all notes
const preDeleteRes = await fetch(`${SERVER_URL}/deleteAllNotes/`, {
    method: "DELETE",
  });
    //Then we need to post a note, to get the id of the note and then we delete it.
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes/`, {
    method: "DELETE",
  });
  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
    const titles = ["Note1", "Note2", "Note3"];
    const contents = ["Content1", "Content2", "Content3"];

    const insertedIds = [];

    for (let i = 0; i < 3; i++) {
      const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titles[i],
          content: contents[i],
        }),
      });

        const postNoteBody = await postNoteRes.json();
        insertedIds.push(postNoteBody.insertedId);
    }

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes/`, {
    method: "DELETE",
  });
  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

    const postNoteBody = await postNoteRes.json();
    const id = postNoteBody.insertedId;

    const newTitle = "NewTitle";
    const newContent = "NewContent";

    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        color: "#FF0000",
      }),
   });

    const updateNoteColorBody = await updateNoteColorRes.json();

    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe('Note color updated successfully.');

});