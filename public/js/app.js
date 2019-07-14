console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const searchCriteria = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchCriteria.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecastData
            }
        })
    })
})