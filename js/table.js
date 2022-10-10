export default function createRow() {
  const tr = document.createElement('tr')

  tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/jessicaandreoli.png" alt="imagem de Jessica Andreoli">
        <a href="https://github.com/jessicaandreoli" target="_blank">
          <p>Jessica Andreoli</p>
          <span>jessicaandreoli</span>
        </a>
      </td>
      <td class="repositories">
        76
      </td>
      <td class="followers">
        9589
      </td>
      <td>
        <button class="remove" >Remover</button>
      </td>
    `
  return tr

}

