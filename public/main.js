// variables
const get_btn = document.getElementById('get-button')
const result_paragraph = document.querySelector('.result-actual')
let n = 0;
let period = '.'
const waiting = 'Waiting for data'
const message_url = `/my-data`
const numeric_url = `/random-number`
const containerLoaded = false;
let timer;
// container waiting for new data to come in onclick
window.onload = e =>{
    const loadContainer = () => {
        let currentContainerMessage = result_paragraph.children[0].textContent;
        if(!containerLoaded && currentContainerMessage === waiting){
            timer=setInterval(function(){
                result_paragraph.children[0].textContent += period;
                if(result_paragraph.children[0].textContent.length>19){
                   result_paragraph.children[0].textContent = waiting
                }
            },1000)
        }
    }
    loadContainer()

}


// fetch
// helper function to fetched "GET" request data
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
const handle_get_xml = () => {
    clearInterval(timer)
    xml.open(method,numeric_url,bool)
    xml.send();
}
get_btn.addEventListener('click',handle_get_xml)
