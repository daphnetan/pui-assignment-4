//properties of your object variable, object that carries to your cart 
function bun (quantity,singlecost, flavorone, flavortwo, totalcost, ptype, picimage, itemname){
    this.totalcost=totalcost;
    this.singlecost=singlecost;
    this.quantity=quantity;
    this.flavorone=flavorone;
    this.flavortwo=flavortwo;
    this.ptype=ptype;
    this.picimage=picimage;
    this.itemname=itemname;
} 

$(document).ready(function(){

    //hides extra divs on page automatically
    $("#flavor1").hide();
    $("#flavor2").hide();

    //hides or shows flavors & changes images based on product type choices    
    $("#ptype").change(function(){
        var value = this.value;
        if (value === "0"){
            $("#flavor1").hide(); //hides div if a specific package type is chosen 
            $("#flavor2").hide();
        }
        if (value === "2"){
        $("#flavor1").hide(); //hides div since individual package type is chosen 
        $("#flavor2").hide();
        }
        if (value === "10"){ 
            $("#flavor1").show(); //shows div since 6-pack is chosen
            $("#flavor2").show(); 
            $("#product-image").attr("src", "images/six-pack.jpg"); //changes image for 6-pack
        }
        if (value === "20"){
            $("#flavor1").show(); //shows div since 12-pack is chosen
            $("#flavor2").show();
            $("#product-image").attr("src", "images/twelve-pack.png"); //changes image for 12-pack
        }
    })

    //variable created to get items from cart array
    var cartItems= JSON.parse(localStorage.getItem("cartArray"));
    
    //create new divs to hold and show information of bun
    if (cartItems == null){ //if the cart is empty, do nothing
        } else { //if not, create a large div and more divs within it
            var cartSize = cartItems.length; //create a variable that represents the array's length

            //update cart count in the top right corner on top of shopping cart icon
            $("#added-items").append(cartSize); 
            $("#added-items").html(cartItems.length);
            
            //for loop that runs through the items in the cart array
            for (i=0; i <cartSize; i++) {
                $(".new-item-block").append('<div id=new-item' + [i] +'> </div>');
                $('<img/>', { //creates image for each item 
                    src: cartItems[i].picimage,
                    class: 'cartimages'
                    }).appendTo($('#new-item'+[i]));
                $('#new-item' + [i]).append('<div id= productnamecart>' + cartItems[i].itemname + '</div>'); //creates item name
                $('#new-item'+ [i]).append('<div id= ptypecart>' + cartItems[i].ptype + '</div>'); //creates product type
                $('#new-item'+ [i]).append('<div id= flavoronecart>' + cartItems[i].flavorone + '</div>'); //creates 1st flavor
                $('#new-item'+ [i]).append('<div id= flavortwocart>' + cartItems[i].flavortwo + '</div>'); //creates 2nd flavor
                $('#new-item' + [i]).append('<div id= quantitycart>' + cartItems[i].quantity + '</div>'); //creates quantity
                $('#new-item'+ [i]).append('<div id= singlecostcart>$ ' + cartItems[i].singlecost + '</div>'); //creates cost for a single item
                $('#new-item' + [i]).append('<div id= totalcostcart>$ ' + cartItems[i].totalcost + '</div>'); //creates total cost 
                $('#new-item' +[i]).append('<button class=eraseitem> X Remove </button>');  //creates remove button
            } 
        }

    //add items to cart 
    $("#add-to-cart").click(function(){ //when add to cart button is clicked, do the following: 
        var quant = $("#quantity").val(); //get the quantity
        var cost = $("#ptype").val(); //get the product type
        var flav1 = $("#flavor1").val(); //get the 1st flavor
        var flav2 = $("#flavor2").val(); //get the 2nd flavor
        var pname = $("#product-name").text(); //get the product name 
        var itemcost = quant*cost; //create a new variable to represent each item's cost, which is the price of that product type and the quantity
        var type; //applied in if statement
        var image; //applied in if statement 

        //if statements since value is used in ptype div to represent the product type cost 
        if (cost == "2"){
        type = "Individual";
        image="images/lemonlav.jpg";
        }
        else if (cost == "10") {
        type = "6-pack";
        image="images/six-pack.jpg";

        } else if (cost=="20"){
        type = "12-pack";
        image="images/twelve-pack.png";
        }

        //tests whether each new variable created works
        console.log (quant);
        console.log (cost);
        console.log (flav1);
        console.log (flav2);
        console.log(itemcost);
        console.log(type);
        console.log(pname);

        var desiredBun = new bun (quant, cost, flav1, flav2, itemcost, type, image, pname); //when new bun is created, these are the details associated with it 
        var oldSelects = JSON.parse(localStorage.getItem("cartArray")) || []; //store all the information locally in variable that holds the information for the new bun created 
        oldSelects.push(desiredBun); //new variable has the information of new bun 
        localStorage.setItem("cartArray",JSON.stringify(oldSelects)); //stringify info so it can be read by local storage
        $("#added-items").html(oldSelects.length); //reloads only the area of the page where the cart icon sits 
    })

    //holds data from add to cart 
    var newbun = JSON.parse(localStorage.getItem("savedNewBun"));

    //delete each item from cart
    $(".eraseitem").click(function(){
            var arrayPlace = $(this).attr('id'); 
            cartItems.splice(arrayPlace, 1); //splits up each item in the array
            localStorage.setItem("cartArray",JSON.stringify(cartItems)); 
            location.reload(); //reload page 
    })
});


