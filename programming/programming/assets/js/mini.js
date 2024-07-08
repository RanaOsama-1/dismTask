$(document).ready(function () {

    $.ajax({
        url: "/Loginpanel/mini website/JS/pro.json",
        type: "get",
        success: function (objecdata){

            let x="";

            $.each(objecdata, function (index,indexObject){
                x +=`<div class="featured-div">
                            <div class="Image">
                                <a href="javascript:void(0);"><img src="${indexObject.Image}" alt=""></a>
                            </div>
                            <a class="featured-detail" href="javascript:void(0);">
                                <h1 class="featured-subheading">${indexObject.heading}</h1>
                                <p class="featured-para">${indexObject.para}</p>
                            </a>
                            <a href="javascript:void(0);" class="add-to-cart" data-id="${index}"  data-name="${indexObject.heading}" data-price="${indexObject.para}" data-img="${indexObject.Image}">
                        <ion-icon name="bag-outline" class="shopping-bag"></ion-icon>
                    </a>
                        </div>`;
            });
            $("#featured-content").html(x);

            $(".add-to-cart").click(function(){
                let name = $(this).data('name');
                let id=$(this).data('id');
                let img=$(this).data('img');
                let price=$(this).data('price')
                alert(`${name} Has been added to your cart.`);

                let cartItem={

                    id : id,
                    name : name,
                    Image : img,
                    price : price,

                }


                let cart=getItemfromlocalstorage('cart') || [];
                // console.log(cart);
                cart.push(cartItem);
                console.log(cart)
                localStorage.setItem('cart' ,JSON.stringify(cart));

            })

        }
    })
});

let getItemfromlocalstorage=(key)=>{
    return JSON.parse(localStorage.getItem(key))
}