import './style.css'
import { getNotes, addNote, deleteNote, editNote } from './notes.js'
import { v4 as uuidv4 } from 'uuid';

const notes = getNotes()

async function handleSubmit(event) {
  event.preventDefault()
  const note = {
    id: uuidv4(),
    title: event.target[0].value,
    body: event.target[1].value,
    date: new Date().toLocaleDateString
  }

  const msg = await addNote(note, notes)

  console.log(msg)

  window.location.reload()
}

function displayNotes(notes) {
  document.querySelector('#app').innerHTML = `
  <nav class="navbar">
      <div>
        <button id="langSwe">Svenska</button>
        <button id="langSuo">Suomi</button>
      </div>
  </nav>
  <div>
    <form id="form">
      <input type="text"></input>
      <textarea type="text" rows="5" cols="20"></textarea>
      <button class="addNote" type="submit">Add Note</button>
    </form>
    ${notes
      .map((note) => {
        return `
          <div class="notes">
            <h2>${note.title}</h2>
            <p>${note.body}</p>
            <div>
              <button class="editBtn" id="edit" value="${note.id}">edit</button>
              <button class="deleteBtn" id="delete" value="${note.id}">delete</button>
            </div>
          </div>
        `
      })
      .join('')}

  </div>
`
  const language = localStorage.getItem('lang')

  if (language == 'sv') {
    swe()
  } else if (language == null) {
    swe()
  } else {
    fin()
  }
}

displayNotes(notes)

document.querySelector('#form').addEventListener('submit', handleSubmit)

document.querySelectorAll('#delete').forEach((button) => {
  button.addEventListener('click', async (event) => {
    await deleteNote(event.target.value)
  });
})

document.querySelectorAll('#edit').forEach((button) => {
  button.addEventListener('click', async (event) => {
    await editNote(event.target.value)
  })
})

document.getElementById('langSwe').addEventListener('click', function () {
  localStorage.setItem('lang', 'sv')

  window.location.reload()
})

document.getElementById('langSuo').addEventListener('click', function () {
  localStorage.setItem('lang', 'fi')
  displayNotes(notes)

  window.location.reload()
})

function swe() {
  document.querySelectorAll('.addNote').forEach(btn => {
    btn.textContent = 'Lägg till anteckning'
  })
  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.textContent = 'Redigera'
  })
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.textContent = 'Radera'
  })
}

function fin() {
  document.querySelectorAll('.addNote').forEach(btn => {
    btn.textContent = 'Lisätä huomautus'
  })
  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.textContent = 'Muokata'
  })
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.textContent = 'Poistaa'
  })
}
