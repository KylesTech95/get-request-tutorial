// variables
const get_btn = document.getElementById('get-button')
const result_paragraph = document.querySelector('.result-actual>p')
const waiting = 'Waiting for data'
const message_url = `/my-data`
const numeric_url = `/random-number`
let containerLoaded = false;
let timer;
let n = 0;
let period = '.'

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

// helper function to fetch "GET" request data
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
xml.responseType='json'
xml.onload=e=>{
    n++
    const data = xml.response
    result_paragraph.textContent=!data.message ? data.number : data.message;
    // let text = [...result_paragraph.textContent]
    // text=text.slice(0,-n)
    // result_paragraph.textContent=text.join``
}
let counter = 0;
const handle_get_xml = (e) => {
    containerLoaded=true;
    clearInterval(timer)
    e.target.classList.add('no-pointer')
    let expiration = setInterval(()=>{
        counter++
        console.log(counter)
        if(counter >=5){
            e.target.classList.remove('no-pointer')
            containerLoaded=false;
            counter = 0;
            containerLoaded=false;
            clearInterval(expiration);
            resetData();
            loadContainer();
        }
    },1000)

    xml.open(method,message_url,bool)
    xml.send();
}
get_btn.addEventListener('click',handle_get_xml)

//__________________________________________________________________

// reset container to default data (waiting for data...)
const resetData = () => {
    result_paragraph.textContent = waiting;
    setInterval(timer,1000)
}