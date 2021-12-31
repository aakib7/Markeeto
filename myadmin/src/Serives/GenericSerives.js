import axios from "axios"
axios.defaults.baseURL="http://localhost:4000/mobiles/api"
class GenericSerives
{

constructor(){

}

post=(url,data) => new Promise((resolve,reject)=>{
    axios.post(url,data).then((res)=>{resolve(res.data)})
    .catch((err)=>{reject(err);
    })
    });
}

export default GenericSerives;