const sales = [
  {
    name: "Classic Roblox Account",
    value: "$120 value",
    price: "$140 asking",
    badge: "Verified",
    description: "Starter account with good balance and easy handover support.",
    paymentTypes: ["PayPal", "CashApp"],
  },
  {
    name: "Premium Builder Account",
    value: "$260 value",
    price: "$300 asking",
    badge: "Ready to Sell",
    description: "A stronger account position with a cleaner transfer process.",
    paymentTypes: ["Zelle", "Crypto"],
  },
  {
    name: "High Value Bundle",
    value: "$410 value",
    price: "$470 asking",
    badge: "Featured",
    description: "Premium bundle for buyers who want a higher-value account listing.",
    paymentTypes: ["PayPal", "Zelle", "CashApp"],
  },
];

const saleGrid = document.getElementById("saleGrid");
const sellerForm = document.getElementById("sellerForm");
const formMessage = document.getElementById("formMessage");

function renderSales() {
  saleGrid.innerHTML = sales
    .map(
      (sale) => `
        <article class="sale-card">
          <span class="sale-badge">${sale.badge}</span>
          <h3>${sale.name}</h3>
          <p>${sale.description}</p>
          <div class="sale-price">${sale.value}</div>
          <div class="sale-meta">${sale.price} • Buyer contact via email</div>
          <div class="sale-meta">Payment types: ${sale.paymentTypes.join(", ")}</div>
        </article>
      `
    )
    .join("");
}

sellerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(sellerForm);
  const email = formData.get("email");
  const robloxUser = formData.get("robloxUser");
  const value = formData.get("value");
  const price = formData.get("price");
  const details = formData.get("details");
  const paymentTypes = sellerForm.querySelectorAll('input[name="paymentTypes"]:checked');
  const selectedPayments = Array.from(paymentTypes).map((item) => item.value).join(", ");

  const payload = {
    email,
    robloxUser,
    value,
    price,
    paymentTypes: selectedPayments || "None selected",
    details,
  };

  formMessage.textContent = "Sending your listing request...";

  try {
    const response = await fetch("https://formspree.io/f/mgoglpkq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      formMessage.textContent = "Your request was sent successfully. We’ll review it and contact you soon.";
      sellerForm.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    formMessage.textContent = "There was a problem sending the request. Please email doormansales123@gmail.com directly.";
  }
});

renderSales();
