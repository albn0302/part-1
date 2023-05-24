export function getNotes() {
  const note = JSON.parse(localStorage.getItem('notes'))
  return note ? [...note] : []
}

export async function addNote(note, notes) {
  notes.push(note)
  const msg = localStorage.setItem('notes', JSON.stringify(notes))
  return !msg ? 'Note added!' : new Error('Something went wrong...')
}

export async function editNote(noteId) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === noteId);
  const title = prompt('New title')
  const body = prompt('New content')
  notes.splice(index, 1, { id: noteId, title: title, body: body })
  localStorage.setItem('notes', JSON.stringify(notes));
  window.location.reload()
}

export async function deleteNote(noteId) {
  const notes = await getNotes()
  const index = notes.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.reload()
  } else {
    throw new Error('Note not found!');
  }
}