const form = document.querySelector('form')
//this usecase will give you Empty
const height = parseInt(document.querySelector('#height').value) // to convert into int (parsINT)

form.addEventListener('submit', function(e) {
    e.preventDefault() 

    const height = parseInt(document.querySelector('#height').value) // to convert into int (parsINT)
    const weight = parseInt(document.querySelector('#weight').value)
    const results = document.querySelector('#results')

    if(height === '' || height<0 || isNaN(height)) {
        results.innerHTML = `Please give a valid Height ${height}`;
    } else if (weight === '' || weight<0 || isNaN(weight)) 
    {
        results.innerHTML = `Please give a valid Weight ${weight}`;
    } else 
    {
        const bmi = (weight/((height*height)/10000)).toFixed(2)
        // show the result 
        document.querySelector('#results').style.color = "red"
        results.innerHTML = `<span>${bmi}</span>`
    }
    const calc = document.querySelector('#calc')
    if(results.innerText<18.6) {
        calc.innerHTML = "<span><b><i>~ You are Under Weight</i></b></span>";
    } else if (results.innerText>=18.6 && results.innerText<=24)
    {
        calc.innerHTML = "<span><b><i>~ You are Normal Range</i></b></span>";
    } else 
    {
        calc.innerHTML = "<span><b><i>~ You are Over Weight</i></b></span>";
    }

})








