/* eslint-disable max-classes-per-file */

class Payment {
  constructor(amount, recipient) {
    this.amount = amount;
    this.recipient = recipient;
    this.status = "pending";
  }
  process() {
    this.status = "completed";
    return `Payment of $${this.amount} to ${this.recipient} completed`;
  }
  getDetails() {
    return `$${this.amount} to ${this.recipient} - Status: ${this.status}`
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, recipient, cardNumber) {
    super(amount, recipient)
    this.cardNumber = cardNumber
  }
  getDetails(){
    return `${super.getDetails} (Card: ${this.cardNumber})`
  }
}

class PayPalPayment {}

const processPayments = (payments) => {};

module.exports = {
  Payment,
  CreditCardPayment,
  PayPalPayment,
  processPayments,
};
