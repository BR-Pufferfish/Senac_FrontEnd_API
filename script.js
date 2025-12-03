// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function loginUser() {
    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const email = document.querySelector("#email")
        const senha = document.querySelector("#senha")

        console.log(email.value, senha.value)

        const usuario = {
            email: email.value,
            senha: senha.value
        }

        const response = await fetch(`${baseUrl}/Usuario/login`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(usuario)
        })
        if (!response.ok) {
            openModal()
        } else {
            const user = await response.json()
            console.log(user, "POST LOGIN - Usuário")
            location.href = "../Home/"
        }
    })
}
loginUser()






function openModal() {
    const body = document.body

    body.insertAdjacentHTML("beforeend",
        `<div class="wrapper">
        <div class="modal">
            <button id="close">X</button>
            <p>Algo deu errado! tente novamente</p>
        </div>
    </div>`)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
}