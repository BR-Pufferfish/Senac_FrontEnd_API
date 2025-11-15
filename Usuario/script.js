const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getUsuario() {
    const response = await fetch(`${baseUrl}/Usuario`)
    console.log(response, "response")
    const resJson = await response.json()

    console.log(resJson, "resjosn")
    const lista = document.querySelector("ul")
    resJson.forEach(usuario => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${usuario.nome}</p>
                <button id=${usuario.id}>Excluir</button>
                <button id="${usuario.id}-edit">Excluir</button>
             </li>
            `)
        const btnExcluir = document.getElementById(usuario.id)
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

        const name = document.querySelector("#name")
        const email = document.querySelector("#email")
        const senha = document.querySelector("#senha")


        const usuario = {
            name: name.value,
            email: email.value,
            senha: senha.value
        }


        const response = await fetch(`${baseUrl}/Usuario`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(usuario)
        })


        console.log(response, "response")
    })
}
postUsuario()






async function putUsuario() {
    const name = document.querySelector("#name")
    const email = document.querySelector("#email")

    const usuario = {
        name: name.value,
        email: email.value
    }

    const response = await fetch(`${baseUrl}/Usuario/1`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(usuario)
    })

    const user = await response.json()
    console.log(user, "user atualizado")
}







async function deleteUsuario(id) {
    const response = await fetch(`${baseUrl}/Usuario/${id}`, {
        method: "DELETE"
    })
    console.log(response, "response delete")
}