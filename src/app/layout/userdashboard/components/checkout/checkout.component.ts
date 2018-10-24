import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../dashboard/services/product.service';
// import { ActivatedRoute } from '@angular/router';
import {CartComponent} from '../cart/cart.component';


// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers:[CartComponent]
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild("stripeContainer") stripeContainer: ElementRef;
cost:any;
totalCost:number=0;
carts:any;
total:any;

  constructor(private product: ProductService,private cart:CartComponent) { }

  
  ngOnInit() {
    
  //   this.route.params.subscribe(params => {
  //     this.cost = params["cart.totalCost"];
  //     console.log("Totalcost is:",this.cost);
    
  //  });
  
  
  }

  

  api_key : string = 'pk_test_priBGObMo4kB7Q8phNrh9ZdW'; // replace me

  card : any;
  stripe : any;
  token : string;
  elements : any;
  form : any;
  resetButton : any;
  errorvisible : boolean = false;
  error_message = "";
  paymentRequestAvailable : boolean = false;
  
  
  

  ngAfterViewInit(){
    // this.route.params.subscribe(params => {
    // this.totalCost = params["total"];}
    
    // )
    let userid = localStorage.getItem("userid");
    this.product.listCart(userid).subscribe(res => {
      console.log('Cart Response');
      this.carts = res;
      this.total=0;
      this.carts.forEach((value,index)=> {
        this.total=this.total+this.carts[index].totalCost;
        console.log("TotalCost:"+this.total);
      
      });
    });
    
    // console.log("TotalCost out of viewInit:"+this.total)
    // console.log("TotalCost on checkout"+this.totalCost);
  

   
    
    

    this.form = this.stripeContainer.nativeElement.querySelector('form');
    
    this.resetButton = this.stripeContainer.nativeElement.querySelector('a.reset');
    

    this.stripe = Stripe(this.api_key); // use your test publishable key

    this.elements = this.stripe.elements({
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: 'en'
    });

    /**
     * Card Element
     */
    this.card = this.elements.create("card", {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#fff",
          color: "#fff",
          fontWeight: 400,
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "15px",
          fontSmoothing: "antialiased",

          "::placeholder": {
            color: "#BFAEF6"
          },
          ":-webkit-autofill": {
            color: "#fce883"
          }
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE"
        }
      }
    });
    this.card.mount("#example5-card");

    var paymentRequest = this.stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        amount: 2500,
        label: "Total"
      },
      requestShipping: true,
      shippingOptions: [
        {
          id: "free-shipping",
          label: "Free shipping",
          detail: "Arrives in 5 to 7 days",
          amount: 0
        }
      ]
    });

    paymentRequest.on("token", (result) => {
      // console.log("paymentRequest.on(\"token\")");
      this.token = result.token.id;
      this.stripeContainer.nativeElement.classList.add("submitted");
      result.complete("success");
    });

    var paymentRequestElement = this.elements.create("paymentRequestButton", {
      paymentRequest: paymentRequest,
      style: {
        paymentRequestButton: {
          theme: "light"
        }
      }
    });

    // canMakePayment returns true if your browser has saved your payment information
    // (think: google wallet or apple pay)
    paymentRequest.canMakePayment().then((result) => {
      if (result) {
        this.paymentRequestAvailable = true;
        paymentRequestElement.mount("#example5-paymentRequest");
        /*
        document.querySelector(".example5 .card-only").style.display = "none";
        document.querySelector(".example5 .payment-request-available").style.display = "block";
        */
      }
    });

    this.card.on('change', (event) => {
      this.cardOnChange(event);
    });

    this.form.addEventListener('submit', (e) =>  {
      e.preventDefault(); // this needs to be here, not in onSubmit for some reason.
      this.onSubmit(e);
    });

  } // END ngAfterViewInit //

  cardOnChange(event){
    var savedErrors = {};
    // console.log("card.on change()");
    if (event.error) {
      //o error.classList.add('visible');
      this.errorvisible = true;
      savedErrors[0] = event.error.message;
      //o errorMessage.innerText = event.error.message;
      this.error_message = event.error.message;
      // console.log("displaying", this.error_message);
    } else {
      savedErrors[0] = null;

      // Loop over the saved errors and find the first one, if any.
      var nextError = Object.keys(savedErrors)
        .sort()
        .reduce((maybeFoundError, key) => {
          return maybeFoundError || savedErrors[key];
        }, null);

      if (nextError) {
        // Now that they've fixed the current error, show another one.
        //o errorMessage.innerText = nextError;
        // console.log("displaying", nextError);
        this.error_message = nextError;
      } else {
        // The user fixed the last error; no more errors.
        //o error.classList.remove('visible');
        this.errorvisible = false;
      }
    }
  }

  onSubmit(e){
    // console.log("onSubmit(e)", e);
    e.preventDefault();

    //o example.classList.add('submitting');
    this.stripeContainer.nativeElement.classList.add('submitting');

    this.disableInputs()

    let name     = this.form.querySelector('#example5-name');
    let address1 = this.form.querySelector('#example5-address');
    let city     = this.form.querySelector('#example5-city');
    let state    = this.form.querySelector('#example5-state');
    let zip      = this.form.querySelector('#example5-zip');


    let additionalData = {
      name: name ? name.value : undefined,
      address_line1: address1 ? address1.value : undefined,
      address_city: city ? city.value : undefined,
      address_state: state ? state.value : undefined,
      address_zip: zip ? zip.value : undefined,

    };

    console.log("Additional Data",additionalData);
    this.stripe.createToken(this.card, additionalData).then((result) => {
      // Stop loading!
      //o example.classList.remove('submitting');
      this.stripeContainer.nativeElement.classList.remove('submitting');
      console.log("Result:=======",result);
      

      if (result.token) {
        console.log("Token:",result.token);
        // If we received a token, show the token ID.
        //o example.querySelector('.token').innerText = result.token.id;
        this.token = result.token.id;
        this.stripeContainer.nativeElement.classList.add('submitted');
        console.log("TotalCost in finaltoken cost:"+this.total)

        
        let finalToken = {
          token : this.token ,
          totalCost:this.total,
          cart : this.carts,
        }
        
        console.log("Front Side Token",finalToken);
        this.product.makeCharge(finalToken).subscribe((res: any) => {
        res = res.data;
        console.log("response :: ", res);

      })
      
      } else {
        // Otherwise, un-disable inputs.
        this.enableInputs();
      }
    });
    
   
    
  }
  

  onReset(e){
    // console.log("onReset(e)", e);

    e.preventDefault();

    // // Resetting the form (instead of setting the value to `''` for each input)
    // // helps us clear webkit autofill styles.
    this.form.reset();
    // console.log("this.elements", this.elements);

    // Clear each Element.
    this.card.clear();

    // // Reset error state as well.
    // error.classList.remove('visible');
    this.errorvisible = false;

    // // Resetting the form does not un-disable inputs, so we need to do it separately:
    this.enableInputs();
    this.stripeContainer.nativeElement.classList.remove('submitted');
  }

  enableInputs(){
    Array.prototype.forEach.call(
      this.form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      (input) => {
        input.removeAttribute('disabled');
      }
    );
  }
  
  disableInputs() {
    Array.prototype.forEach.call(
      this.form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      (input) => {
        input.setAttribute('disabled', 'true');
      }
    );
  }

}

