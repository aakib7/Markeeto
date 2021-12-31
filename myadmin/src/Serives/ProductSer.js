import GenericSerives from './GenericSerives'
class ProductSer extends GenericSerives{
    constructor(){

        super();
    }
    addProduct=(data)=>this.post("/",data)
}
 let productSer = new ProductSer();

 export default productSer;

