// variables
const get_btn = document.getElementById('get-button')
const result_paragraph = document.querySelector('.result-actual>p')
const waiting = 'Waiting for data'
const message_url = `/my-data`
const numeric_url = `/random-number`
let containerLoaded = false;
let timer, expiration;
let n = 0;
let period = '.'
let counter = 0;


const webkitTouch = element => {
    element.classList.remove('original-shadow')
    element.classList.add('mobile-active-touch')
    setTimeout(()=>{
        element.classList.remove('mobile-active-touch')
        element.classList.add('original-shadow')
    },150)
}

//__________________________________________________________________

// container waiting for new data to come in onclick
const loadContainer = () => {
    let currentContainerMessage = result_paragraph.textContent;
    if(!containerLoaded && currentContainerMessage === waiting){
        timer=setInterval(function(){
            result_paragraph.textContent += period;
            if(result_paragraph.textContent.length>19){
            result_paragraph.textContent = waiting
            }
        },1000)
    }
}
loadContainer()
//__________________________________________________________________
// get data with fetch (without promise)
const getFetchData = e =>{
    containerLoaded=true;
    e.target.classList.add('no-pointer')
    clearInterval(timer)
    fetch(numeric_url).then(res=>res.json()).then(data=>{
        result_paragraph.textContent=data.number
        expiration = setInterval(()=>{
                    counter++
                    console.log(counter)
                    if(counter >=2){
                        e.target.classList.remove('no-pointer')
                        containerLoaded=false;
                        counter = 0;
                        clearInterval(expiration);
                        resetData();
                        loadContainer();
                    }
                },1000)
    })

    // webkit-active-touch
    //.mobile-active-touch
    webkitTouch(e.target)

}
get_btn.addEventListener('click',getFetchData)

//__________________________________________________________________
// helper function to fetch "GET" request data
// get data with promise
// const handle_get_fetch = async (url) => {
//     let response = await fetch(url,
//         {method:'GET',
//         credentials:'same-origin',
//         mode:'cors',
//         headers:{
//             "Content-Type":'application/json',
//         }
//         }
//     )
//     return response.json()
// }
// // get data event handler
// const getData = async () =>{
//     n++
//     // use Promise to get data back
//     const data = await handle_get_fetch(url).then(data=>data.message)
//     result_paragraph.textContent=data
//     let text = [...result_paragraph.textContent]
//     text=text.slice(0,-n)
//     result_paragraph.textContent=text.join``
//  }
// // execute click event listener
// get_btn.addEventListener('click',getData)
//__________________________________________________________________

//XMLHttpRequest
const xml = new XMLHttpRequest();
const method = "GET"
const bool = true;
let counter2=0;
xml.responseType='json'
xml.onload=e=>{
    n++
    const data = xml.response
    result_paragraph.textContent=!data.message ? data.number : data.message;
    // let text = [...result_paragraph.textContent]
    // text=text.slice(0,-n)
    // result_paragraph.textContent=text.join``
}
// const handle_get_xml = (e) => {
//     containerLoaded=true;
//     clearInterval(timer)
//     e.target.classList.add('no-pointer')
//     expiration = setInterval(()=>{
//         counter2++
//         console.log(counter2)
//         if(counter2 >=2){
//             e.target.classList.remove('no-pointer')
//             containerLoaded=false;
//             counter2 = 0;
//             clearInterval(expiration);
//             resetData();
//             loadContainer();
//         }
//     },1000)

//     xml.open(method,numeric_url,bool)
//     xml.send();
// }
// get_btn.addEventListener('click',handle_get_xml)

//__________________________________________________________________

// reset container to default data (waiting for data...)
const resetData = () => {
    result_paragraph.textContent = waiting;
    setInterval(timer,1000)
}

