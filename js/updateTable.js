import createRow from "./table.js"
import { loadUsersFromLocalStorage, confirmDeleteUser, restoreColorButtonToInit } from "./user.js"

const tbody = document.querySelector('tbody')
const containerNoFavorites = document.querySelector('.container')

export function buildTable() {
  removeAllTr()

  const users = loadUsersFromLocalStorage()

  users.forEach(user => {
    buildRow(user)
  })

  if(users == '') {
    removeHide(containerNoFavorites)
  }
}

function removeAllTr() {
  const tr = document.querySelectorAll('tbody tr')
  if (tr !== null) {
    tr.forEach((tr) => {
      tr.remove()
    })
  
  }
}

function buildRow(user) {
  AddHide(containerNoFavorites)
  restoreColorButtonToInit()

  const row = createRow()

  row.querySelector('.user img').src = `https://github.com/${user.login}.png`
  row.querySelector('.user img').alt = `Imagem de ${user.name}`
  row.querySelector('.user p').textContent = user.name
  row.querySelector('.user span').textContent = user.login
  row.querySelector('.repositories').textContent = user.public_repos
  row.querySelector('.followers').textContent = user.followers
  row.querySelector('.remove').addEventListener('click', ()=> {
    confirmDeleteUser(user.login)
  })

  tbody.append(row)
}

function AddHide(element) {
  element.classList.add('hide')
}

function removeHide(element) {
  element.classList.remove('hide')
}