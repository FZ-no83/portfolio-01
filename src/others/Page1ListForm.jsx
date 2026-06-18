import { useState } from "react";
import { useForm } from "react-hook-form";
//import { Page1List } from './Page1List';

export const Page1ListForm = () => {
    const [formData, setFormData] = useState({ product: "", quantity: 0 });
    const [productIsValid, setProductIsValid] = useState(false);
    const validate = () => {
        if (formData.product.lenght === 0) {
            setProductIsValid(false);
        } else {
            setProductIsValid(true);
        }
    };

    const handleChange = (evt) => {
        validate();
        setFormData((currData) => {
            return {
                ...currData, 
                [evt.target.name]: evt.target.value,
            };
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
//        console.log("SSS");
        addItem(formData);
        setFormData({ product: "", quantity: 0 })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>商品名：{formData.product}、数量：{formData.quantiyt}</p>
                    <label htmlFor="product">商品名</label>
                    <input 
                        type="text" 
                        placeholder="商品名" 
                        name="product" 
                        id="product"
                        onChange={handleChange}
                        value={formData.product}
                    />
                    { !productIsValid && (<p style={({ color: "red"})}>商品名を空にできません</p> 
                    )}
                    <label htmlFor="quantity">数量</label>
                    <input 
                        type="number" 
                        placeholder="数量" 
                        name="quantity" 
                        id="quantity"
                        onChange={handleChange}
                        value={formData.quantity}
                    />
            </form>
            <button>商品を追加</button>
        </div>
    );
}

//export default Page1