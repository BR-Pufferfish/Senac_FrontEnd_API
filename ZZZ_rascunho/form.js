function iniciarFormulario() {
    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const titulo = document.querySelector("#titulo")

        await criarProduto(produto)

    })

}
iniciarFormulario()
async function criarProduto(produto) {

    const produto = {
        titulo: titulo.value,
        preco: preco.value
    }

    const res = await fetch("http://localhost:3000/Usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    const response = await res.json()
    if (response) {

    }

}