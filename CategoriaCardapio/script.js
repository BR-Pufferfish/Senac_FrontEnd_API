import { basseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }

const novaCategoria = document.querySelector("#novaCategoria")
novaCategoria.addEventListener("click", modalPostCategoria)

function modalPostCategoria() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="nome"></label>
                    <input type="text" id="nome" placeholder="Ex: Bebidas">
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    modalPostCategoria()

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
}

async function getCategoriaCardapio() {
    const response = await fetch(`${basseUrl}/CategoriaCardapio`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(categoria => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${categoria.nome}</p>
                <button id='edit-${categoria.id}'>Editar</button>
                <button id='${categoria.id}-delete'>Excluir</button>
            </li>
        `)

        const btnExcluir = document.getElementById(`${categoria.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", categoria.id)
            deleteCategoriaCardapio(categoria.id)
        })

        const btnEditar = document.getElementById(`edit-${categoria.id}`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", categoria.id)
            modalEditCategoriaCardapio(categoria)
        })
    })
}
getCategoriaCardapio()

async function postCategoriaCardapio() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const nome = document.querySelector("#nome").value
        const descricao = document.querySelector("#descricao").value

        console.log(nome.value, descricao.value)

        const categoria = {
            nome: nome,
            descricao: descricao
        }

        const response = await fetch(`${basseUrl}/CategoriaCardapio`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(categoria)
        })

        const categoriaPost = await response.json()
        console.log(categoriaPost, "Categoria criada com sucesso")
    })
}
// postCategoriaCardapio()

async function deleteCategoriaCardapio(id) {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper-delete">
            <div class="modal-delete">
                <p>Tem certeza que deseja excluir esta categoria do cardápio?</p>
                <button id="confirm-delete">Sim</button>
                <button id="cancel-delete">Não</button>
            </div>
        </div>
        `)
    const confirmDelete = document.querySelector("#confirm-delete")
    close.addEventListener("click", async () => {
        const wrapperDelete = document.querySelector(".wrapper-delete")
        wrapperDelete.remove()
    })

    const nome = document.querySelector("#nome")
    const descricao = document.querySelector("#descricao")

    const categoriaPut = {
        nome: nome.value,
        descricao: descricao.value
    }

    const response = await fetch(`${basseUrl}/CategoriaCardapio/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(categoriaPut)
    })

    const categoria = await response.json()
    console.log(categoria, "Categoria editada com sucesso")
}

async function deleteCategoriaCardapio(id) {
    const response = await fetch(`${basseUrl}/CategoriaCardapio/${id}`, {
        method: "DELETE",
        headers: headers
    })
    const categoriaDeletada = await response.json()
    console.log(categoriaDeletada, "Categoria deletada com sucesso")
    location.reload()
}