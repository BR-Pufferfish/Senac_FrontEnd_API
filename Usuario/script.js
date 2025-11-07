const baseUrl = "https://localhost:7166/api"

const headers = { "content-type": "application/json; charset=utf-8" }


async function getUsuario() {
    const response = await fetch(`${baseUrl}/Usuario`)
    console.log(response, "response")
    const resJson = await response.json()

    console.log(resJson, "resjosn")
}
getUsuario()

// async function postUsuario() {
//     const obj = {
//         titulo: "Abajur",
//         descricao: "",
//         preco: 200,
//         possuiPreparo: true,
//         imagem: "",
//         tipo: ""
//     }
//     const response = await fetch(`${baseUrl}/Usuario`, {
//         method: "POST",
//         body: JSON.stringify(obj),
//         headers: headers
//     })
//     const resJson = await response.json()
//     console.log(resJson, "resJson")
// }
// postUsuario()


async function postUsuario() {
    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const usuario = {
        name: name.value,
        email: email.value
    }
    const response = await fetch(`${baseUrl}/Usuario`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(usuario)
    })
    console.log(response, "response")
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
putUsuario()


async function deleteUsuario() {
    const response = await fetch(`${baseUrl}/Usuario/1`, {
        method: "DELETE"
    })
    console.log(response, "response delete")
}
deleteUsuario()