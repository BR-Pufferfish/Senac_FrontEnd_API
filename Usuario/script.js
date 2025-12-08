import { baseUrl } from "../baseUrl.js"
import { excluir_registro } from "../zzz_confirmacoes/excluir_registro.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getUsuario() {
    const response = await fetch(`${baseUrl}/Usuario`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(usuario => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${usuario.nome}</p>
                <p>${usuario.email}</p>
                <button class='botoesEditarExcluir' id='${usuario.id}-edit'>Editar</button>
                <button class='botoesEditarExcluir' id='${usuario.id}-delete'>Excluir</button>
             </li>
            `)


        const btnExcluir = document.getElementById(`${usuario.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", usuario.id)
            deleteUsuario(usuario.id)
        })


        const btnEditar = document.getElementById(`${usuario.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", usuario.id)
            putUsuario(usuario)
        })


    })
}
getUsuario()






// Ação ao clicar no botão Adicionar
const novoUsuario = document.querySelector("#novoUsuario")
novoUsuario.addEventListener("click", modalPostUsuario)

async function modalPostUsuario() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button class="close" id="close">X</button>
                <form>
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Nome">

                    <label for="email">Email</label>
                    <input type="text" id="email" placeholder="Ex: email@gmail.com">

                    <label for="senha">Senha</label>
                    <input type="text" id="senha" placeholder="Ex: Senha2025">

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

    await postUsuario();
}






async function postUsuario() {

    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const nome = document.querySelector("#nome")
        const email = document.querySelector("#email")
        const senha = document.querySelector("#senha")


        const usuario = {
            nome: nome.value,
            email: email.value,
            senha: senha.value
        }


        const response = await fetch(`${baseUrl}/Usuario`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(usuario)
        })

        const confirmar = await response.json()
        console.log(confirmar, "POST - Usuário adicionado")
    })
    // location.reload()
}






function abrirModalEdit(userEdit) {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button class="close" id="close">X</button>
                <form>
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" value="${userEdit.nome}">

                    <label for="email">Email</label>
                    <input type="text" id="email" value="${userEdit.email}">

                    <label for="senha">Senha</label>
                    <input type="text" id="senha" value="${userEdit.senha}">

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






async function putUsuario(userEdit) {

    abrirModalEdit(userEdit)
    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const nome = document.querySelector("#nome")
        const email = document.querySelector("#email")
        const senha = document.querySelector("#senha")

        const usuario = {
            nome: nome.value,
            email: email.value,
            senha: senha.value
        }

        const response = await fetch(`${baseUrl}/Usuario/${userEdit.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(usuario)
        })

        const confirmar = await response.json()
        console.log(confirmar, "PUT - Usuário atualizado")
    })
    // location.reload()
}







async function deleteUsuario(id) {

    const confirmar = await excluir_registro();
    console.log(confirmar, "confirmação recebida no script.js")

    if (confirmar) {

        const response = await fetch(`${baseUrl}/Usuario/${id}`, {
            method: "DELETE"
        })
        console.log(response, "DELETE - usuario deletado")
        location.reload()
    }
}