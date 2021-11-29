import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React,{ useContext, useState } from "react";
import app_config from "../../config";
import { UserContext } from "../../providers/userContext";

const Checkout = (props) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const url = app_config.api_url;
  const stripe = useStripe();
  const elements = useElements();
  const userService = useContext(UserContext);
  const getIntent = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2300 * 100 }),
    };
    return fetch(url + "/create-payment-intent", requestOptions).then(
      (response) => response.json()
    );
  };

  const payMoney = async (e) => {
    e.preventDefault();
    getIntent().then((res) => {
      console.log(res);
      let clientSecret = res.client_secret;

      completePayment(clientSecret);
    });
  };

  const completePayment = async (key) => {
    const paymentResult = await stripe.confirmCardPayment(key, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userService.currentUser.fullname,
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
      console.log(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Success!");
        console.log(paymentResult);
      }
    }
  };

  return (
    <div>
      <form onSubmit={payMoney}>
        <div>
          <div class="container">
            <main>
              <div class="py-5 text-center">
                <h2>Checkout form</h2>
              </div>
              <div class="row g-5">
                <div class="col-md-7 col-lg-8">
                  <h4 class="mb-3">Billing address</h4>
                  <form class="needs-validation" novalidate="">
                    <div class="row g-3">
                      <div class="col-sm-6">
                        <label for="firstName" class="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="firstName"
                          placeholder=""
                          value=""
                          required=""
                        />
                        <div class="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <label for="lastName" class="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="lastName"
                          placeholder=""
                          value=""
                          required=""
                        />
                        <div class="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="username" class="form-label">
                          Username
                        </label>
                        <div class="input-group has-validation">
                          <span class="input-group-text">@</span>
                          <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="Username"
                            required=""
                          />
                          <div class="invalid-feedback">
                            Your username is required.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="email" class="form-label">
                          Email <span class="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="you@example.com"
                        />
                        <div class="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>
                    </div>
                    <hr class="my-4" />
                    <h4 class="mb-3">Payment</h4>
                    <div class="my-3">
                      <div class="form-check">
                        <input
                          id="credit"
                          name="paymentMethod"
                          type="radio"
                          class="form-check-input"
                          checked=""
                          required=""
                        />
                        <label class="form-check-label" for="credit">
                          Credit card
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          id="debit"
                          name="paymentMethod"
                          type="radio"
                          class="form-check-input"
                          required=""
                        />
                        <label class="form-check-label" for="debit">
                          Debit card
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="radio"
                          class="form-check-input"
                          required=""
                        />
                        <label class="form-check-label" for="paypal">
                          PayPal
                        </label>
                      </div>
                    </div>

                    <div class="row gy-3">
                      <div class="col-md-6">
                        <label for="cc-name" class="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-name"
                          placeholder=""
                          required=""
                        />
                        <small class="text-muted">
                          Full name as displayed on card
                        </small>
                        <div class="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div class="col-md-6">
                        <label for="cc-number" class="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-number"
                          placeholder=""
                          required=""
                        />
                        <div class="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div class="col-md-3">
                        <label for="cc-expiration" class="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-expiration"
                          placeholder=""
                          required=""
                        />
                        <div class="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div class="col-md-3">
                        <label for="cc-cvv" class="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-cvv"
                          placeholder=""
                          required=""
                        />
                        <div class="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                      <CardElement
                        className="card"
                        options={{
                          style: {
                            base: {
                              backgroundColor: "white",
                            },
                          },
                        }}
                      />
                    </div>

                    <hr class="my-4" />

                    <button
                      class="w-100 btn btn-primary btn-lg"
                      type="submit"
                      disabled={isPaymentLoading}
                    >
                      {isPaymentLoading ? "Loading..." : "Pay"}
                    </button>
                  </form>
                </div>
              </div>
            </main>

            <footer class="my-5 pt-5 text-muted text-center text-small">
              <p class="mb-1">© 2017–2021 Company Name</p>
              <ul class="list-inline">
                <li class="list-inline-item">
                  <a href="#">Privacy</a>
                </li>
                <li class="list-inline-item">
                  <a href="#">Terms</a>
                </li>
                <li class="list-inline-item">
                  <a href="#">Support</a>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Checkout;
