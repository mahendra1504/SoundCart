import React, { useContext, useEffect, useState } from 'react'
import { useNavigate ,NavLink} from 'react-router-dom';
import { LoginContext } from '../components/ContextProvider/Context';

const SubTotal = (iteam) => {
    
    const [price,setPrice] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [coupanValid,setCoupanValid] = useState("")
    const [coupanName,setCoupanName] = useState("")
    const [coupanDiscount,setCoupanDiscount] = useState("")
    const [beforeDisocunt,setBeforeDiscount] = useState("")
    const [input,setInput] = useState(true)
    const [color,setColor] = useState("")

    console.log(iteam);    
    const { logindata, setLoginData } = useContext(LoginContext);

    useEffect(()=>{      
        totalAmount();
    },[iteam])
    

    const applyCoupan = async(e) =>{
        e.preventDefault();
        console.log(coupanName);
        console.log("jiyaaa");
        const token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/applycoupan",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type" :"application/json",
                "Authorization" : token
            },
            body:JSON.stringify({
                coupanName
            })
        })

        const data = await res.json();
        console.log(data);

        if(data.status==422 || !res){
            console.log("error");
            setColor("red")
            setCoupanValid("Coupan is not valid")

        }else{
            //setValid(data.coupanid)
            console.log("success");
            setCoupanDiscount(data.coupanValid.coupanDiscount)
            setInput(false)
            setColor("green")
           setCoupanValid("Coupan Applied Succesfully")

        }
    }
    const removeCoupan = async(e) =>{
        setCoupanName("")
        setCoupanValid("")
        setInput(true)
        setCoupanDiscount(0)
    }
    const totalAmount = () =>{
        let price = 0;
        let afteDisocunt = 0;
        let beforeDisocunt = 0;
        // console.log(iteam);
        //afterdiscount = totalAmount - (totalAmount * coupanValid.coupanDiscount / 100);
        iteam.iteam.map((item)=>{
            price += item.product[0].selling_price *item.quantity
        })
        beforeDisocunt = price
        setBeforeDiscount(beforeDisocunt)
        afteDisocunt = price - (price * coupanDiscount / 100)
        if(afteDisocunt > 0 ){
            setPrice(afteDisocunt)
            setTotalPrice(afteDisocunt+40)
        }else{
            setPrice(price)
            setTotalPrice(price+40)
        }
        // setPrice(price)
        // setTotalPrice(price+40)
       
    }

    
  return (
    // <>
    // <div className="col-lg-6 col-md-6">
    //                <div className="coupon_code right" data-aos="fade-up" data-aos-delay="400">
    //                    <h3>Cart Totals</h3>
    //                    <div className="coupon_inner">
    //                        <div className="cart_subtotal">
    //                            <p>Subtotal</p>
    //                            <p className="cart_amount">₹{price}.00</p>
    //                        </div>
    //                        <div className="cart_subtotal ">
    //                            <p>Shipping</p>
    //                            <p className="cart_amount"><span>Flat Rate:</span> ₹40.00</p>
    //                        </div>
    //                        {/* <a href="#">Calculate shipping</a> */}
   
    //                        <div className="cart_subtotal">
    //                            <p>Total</p>
    //                            <p className="cart_amount">₹{totalPrice}.00</p>
    //                        </div>
    //                        <div className="checkout_btn">
    //                            <NavLink to={"/cart/address"} state={{id:totalPrice}} className="btn btn-md btn-golden">Proceed to Checkout</NavLink>
    //                        </div>
    //                    </div>
    //                </div>
    //            </div>

               
    // </>
    <>
        <div className="coupon_area">
    <div className="container">
        <div className="row">
            <div className="col-lg-6 col-md-6">
                <div className="coupon_code left" data-aos="fade-up" data-aos-delay="200">
                    <h3>Coupon</h3>
                    <div className="coupon_inner">
                        <p>Enter your coupon code if you have one.</p>
                        {
                            input === true ?
                            <input className="mb-2" placeholder="Coupon code" type="text" value={coupanName} onChange={(e) => setCoupanName(e.target.value)}/>
                            :
                            <input className="mb-2" placeholder="Coupon code" type="text" value={coupanName} onChange={(e) => setCoupanName(e.target.value)} disabled/>
                        }
                        {
                            input === true ?
                            <button type="submit" className="btn btn-md btn-golden" onClick={applyCoupan}>Apply coupon</button>
                            :
                            <button type="submit" className="btn btn-md btn-golden" onClick={removeCoupan}>Remove Coupan</button>
                        }
                           
                           {
                            color=="green"?
                                <div style={{color:"green"}}>{coupanValid}</div>
                            :
                            <div style={{color:"red"}}>{coupanValid}</div>
                           }
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="coupon_code right" data-aos="fade-up" data-aos-delay="400">
                    <h3>Cart Totals</h3>
                    <div className="coupon_inner">
                        <div className="cart_subtotal">
                            <p>Subtotal</p>
                            <p className="cart_amount">₹{price.toFixed(2)}</p>
                            
                           
                        </div>
                        <div className='cart_subtotal'>{
                                input === false ? <>
                               <del>
                               <p className="cart_amount" style={{marginLeft:"30rem",fontSize:"0.9rem",marginTop:"-2rem"}}>₹{beforeDisocunt}</p>
                               
                                </del> 
                                </> :""
                            }</div>
                        <div className="cart_subtotal ">
                            <p>Shipping</p>
                            <p className="cart_amount"><span>Flat Rate:</span> ₹40.00</p>
                        </div>
                        <a href="#">Calculate shipping</a>

                        <div className="cart_subtotal">
                            <p>Total</p>
                            <p className="cart_amount">₹{totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="checkout_btn">
                        <NavLink to={"/cart/address"} state={{id:totalPrice}} className="btn btn-md btn-golden">Proceed to Checkout</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default SubTotal