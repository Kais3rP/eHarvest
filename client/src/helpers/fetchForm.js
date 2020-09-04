export function fetchForm(ev, url){
    ev.preventDefault(); //Prevents the form submitting
    const params = new URLSearchParams([...new FormData(ev.target).entries()]); //This spreads the form key-value pairs and puts them in a format sendable with a www-url-encoded mime-type
    console.log(params)
    fetch(url, {
        method: 'POST',
        body:params
}).then(res => res.json()).then(data =>  data)
}