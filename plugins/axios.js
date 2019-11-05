
export default function({$axios,redirect}){
    $axios.onError(error => {   
        console.log(123456)   
        const code = parseInt(error.response && error.response.status)      
        console.log(code)      
        if(code != 200){          
            console.log(error)               
         }    
    })

}