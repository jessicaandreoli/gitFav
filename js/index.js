import { buildTable } from './updateTable.js'
import { onAddValueInput, loadUsersFromLocalStorage } from './user.js'



export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`
    return fetch(endpoint)
      .then(data => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers
      }))

  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    loadUsersFromLocalStorage()
    
  }

}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('tbody')

    buildTable()
    onAddValueInput()
  }


}