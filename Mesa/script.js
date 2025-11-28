const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getMesa() {
    const response = await fetch(`${baseUrl}/Mesa`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(mesa => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${mesa.numeroMesa}</p>
                <button id='${mesa.id}-delete'>Excluir</button>
                <button id='${mesa.id}-edit'>Editar</button>
             </li>
            `)


        const btnExcluir = document.getElementById(`${mesa.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", mesa.id)
            deleteMesa(mesa.id)
        })


        const btnEditar = document.getElementById(`${mesa.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", mesa.id)
            putMesa(mesa.id)
        })
    })
}
getMesa()






async function postMesa() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const numeroMesa = document.querySelector("#numeroMesa")
        const situacaoMesa = document.querySelector("#situacaoMesa")


        const mesa = {
            numeroMesa: numeroMesa.value,
            situacaoMesa: situacaoMesa.value
        }


        const response = await fetch(`${baseUrl}/Mesa`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(mesa)
        })


        const confirmar = await response.json()
        console.log(confirmar, "postMesa - Mesa adicionada")
    })
}






async function putMesa(id) {
    const numeroMesa = document.querySelector("#numeroMesa")
    const situacaoMesa = document.querySelector("#situacaoMesa")

    const mesa = {
        numeroMesa: numeroMesa.value,
        situacaoMesa: situacaoMesa.value
    }

    const response = await fetch(`${baseUrl}/Mesa/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(mesa)
    })

    const confirmar = await response.json()
    console.log(confirmar, "putMesa - Mesa atualizada")
}







async function deleteMesa(id) {
    const response = await fetch(`${baseUrl}/Mesa/${id}`, {
        method: "DELETE"
    })
    console.log(response, "deleteMesa - Mesa excluída")
}