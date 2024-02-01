const handleSubmit = async() => {
    let cities = document.getElementById('cities-input').value;
    cities = cities.split(',');
    console.log(cities);
    const response = await fetch('https://intern-assignment-weather.onrender.com/getWeather',{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({cities})
    })

    const data = await response.json();
    console.log(data);
    const resultRender = document.getElementById('result-render');
    for (city in data){
        resultRender.innerHTML += `<p>${city}: ${data[city]}</p>`
    }
}