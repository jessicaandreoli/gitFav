import { GithubUser } from "./index.js"
import { buildTable } from "./updateTable.js"

let entries = loadUsersFromLocalStorage()
const button = document.querySelector ('button')

export function loadUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem('@github-favorites:')) || []
}

function filter(user) {
  
  const filteredEntries = entries.filter(entry => entry.login !== user)
  entries = filteredEntries

  saveUsers(entries)
  buildTable()
}

export function confirmDeleteUser(user) {
  const isOk = confirm('Tem certeza que deseja deletar essa linha?')
  if (isOk) {
    deleteUser(user)
  }
}

function deleteUser(user) {
  filter(user)
}


export function onAddValueInput() {

  const addButton = document.querySelector('.search button')
  
  addButton.addEventListener('click', () => {
    changeColorButton()
    const { value } = document.querySelector('.search input')
    add(value)
    document.querySelector('.search input').value = ''
  }) 
    
}

export async function add(username) {
  try {
    entries = loadUsersFromLocalStorage()
    const userExists = entries.find(entry => entry.login === username)
    
    const user = await GithubUser.search(username)

    if(userExists) {
      restoreColorButtonToInit()
      throw new Error ('Usuário já cadastrado')
    }
    

    if (user.login === undefined) {
      restoreColorButtonToInit()
      throw new Error('Usuário não encontrado!')
    }

    entriesUser(user)
    buildTable()


  } catch (error) {
    alert(error.message)
  }
}

function entriesUser(user) {
  entries = [user, ...entries]
  saveUsers(entries)
}

function saveUsers(entries) {
  localStorage.setItem('@github-favorites:', JSON.stringify(entries))
}

function changeColorButton() {
  button.classList.remove('firstButton')
  button.classList.add('secondButton')
}

export function restoreColorButtonToInit() {
  button.classList.remove('secondButton')
  button.classList.add('firstButton')
  
}