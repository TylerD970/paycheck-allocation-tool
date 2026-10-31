const paycheckInput = document.getElementById("paycheck");
const remittanceOutput = document.getElementById("remittance");
const titheOutput = document.getElementById("tithe");
const savingsOutput = document.getElementById("savings");
const remainingOutput = document.getElementById("remaining");

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
});

paycheckInput.addEventListener("input", handlePaycheckInput);
paycheckInput.addEventListener("blur", formatPaycheck);

function calculateDistribution() {
    const amount = paycheckInput.value.replace(/[$,]/g, "");
    const paycheck = Number(amount) || 0;

    const remittance = paycheck * 0.40;
    const tithe = (paycheck-remittance) * 0.10;
    const savings = paycheck * 0.25;
    const remaining = paycheck - remittance - tithe - savings;

    remittanceOutput.textContent = currency.format(remittance);
    titheOutput.textContent = currency.format(tithe);
    savingsOutput.textContent = currency.format(savings);
    remainingOutput.textContent = currency.format(remaining);
}

function formatPaycheck() {
    const amount = paycheckInput.value.replace(/[$,]/g, "");
    const paycheck = Number(amount);

    if (amount !== "" && Number.isFinite(paycheck)) {
        paycheckInput.value = paycheck.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}

function handlePaycheckInput() {
    let amount = paycheckInput.value.replace(/,/g, "");
    amount = amount.replace(/[^\d.]/g, "");
    const decimalPosition = amount.indexOf(".");
    if (decimalPosition !== -1) {
        amount = amount.slice(0, decimalPosition + 1)
            + amount.slice(decimalPosition + 1).replace(/\./g, "");
    }

    const parts = amount.split(".");
    const whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimals = parts.length > 1 ? parts[1].slice(0, 2) : "";
    const formatted = parts.length > 1 ? whole + "." + decimals : whole;

    paycheckInput.value = formatted;
    calculateDistribution();
}
