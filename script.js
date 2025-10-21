//https://localhost:7166/api
const baseUrl = "https://localhost:7166/api"

const headers ={
            "content-type":	"application/json; charset=utf-8"
        }
async function getUsers(){
    const response = await fetch(`${baseUrl}/Usuario`)
    const users = await response.json()

}
getUsers()

function init(){
        const form = document.querySelector("form")
    form.addEventListener("submit",(event)=>{
        event.preventDefault()
        createUser()
        // updateUser()
        // removeUser()
        // openModal()
    })
    
}
init()

function openModal(){
    const body = document.body
   
    body.insertAdjacentHTML("beforeend",`
        <div class="wrapper">
        <div class="modal">
            <button id="close">X</button>
            <p>Algo deu errado! tente novamente</p>
        </div>
    </div>
        `)
        const close = document.querySelector("#close")
    close.addEventListener("click",()=>{
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
}

function toastify(tipo,mensagem){
    document.body.insertAdjacentHTML("beforeend",`
            <div class="toastify ${tipo}">
        <p>${mensagem}</p>
    </div>
        `)
        const toas= document.querySelector(".toastify")
        setTimeout(() => {
            
            toas.remove()
        }, 3000);
}
async function createUser(){
    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const usuario = {
        name:name.value,
        email:email.value
    }
    const response = await fetch(`${baseUrl}/Usuario`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(usuario)
    })
    console.log(response,"response")
    if(response.ok){
        const users = await response.json()
        console.log(users,"users")
        toastify("sucesso","usuário ou senha inválidos")
    }else {
        toastify("sucesso","login efetuado com sucesso!")
    }
}

async function updateUser(){
      const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const usuario = {
        name:name.value,
        email:email.value
    }
    const response = await fetch(`${baseUrl}/Usuario/1`,{
        method:"PUT",
         headers:headers,
        body:JSON.stringify(usuario)
    })
    const user = await response.json()
    console.log(user,"user atualizado")
    
}
async function removeUser(){
    const response = await fetch(`${baseUrl}/Usuario/1`,{
        method:"DELETE"
    })
    console.log(response,"response delete")
}