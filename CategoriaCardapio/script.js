import { baseUrl } from "../baseUrl.js"
import { categoraiCardapio } from "../baseUrl.js"
import { excluir_registro } from "../zzz_confirmacoes/excluir_registro.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getCategoriaCardapio() {
    const response = await fetch(`${baseUrl}/${categoraiCardapio}`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(categoria => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${categoria.nome}</p>
                <div class="botoes">
                    <button class="botoesEditarExcluir" id="edit-${categoria.id}">Editar</button>
                    <button class="botoesEditarExcluir" id="${categoria.id}-delete">Excluir</button>
                </div>
            </li>
        `)

        const btnExcluir = document.getElementById(`${categoria.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", categoria.id)
            deleteCategoria(categoria.id)
        })

        const btnEditar = document.getElementById(`edit-${categoria.id}`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", categoria.id)
            putCategoria(categoria)
        })
    })
}
getCategoriaCardapio()






// Ação ao clicar no botão Adicionar
const novaCategoria = document.querySelector("#novaCategoria")
novaCategoria.addEventListener("click", modalPostCategoria)

async function modalPostCategoria() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="nomeCategoria">Categoria</label>
                    <input type="text" id="nomeCategoria" placeholder="Ex: Bebidas">

                    <label for="descricaoCategoria">Descrição</label>
                    <input type="text" id="descricaoCategoria" placeholder="Ex: Bebibas diversas">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
        location.reload()
    })

    await postCategoria();
}






async function postCategoria() {

    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const nome = document.querySelector("#nomeCategoria")
        const descricao = document.querySelector("#descricaoCategoria")


        const categoria = {
            nome: nome.value,
            descricao: descricao.value
        }


        const response = await fetch(`${baseUrl}/${categoraiCardapio}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(categoria)
        })


        const confirmar = await response.json();
        console.log(confirmar, "POST - Categoria adicionada")
    })
}






function abrirModalEdit(categoriaEdit) {

    const body = document.body
    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button class="close" id="close">X</button>
                <form>
                    <label for="nomeCategoria">Categoria</label>
                    <input type="text" id="nomeCategoria" value="${categoriaEdit.nome}">

                    <label for="descricaoCategoria">Descrição</label>
                    <input type="text" id="descricaoCategoria" value="${categoriaEdit.descricao}">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
        location.reload()
    })
}






async function putCategoria(categoriaEdit) {

    abrirModalEdit(categoriaEdit)
    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()


        const nomeCategoria = document.querySelector("#nomeCategoria")
        const descricaoCategoria = document.querySelector("#descricaoCategoria")

        const categoria = {
            nome: nomeCategoria.value,
            descricao: descricaoCategoria.value
        }

        const response = await fetch(`${baseUrl}/${categoraiCardapio}/${categoriaEdit.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(mesa)
        })

        const confirmar = await response.json()
        console.log(confirmar, "PUT - Categoria atualizada")

    })
}






async function deleteCategoria(id) {

    const confirmar = await excluir_registro();
    console.log(confirmar, "confirmação recebida no script.js")

    if (confirmar) {

        const response = await fetch(`${baseUrl}/${categoraiCardapio}/${id}`, {
            method: "DELETE",
            headers: headers
        })
        console.log(response, "DELETE - Categoria excluída")
        location.reload()
    }
}