function ajax(method,url,data){
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        let method = method || 'GET';
        let data = data || null;
        xhr.open(method,url,true);
        xhr.onreadystatechange = ()=>{
            if(xhr.status === 200 && xhr.readyState === 4){
                resolve(xhr.responseText);
            }else{
                reject(xhr.responseText);
            }
        }
        xhr.send(data);
    })
}


// ajax('GET','/login',null).then(res =>{
//     console.log(res)
// })
