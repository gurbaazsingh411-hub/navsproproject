# NAVSPRO Payment Gateway Setup Guide

Hi [Client Name],

I am currently integrating the payment system into the NAVSPRO platform. To ensure that all payments from users go directly into your business bank account, you will need to set up a Razorpay account and provide me with the necessary connection keys. 

Below is a breakdown of how it works, what Razorpay charges, and the steps you need to take.

---

## 1. How It Works
1. When a user clicks to upgrade or pay for their NAVSPRO assessment, a Razorpay checkout window will pop up securely on our site.
2. The user can pay via UPI, Credit/Debit Card, Netbanking, or Wallets.
3. Once the payment is successful, the app instantly unlocks their premium features.
4. The money sits in your Razorpay dashboard and is automatically transferred (settled) to your connected business bank account on a regular schedule (usually T+2 days).

## 2. Pricing & Fees
Razorpay is free to set up and does not have monthly maintenance fees. They only charge a small transaction fee per successful payment:
- **Standard Domestic Transactions (UPI, Wallets, Indian Cards):** ~2% per transaction + 18% GST (on the 2% fee).
- *Example:* On a ₹1,000 payment, Razorpay deducts roughly ₹23.60, and you receive ₹976.40 in your bank account.

*(Note: Pricing can vary slightly based on international cards or specific business agreements, but the 2% is standard for most Indian businesses).*

## 3. What You Need to Do
To connect the app to your bank, you must create the Razorpay account and complete their KYC (Know Your Customer) process. I cannot do this on your behalf, as it requires your business and tax details.

### Step 1: Create the Account
1. Go to [Razorpay.com](https://razorpay.com/) and click **Sign Up**.
2. Fill out your details. You will need:
   - Your Business PAN (or Personal PAN if registering as an individual/proprietor)
   - GST Verification (if applicable)
   - Business Bank Account Details (for payouts)
   - Identity Proof (Aadhaar, Passport, etc.)

### Step 2: Generate the API Keys
Once your account is approved and switched to **Live Mode** (you will see the toggle in the top left or bottom left of the dashboard):
1. Go to **Account & Settings** (left menu).
2. Under "Website and App Settings", click on **API Keys**.
3. Click **Generate Key** (or Regenerate Key).
4. A window will pop up showing two things:
   - **Key Id** (starts with `rzp_live_...`)
   - **Key Secret**

### Step 3: Send Me the Keys
Copy **both** the Key Id and Key Secret securely and send them to me. 
*Note: The Key Secret is only shown once, so please copy it immediately.*

Once I have these two keys, I will plug them into our production servers, and the platform will be ready to process real payments!

Let me know if you get stuck anywhere or if you'd like to get on a quick 5-minute screen share so we can generate the keys together.

Best,
[Your Name]
