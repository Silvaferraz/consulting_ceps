var content = document.querySelector('div#app main')
var button = document.querySelector('div#app form button')
input = document.querySelector('div#app form input')
function run(event) {
    var newInput = input.value
    newInput = newInput.replace(' ', '')
    newInput = newInput.replace('.', '')
    newInput = newInput.replace('-', '')
    newInput = newInput.trim()
    event.preventDefault()

    axios.get('https://viacep.com.br/ws/' + newInput + '/json/').then(function(response) {
        var result = response.data

        if (result.erro) {
           throw new Error('CEP Inválido')
        }
        content.innerHTML = ''
        createLine(result.localidade + ' - ' + result.uf)
        createLine(result.bairro)
        createLine(result.logradouro  + ' N°' + result.ddd)

    })
    .catch(function(error) {
        content.innerHTML = ''
        createLine('CEP inválido')
    }) 
}
function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    line.appendChild(text)
    content.append(line)
}

button.addEventListener('click', run)