const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }





// Ação ao clicar no botão Adicionar Reserva
const novoUsuario = document.querySelector("#novoUsuario")
novoUsuario.addEventListener("click", modalPostUsuario)

function modalPostUsuario() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="nome"></label>
                    <input type="text" id="nome" placeholder="Ex: Shaolin">

                    <label for="email"></label>
                    <input type="text" id="email" placeholder="Ex: shaolin@email.com">

                    <label for="senha"></label>
                    <input type="text" id="senha" placeholder="Ex: Flavinho2025">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)


    postUsuario()

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
}






async function getUsuario() {
    const response = await fetch(`${baseUrl}/Usuario`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(usuario => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${usuario.nome}</p>
                <p>${usuario.email}</p>
                <button id='${usuario.id}-delete'>Excluir</button>
                <button id='${usuario.id}-edit'>Editar</button>
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
            putUsuario(usuario.id)
        })


    })
}
getUsuario()






async function postUsuario() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const nome = document.querySelector("#nome")
        const email = document.querySelector("#email")
        const senha = document.querySelector("#senha")

        console.log(nome.value, email.value, senha.value)

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

        const user = await response.json()
        console.log(user, "usuario criado")
    })
}
// postUsuario()






async function putUsuario(id) {
    const nome = document.querySelector("#nome")
    const email = document.querySelector("#email")
    const senha = document.querySelector("#senha")

    const usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }

    const response = await fetch(`${baseUrl}/Usuario/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(usuario)
    })

    const user = await response.json()
    console.log(user, "usuario atualizado")
}







async function deleteUsuario(id) {
    const response = await fetch(`${baseUrl}/Usuario/${id}`, {
        method: "DELETE"
    })

    const user = await response.json()
    console.log(user, "usuario deletado")
}