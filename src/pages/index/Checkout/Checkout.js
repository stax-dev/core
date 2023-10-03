//React
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External

import {
  Addons,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";


import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
// import cssNavbar from "../../../components/nav/Nav.module.css";
// import Nav from "../../../components/nav/Nav";
// import Footer from "../../../components/footer/Footer";

//Main
import css from "./Checkout.module.css";

//Images
import payIcon_visa from "../../../images/payments/Visa.svg";
import payIcon_mastercard from "../../../images/payments/Mastercard.svg";
import payIcon_paypal from "../../../images/payments/Paypal.svg";
import payIcon_amex from "../../../images/payments/Amex.svg";
import payIcon_discover from "../../../images/payments/Discover.svg";
// import test from "../../../images/payments/WeChat.svg";

//Extra
import templateList from "../../../components/data/templateList.json";
import E404 from "../../errors/E404";

export default function Checkout() {


  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  var accountWallet = 5.432;
  var [taxPercentage, setTaxPercentage] = useState(0);
  //60% is 60 for taxPercentage format


  var values = useLocation().state;

  useEffect(() => {
    if(!values){
        navigate(-1);
    }
  });

  if (values !== null) {
    var templateChoiceID = values.templateID;
    var ramChoice = values.ram;
    var storageChoice = values.storage;
    var price = Number(values.price).toFixed(2);
  } else {
    price = Number(0).toFixed(2);
  }

  const navigate = useNavigate();
  function returnPage() {
    navigate(-1);
  }


  var [wallet, setWallet] = useState("none");

  function walletChoice(choice) {
    setWallet(choice);
    buyNow("setActive");
  }

  var [disabled, setDisabled] = useState(true);

  function payOption(type) {
    document.getElementById("Checkout-checkout-payment-type").className = "";
    document
      .getElementById("Checkout-checkout-payment-type")
      .classList.add(css["checkout-payment-" + type]);
    setPayment(type);

    buyNow("disabled");
    // resets account wallet section
    setWallet("none");
  }

  function checkoutStep(type) {
    document.getElementById("checkout-type").className = "";
    document
      .getElementById("checkout-type")
      .classList.add(css["checkout-type-" + type]);
    setCheckout(type);
  }

  var [checkout, setCheckout] = useState("review");
  var [payment, setPayment] = useState("creditcard");

  function buyNow(status) {
    if (status === "setActive") {
      document
        .getElementById("Checkout-checkout-payment-submit")
        .classList.replace(
          css["checkout-payment-submit-disable"],
          css["checkout-payment-submit"]
        );
      setDisabled(false);
    } else if (status === "disabled") {
      document
        .getElementById("Checkout-checkout-payment-submit")
        .classList.replace(
          css["checkout-payment-submit"],
          css["checkout-payment-submit-disable"]
        );
      document
        .getElementById("Checkout-checkout-payment-submit")
        .classList.replace(
          css["checkout-payment-submit-load"],
          css["checkout-payment-submit-disable"]
        );
      setDisabled(true);
    } else {
      document
        .getElementById("Checkout-checkout-payment-submit")
        .classList.replace(
          css["checkout-payment-submit"],
          css["checkout-payment-submit-load"]
        );
      console.log("buy");
    }
  }

  var [subtotalPrice, setSubtotalPrice] = useState(Number(price).toFixed(2));
  var [taxCost, setTaxCost] = useState(
    Number((price * taxPercentage) / 100).toFixed(2)
  );
  var [totalPrice, setTotalPrice] = useState(
    (Number(subtotalPrice) + Number(taxCost)).toFixed(2)
  );

  return (
    <div id="Checkout-react-div" className={cssGlobal["react-div"]}>
      <Addons />
      {values ? (
        <div id="Checkout-checkout-full" className={css["checkout-full"]}>
          <div id="Checkout-checkout-title" className={css["checkout-title"]}>
            <h1 id="Checkout-checkout-title-h1">Checkout</h1>
            {/* <img src={test} /> */}
          </div>
          <div id="checkout-type" className={css["checkout-type-review"]}>
            <div id="Checkout-checkout-progress" className={`${css["checkout-progress"]} ${cssGlobal["flex-center-center"]}`}>
              <div id="Checkout-checkout-progress-step" className={css["checkout-progress-step"]}>
                <div id="Checkout-checkout-progress-review" className={css["checkout-progress-review"]}>
                  <i className={`${css["fas"]} ${css["fa-shopping-cart"]} ${"fas fa-shopping-cart"}`}></i>
                  <br />
                  Review
                </div>
              </div>
              <div id="Checkout-checkout-progress-line" className={css["checkout-progress-line"]}>
                <div id="Checkout-checkout-progress-payment" className={css["checkout-progress-payment"]}>
                  <hr />
                </div>
              </div>
              <div id="Checkout-checkokut-progress-step--2" className={css["checkout-progress-step"]}>
                <div id="Checkout-checkout-progress-payment--2" className={css["checkout-progress-payment"]}>
                  <i className={`${css["fas"]} ${css["fa-credit-card"]} ${"fas fa-credit-card"}`}></i>
                  <br />
                  Payment
                </div>
              </div>
              <div id="Checkout-checkout-progress-line--2" className={css["checkout-progress-line"]}>
                <div id="Checkout-checkout-progress-completed" className={css["checkout-progress-completed"]}>
                  <hr />
                </div>
              </div>
              <div id="Checkout-checkout-progress-step--3" className={css["checkout-progress-step"]}>
                <div id="Checkout-checkout-progress-completed--2" className={css["checkout-progress-completed"]}>
                  <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                  <br />
                  Completed
                </div>
              </div>
            </div>
            <div id="Checkout-checkout" className={`${css["checkout"]} ${cssGlobal["flex-flex-start-left"]}`}>
              {checkout !== "completed" && (
                <div id="Checkout-checkout-review" className={css["checkout-review"]}>
                  <div id="Checkout-checkout-review-title" className={css["checkout-review-title"]}>
                    <h1 id="Checkout-checkout-review-h1">
                      Review
                      <i className={`${css["fas"]} ${css["fa-shopping-cart"]} ${"fas fa-shopping-cart"}`}></i>
                    </h1>
                  </div>
                  <button id="Checkout-checkout-next"
                    onClick={() => checkoutStep("payment")} className={css["checkout-next"]}>
                    <p id="Checkout-checkout-next-p">
                      Proceed to Payment{" "}
                      <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                    </p>
                  </button>
                  <div id="Checkout-checkout-review-box" className={css["checkout-review-box"]}>
                    <div id="Checkout-checkout-review-box-title" className={css["checkout-review-box-title"]}>
                      <h1 id="Checkout-checkout-review-box-title-h1">
                        Order Summary
                      </h1>
                      <hr />
                    </div>
                    <div id="Checkout-checkout-review-order" className={`${css["checkout-review-order"]} ${cssGlobal["flex-flex-start-left"]}`}>
                      <div id="Checkout-checkout-review-order-icon" className={css["checkout-review-order-icon"]}>
                        icon
                      </div>
                      <div id="Checkout-checkout-review-order-info" className={css["checkout-review-order-info"]}>
                        <p id="Checkout-checkout-review-order-info--p">
                          <span id="Checkout-checkout-review-order-title" className={css["checkout-review-order-title"]}>
                            Droplet Hosting
                          </span>
                          <br />
                          <span id="Checkout-checkout-highlight" className={css["checkout-highlight"]}>
                            {ramChoice}GB
                          </span>{" "}
                          RAM&nbsp;
                          <span id="Checkout-checkout-highlight-line" className={css["checkout-highlight-line"]}>
                            |
                          </span>
                          &nbsp;
                          <span id="Checkout-checkout-hightlight--2" className={css["checkout-highlight"]}>
                            {storageChoice}GB
                          </span>{" "}
                          Storage
                          <br />
                          {templateList
                            .filter(
                              (templateList) =>
                                templateList.id === templateChoiceID
                            )
                            .slice(0, 1)
                            .map((list) => (
                              <span key={list.title + "-key"}>{list.title}&nbsp;</span>
                            ))}
                          Template
                        </p>
                      </div>
                      <div id="Checkout-checkout-review-order-price" className={css["checkout-review-order-price"]}>
                        <p id="Checkout-checkout-review-order-price--p">
                          €{price}
                        </p>
                      </div>
                    </div>

                    <div id="Checkout-checkout-review-price" className={`${css["checkout-review-price"]} ${cssGlobal["flex-center-left"]}`}>
                      <div id="Checkout-checkout-review-price-subtotal" className={css["checkout-review-price-subtotal"]}>
                        <p id="Checkout-checkout-review-price-subtotal-p">
                          Subtotal
                        </p>
                      </div>
                      <div id="Checkout-checkout-review-price-subamount" className={css["checkout-review-price-subamount"]}>
                        <p id="Checkout-checkout-review-price-subamount-p">
                          €{subtotalPrice}
                        </p>
                      </div>
                      <div id="Checkout-checkout-review-price-subtotal" className={css["checkout-review-price-subtotal"]}>
                        <p id="Checkout-checkout-review-price-subtotal-p--2">
                          Tax
                        </p>
                      </div>
                      <div id="Checkout-checkout-review-price-subamount--2" className={css["checkout-review-price-subamount"]}>
                        <p id="Checkout-checkout-review-price-subamount-p--2">
                          €{taxCost}
                        </p>
                      </div>

                      <div id="Checkout-checkout-review-line" className={css["checkout-review-line"]}>
                        <hr />
                      </div>
                      <div id="Checkout-checkout-review-price-total" className={css["checkout-review-price-total"]}>
                        <p id="Checkout-checkout-review-price-total--p">Total</p>
                      </div>
                      <div id="Checkout-checkout-review-price-amount" className={css["checkout-review-price-amount"]}>
                        <p id="Checkout-checkout-review-price-amount-p">
                          €{totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button id="Checkout-checkout-cancel"
                    onClick={() => returnPage()} className={css["checkout-cancel"]}>
                    <p id="Checkout-checkout-cancel-p">Cancel Checkout</p>
                  </button>
                </div>
              )}
              {checkout === "payment" && (
                <div id="Checkout-checkout-payment" className={css["checkout-payment"]}>
                  <div id="Checkout-checkout-review-title" className={css["checkout-review-title"]}>
                    <h1 id="Checkout-checkout-review-title-h1">
                      Payment
                      <i className={`${css["fas"]} ${css["fa-credit-card"]} ${"fas fa-credit-card"}`}></i>
                    </h1>
                  </div>

                  <div id="Checkout-checkout-payment-type" className={css["checkout-payment-creditcard"]}>
                    {/* payment option menu */}
                    <div id="Checkout-payment-options" className={`${css["payment-options"]} ${cssGlobal["flex-center-center"]}`}>
                      <button id="Checkout-payment-options-box-creditcard"
                        onClick={() => payOption("creditcard")} className={css["payment-options-box-creditcard"]}>
                        <p id="Checkout-payment-options-box-creditcard-p">
                          <span id="Checkout-payment-options-mobile" className={css["payment-options-mobile"]}>
                            Credit&nbsp;
                          </span>
                          Card
                        </p>
                      </button>
                      <button id="Checkout-payment-options-box-paypal"
                        onClick={() => payOption("paypal")} className={css["payment-options-box-paypal"]}>
                        <p id="Checkout-payment-options-box-paypal-p">Paypal</p>
                      </button>
                      <button id="Checkout-payment-options-box-crypto"
                        onClick={() => payOption("crypto")} className={css["payment-options-box-crypto"]}>
                        <p id="Checkout-payment-options-box-crypto-p">Crypto</p>
                      </button>
                      <button id="Checkout-payment-options-box-savedpayments"
                        onClick={() => payOption("savedpayments")} className={css["payment-options-box-savedpayments"]}>
                        <p>
                          <span className={css["payment-options-mobile"]}>
                            Account&nbsp;
                          </span>
                          Wallet
                        </p>
                      </button>
                    </div>

                    {/* credit card */}
                    {payment === "creditcard" && (
                      <div id="Checkout-payment-section-creditcard" className={css["payment-section-creditcard"]}>
                        <div id="Checkout-payment-section-types" className={`${css["payment-section-types"]} ${cssGlobal["flex-center-center"]}`}>
                          <div id="Checkout-payments-section-type-title" className={css["payment-section-types-title"]}>
                            <p id="Checkout-payments-section-types-title-p">
                              Card Payment Types
                            </p>
                          </div>
                          <img alt={"visa-icon"} id="Checkout-payments-section-types-title-img"
                            src={payIcon_visa}
                          />
                          <img alt={"mastercard-icon"} id="Checkout-payments-section-types-title-img--2"
                            src={payIcon_mastercard}
                          />
                          <img alt={"amex-icon"} id="Checkout-payment-section-types-title-img--3"
                            src={payIcon_amex}
                          />
                          <span id="Checkout-payment-section-types-last" className={css["payment-section-types-last"]}>
                            <img alt={"discover-icon"} id="Checkout-payment-section-types-last-img"
                              src={payIcon_discover}
                            />
                          </span>
                        </div>

                        <div id="Checkout-payment-section-title" className={css["payment-section-title"]}>
                          <p id="Checkout-payment-section-title-p">
                            Card Details
                          </p>
                        </div>
                        <div id="Checkout-saved-payments-details" className={`${css["saved-payments-details"]} ${cssGlobal["flex-center-left"]}`}>
                          <div id="Checkout-saved-payments-details-number" className={css["saved-payments-details-number"]}>
                            <div id="saved-payments-type"></div>
                            <input id="Checkout-saved-payments-details-number-input"
                              type="text"
                              placeholder="Card Number"
                            />
                          </div>

                          <div id="Checkout-saved-payments-details-expiry" className={css["saved-payments-details-expiry"]}>
                            <input id="Checkout-saved-payments-details-input"
                              type="text"
                              placeholder="Expiry Date"
                            />
                          </div>

                          <div id="Checkout-saved-payments-details-cvv" className={css["saved-payments-details-cvv"]}>
                            <input id="Checkout-saved-payments-details-cvv-input"
                              type="text"
                              placeholder="CVV"
                            />
                          </div>

                          <div id="Checkout-saved-payments-details-name" className={css["saved-payments-details-name"]}>
                            <input id="Checkout-saved-payments-details-name-input"
                              type="text"
                              placeholder="Cardholder Name"
                            />
                          </div>
                        </div>
                        <div id="Checkout-payment-section-title--2" className={css["payment-section-title"]}>
                          <p id="Checkout-payment-section-title-p--2">
                            Billing Address
                          </p>
                        </div>
                        <div id="Checkout-billing-details" className={`${css["billing-details"]} ${cssGlobal["flex-center-left"]}`}>
                          <div id="Checkout-billing-details-box1" className={css["billing-details-box1"]}>
                            <input id="Checkout-billing-details-box1-input"
                              type="text"
                              placeholder="Name"
                            />
                          </div>

                          <div id="Checkout-billing-details-box2" className={css["billing-details-box2"]}>
                            <input id="Checkout-billing-details-box2--input"
                              type="text"
                              placeholder="Country"
                            />
                          </div>

                          <div id="Checkout-billing-details-box3" className={css["billing-details-box3"]}>
                            <input id="Checkout-billing-details-box3-input"
                              type="text"
                              placeholder="City"
                            />
                          </div>

                          <div id="Checkout-billing-details-box1--2" className={css["billing-details-box1"]}>
                            <input id="Checkout-billing-details-box1-input--2"
                              type="text"
                              placeholder="Billing Address"
                            />
                          </div>

                          <div id="Checkout-billing-details-box1--3" className={css["billing-details-box1"]}>
                            <input id="Checkout-billing-details-box1-input--3"
                              type="text"
                              placeholder="Billing Address 2 (Optional)"
                            />
                          </div>

                          <div id="Checkout-billing-details-box2--2" className={css["billing-details-box2"]}>
                            <input id="Checkout-billing-details-box2-input--2"
                              type="text"
                              placeholder="State/Province/Region"
                            />
                          </div>

                          <div id="Checkout-billing-details-box3--2" className={css["billing-details-box3"]}>
                            <input id="Checkout-billing-details-box3-input--2"
                              type="text"
                              placeholder="Postal Code"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* paypal */}
                    {payment === "paypal" && (
                      <div id="Checkout-payment-section-paypal" className={css["payment-section-paypal"]}>
                        <div id="Checkout-paypal-section" className={`${css["paypal-section"]} ${cssGlobal["flex-center-left"]}`}>
                          <div id="Checkout-paypal-section-box" className={css["paypal-section-box"]}>
                            <p id="Checkout-paypal-section-box-p">
                              <b>Paypal Payment Option</b>
                              <br />
                              You will be asked to login to Paypal to authenticate
                              later when you confirm your order.
                            </p>
                          </div>
                          <div id="Checkout-paypal-section-box2" className={css["paypal-section-box2"]}>
                            <img id="Checkout-paypal-section-box2-img"
                              src={payIcon_paypal}
                            />
                          </div>
                        </div>

                        <p id="payment-section-paypal-p">
                          <b>Billing Address</b>
                        </p>
                        <div id="Checkout-billing-details--2" className={`${css["billing-details"]} ${cssGlobal["flex-center-left"]}`}>
                          <div id="Checkout-billing-details-box1--4" className={css["billing-details-box1"]}>
                            <input id="Checkout-billing-details-box1--4"
                              type="text" className={css["pay-info"]}
                              placeholder="Name"
                            />
                          </div>

                          <div id="Checkout-billing-details-box2--3" className={css["billing-details-box2"]}>
                            <input id="Checkout-billing-details-box2-input--3"
                              type="text" className={css["pay-info"]}
                              placeholder="Country"
                            />
                          </div>

                          <div id="Checkout-billing-details-box3--3" className={css["billing-details-box3"]}>
                            <input id="Checkout-billing-details-box3-input--3"
                              type="text" className={css["pay-info"]}
                              placeholder="City"
                            />
                          </div>

                          <div id="Checkout-billing-details-box1--5" className={css["billing-details-box1"]}>
                            <input id="Checkout-billing-details-box1-input--5"
                              type="text" className={css["pay-info"]}
                              placeholder="Billing Address"
                            />
                          </div>

                          <div id="Checkout-billing-details-box1--6" className={css["billing-details-box1"]}>
                            <input id="Checkout-billing-details-box1-input--6"
                              type="text" className={css["pay-info"]}
                              placeholder="Billing Address 2 (Optional)"
                            />
                          </div>

                          <div id="Checkout-billing-details-box2--4" className={css["billing-details-box2"]}>
                            <input id="Checkout-billing-details-box2-input--4"
                              type="text" className={css["pay-info"]}
                              placeholder="State/Province/Region"
                            />
                          </div>

                          <div id="Checkout-billing-details-box3--4" className={css["billing-details-box3"]}>
                            <input id="Checkout-billing-details-box3-input--4"
                              type="text" className={css["pay-info"]}
                              placeholder="Postal Code"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* crypto */}
                    {payment === "crypto" && (
                      <div id="Checkout-payment-section-crypto" className={css["payment-section-crypto"]}></div>
                    )}

                    {/* saved payments */}
                    {payment === "savedpayments" && (
                      <div id="Checkout-payment-section-savedpayments" className={css["payment-section-savedpayments"]}>
                        {accountWallet > totalPrice ? (
                          <div id="Checkout-account-wallet" className={css["account-wallet"]}>
                            <button className={`${css["account-wallet-box"]} ${cssGlobal["flex-center-left"]}`} id="wallet" onClick={() => walletChoice("wallet")} style={{ cursor: "pointer" }}>
                              <div id="Checkout-account-wallet-icon" className={css["account-wallet-icon"]}>
                                <img id="Checkout-account-wallet-icon-img" src="https://cdn.st.ax/v2/logo.svg"/>
                              </div>
                              <div id="Checkout-account-wallet-info" className={css["account-wallet-info"]}>
                                <p id="Checkout-account-wallet-info-p">Account Wallet<br />
                                  <b>€4.00</b>
                                </p>
                              </div>
                              <div id="Checkout-account-wallet-select" className={css["account-wallet-select"]}>
                                {wallet === "wallet" && (
                                  <span id="Checkout-account-wallet-tick" className={css["account-wallet-tick"]}>
                                    <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                                  </span>
                                )}
                              </div>
                            </button>
                          </div>
                        ):(
                          <div id="Checkout-account-wallet-disable" className={css["account-wallet-disable"]}>
                            <button id="Checkout-account-wallet-box--2" disabled className={`${css["account-wallet-box"]} ${cssGlobal["flex-center-left"]}`}>
                              <div id="Checkout-account-wallet-icon--2" className={css["account-wallet-icon"]}>
                                <img id="Checkout-account-wallet-icon-img--2" src="https://cdn.st.ax/v2/logo.svg"/>
                              </div>
                              <div id="Checkout-account-wallet-info" className={css["account-wallet-info"]}>
                                <p id="Checkout-account-wallet-info-p"> Account Wallet<br />
                                  <b>€4.00</b>
                                </p>
                              </div>
                              <div id="Checkout-account-wallet-select" className={css["account-wallet-select"]}>
                                <span id="Checkout-account-wallet-cross" className={css["account-wallet-cross"]}>
                                  <i className={`${css["fas"]} ${css["fa-times-circle"]} ${"fas fa-times-circle"}`}></i>
                                </span>
                              </div>
                            </button>
                          </div>
                        )}

                        <div id="Checkout-saved-payments-title" className={css["saved-payments-title"]}>
                          <p id="Checkout-saved-payments-title-p">
                            Saved Payments
                          </p>
                        </div>
                        <div id="Checkout-saved-payments" className={`${css["saved-payments"]} ${cssGlobal["flex-center-left"]}`}>
                          <button className={css["saved-payments-list"]} id="type1"
                            onClick={() => walletChoice("type1")}>
                            <div id="Checkout-saved-payments-box" className={`${css["saved-payments-box"]} ${cssGlobal["flex-center-left"]}`}>
                              <div id="Checkout-saved-payments-type" className={css["saved-payments-type"]}>
                                <img id="Checkout-saved-payments-type-img"
                                  src={payIcon_visa}
                                />
                              </div>
                              <div id="Checkout-saved-payments-info" className={css["saved-payments-info"]}>
                                <p id="Checkout-saved-payments-info-p">
                                  <b>Visa</b>
                                  <br />
                                  Ending 1849
                                </p>
                              </div>
                              <div id="Checkout-saved-payments-button" className={css["saved-payments-button"]}>
                                {wallet === "type1" && (
                                  <p id="Checkout-saved-payments-button-p">
                                    <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                    <div id="Checkout-checkout-payment-submit" className={css["checkout-payment-submit-disable"]}>
                      {wallet !== "none" ? (
                        <button className={css["main-button"]} id="Checkout-checkout-payment-submit-input"
                          onClick={() => buyNow()}>
                          Buy Now
                        </button>
                      ) : (
                        <button
                          disabled={true} className={css["main-button"]} id="Checkout-checkout-payment-submit-input"
                        >
                          Buy Now
                        </button>
                      )}
                      <button id="Checkout-loader-button"
                        disabled className={css["loader-button"]}>
                        <div id="Checkout-loader-circle" className={css["loader-circle"]}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {checkout === "completed" && (
                <div id="Checkout-checkout-completed" className={css["checkout-completed"]}>
                  <div id="Checkout-checkout-completed-title" className={css["checkout-completed-title"]}>
                    <h1 id="Checkout-checkout-completed-title-h1">
                      Completed
                      <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        ):(<E404 />)
      }
    </div>
  );
}
