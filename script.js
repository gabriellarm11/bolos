/*Criar uma função em que eu mando elemento el e basicamente ele faz o comando querySelector pra mim */
const c = (el) => document.querySelector(el)

const cs = (el) => document.querySelectorAll(el)

cakeJson.map((item, index) => {
    /*aqui vamos dar um clone node no cake item que está dentro do HTML e para eu clonar o cakeitem eu vou usar o clonenode*/
    let cakeItem = document.querySelector('.models .cake-item').cloneNode(true)

    /* vamos setar um atributo e chamar ele de 'data-key' entao vamos inserir no index a chave do bolo especifico */
    cakeItem.setAttribute('data-key',index)

    /* adicionar o nome do bolo */
    cakeItem.querySelector('.cake-item--name').innerHTML = item.name

    cakeItem.querySelector('.cake-item--desc').innerHTML = item.description

    cakeItem.querySelector('.cake-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`

    cakeItem.querySelector('.cake-item--img img').src = item.img

    /* vamos adicionar a tag <a> e colocar um evento clique nela*/
    cakeItem.querySelector('a').addEventListener('click', (e) => {

        e.preventDefault()

        // tentando pega o indice de cada bolo
        let key = e.target.closest('.cake-item').getAttribute('data-key')

        // pegando o nome do bolo
        c('.cakeInfo h1').innerHTML = cakeJson[key].name
        c('.cakeInfo--desc').innerHTML = cakeJson[key].description
        c('.cakeInfo--actualPrice').innerHTML = `R$ ${cakeJson[key].price.toFixed(2)}`
        c('.cakeBig img').src = cakeJson[key].img

        /* removendo a seleçao do botao "GRANDE" */
         c('.cakeInfo--size').classList.remove('selected')
         //colocando  a seleçao mos tamanhos PEQUENO, MEDIO E GARNDE
         cs('.cakeInfo--size').forEach((size,sizeIndex) => {
           /* verificar o sizeIndex do bolo GRANDE */
           if(sizeIndex == 2){
            size.classList.add('selected')
           }

            //acessar o tamanhop dos bolos
            size.querySelector('span').innerHTML = cakeJson[key].sizes[sizeIndex]
        })

        cs('.cakeInfo--size').forEach((size,sizeIndex) => {
            /*vamos entrar em cakeInfo--sizes e dentro
            dele temos uma tag span, apos selecionar o cakeInfo--size
            vamos pegar o span e preencher com alguma infomaçao */
            size.querySelector('span').innerHTML = cakeJson[key].sizes[sizeIndex]

        })

        //colocar opacidade no modal ao abrir 
        c('.cakeWindowArea').style.opacity = 0
        c('.cakeWindowArea').style.display = 'flex'

        setTimeout(() => {
            c('.cakeWindowArea').style.opacity = 1

        }, 200)


    })


    /*preencher as informações em cake item e adicionar na tela (a listagem de bolos) está em class="cakearea"*/
    document.querySelector('.cake-area').append(cakeItem)
})

cs('.cakeInfo--size').forEach((size) => {
    size.addEventListener('click',() =>{
        c('.cakeInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

function closeModal(){
    c('.cakeWindowArea').style.opacity = 0 // fica invisivel
    setTimeout(()=>{
        c('.cakeWindowArea').style.display = 'none' // fecha modal
    },500)
      
    
}

cs('.cakeInfo--cancelButton, .cakeInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal)
})