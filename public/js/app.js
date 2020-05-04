console.log('it is from clint side');

const weatherData = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
weatherData.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''

            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
                console.log(data.forcast)
            }
        })
    })
})