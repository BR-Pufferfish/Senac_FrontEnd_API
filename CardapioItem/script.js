const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getCardapioItem() {
    const response = await fetch(`${baseUrl}/CardapioItem`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(caItem => {


        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${caItem.titulo}</p>
                <button id=${caItem.id}>Excluir</button>
                <button id="${caItem.id}-edit">Editar</button>
             </li>
            `)


        const btnExcluir = document.getElementById(caItem.id)
        btnExcluir.addEventListener("click", async () => {
            console.log("clicou para excluir", caItem.id)
            deleteCardapioItem(caItem.id)
        })


        const btnEditar = document.getElementById(`${caItem.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", caItem.id)
            putCardapioItem(caItem.id)
        })



    })
}
getCardapioItem()






async function postCardapioItem() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const titulo = document.querySelector("#titulo")
        const descricao = document.querySelector("#descricao")
        const preco = document.querySelector("#preco")
        let checkbox = document.querySelector("#possuipreparo")


        const CardapioItem = {
            titulo: titulo.value,
            descricao: descricao.value,
            preco: preco.value,
            possuiPreparo: checkbox.checked
        }


        const response = await fetch(`${baseUrl}/CardapioItem`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(CardapioItem)
        })


        console.log(response, "response")
    })
}
postCardapioItem()






async function putCardapioItem() {
    const titulo = document.querySelector("#titulo")
    const descricao = document.querySelector("#descricao")
    const preco = document.querySelector("#preco")
    let checkbox = document.querySelector("#possuipreparo")

    const CardapioItem = {
        titulo: titulo.value,
        descricao: descricao.value,
        preco: Number(preco.value),
        possuiPreparo: checkbox.checked
    }

    const response = await fetch(`${baseUrl}/CardapioItem/1`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(CardapioItem)
    })
    console.log(response, "Item do cardápio foi atualizado")
}






async function deleteCardapioItem(id) {
    const response = await fetch(`${baseUrl}/CardapioItem/${id}`, {
        method: "DELETE"
    })
    console.log(response, "Item do cardápio foi deletado")
}