const baseUrl = "https://localhost:7166/api"
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
postUsuario()






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