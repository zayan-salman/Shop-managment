// ==========================================
// SHOP HISAB KITAB
// ==========================================


// ==========================================
// LOCAL STORAGE
// ==========================================

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


// ==========================================
// DATE & TIME
// ==========================================

function getToday() {
    const date = new Date();

    return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0")
    );
}


function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


function showDate() {

    const todayElement = document.getElementById("today");

    if (todayElement) {
        todayElement.innerText =
            new Date().toLocaleDateString();
    }
}


// ==========================================
// PAGE NAVIGATION
// ==========================================

function openPage(pageName) {

    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    document.querySelectorAll(".menu").forEach(function(menu) {
        menu.classList.remove("active");
    });


    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }


    const menu = document.querySelector(
        `.menu[data-page="${pageName}"]`
    );

    if (menu) {
        menu.classList.add("active");
    }
}


document.querySelectorAll(".menu").forEach(function(menu) {

    menu.addEventListener("click", function() {

        const pageName =
            menu.getAttribute("data-page");

        openPage(pageName);

    });

});


// ==========================================
// SALES
// ==========================================

function showSaleForm() {

    const form =
        document.getElementById("sale-form");

    if (form) {
        form.classList.toggle("show");
    }
}


function saveSale() {

    const customer =
        document.getElementById("sale-customer").value.trim();

    const product =
        document.getElementById("sale-product").value.trim();

    const quantity =
        Number(document.getElementById("sale-quantity").value);

    const purchasePrice =
        Number(document.getElementById("sale-purchase").value);

    const sellingPrice =
        Number(document.getElementById("sale-price").value);


    if (
        customer === "" ||
        product === "" ||
        quantity <= 0 ||
        purchasePrice <= 0 ||
        sellingPrice <= 0
    ) {
        alert("Bhai tamam information fill karo.");
        return;
    }


    const total =
        sellingPrice * quantity;

    const profit =
        (sellingPrice - purchasePrice) * quantity;


    const sales =
        getData("shop_sales");


    sales.push({

        id: Date.now(),

        date: getToday(),

        time: getTime(),

        customer: customer,

        product: product,

        quantity: quantity,

        purchasePrice: purchasePrice,

        sellingPrice: sellingPrice,

        total: total,

        profit: profit

    });


    saveData("shop_sales", sales);


    // Form clear
    document.getElementById("sale-customer").value = "";
    document.getElementById("sale-product").value = "";
    document.getElementById("sale-quantity").value = "";
    document.getElementById("sale-purchase").value = "";
    document.getElementById("sale-price").value = "";


    renderSales();
    updateDashboard();
    updateHistory();


    alert("Sale save ho gayi ✅");
}


// ==========================================
// SALES LIST
// ==========================================

function renderSales() {

    const list =
        document.getElementById("sales-list");

    if (!list) return;


    const sales =
        getData("shop_sales");

    const today =
        getToday();


    const todaySales =
        sales.filter(function(item) {

            return item.date === today;

        });


    list.innerHTML = "";


    if (todaySales.length === 0) {

        list.innerHTML = `
            <tr>
                <td colspan="8">
                    Aaj koi sale nahi hui.
                </td>
            </tr>
        `;

        return;
    }


    todaySales.forEach(function(item) {

        list.innerHTML += `
            <tr>

                <td>${item.time}</td>

                <td>${item.customer}</td>

                <td>${item.product}</td>

                <td>${item.quantity}</td>

                <td>Rs. ${item.purchasePrice}</td>

                <td>Rs. ${item.sellingPrice}</td>

                <td>Rs. ${item.total}</td>

                <td>Rs. ${item.profit}</td>

            </tr>
        `;

    });

}


// ==========================================
// CUSTOMERS
// ==========================================

function addCustomer() {

    const name =
        prompt("Customer ka naam:");

    if (!name) return;


    const phone =
        prompt("Customer ka phone number:");

    if (!phone) return;


    const customers =
        getData("shop_customers");


    customers.push({

        id: Date.now(),

        name: name,

        phone: phone

    });


    saveData("shop_customers", customers);


    renderCustomers();


    alert("Customer add ho gaya ✅");
}


function renderCustomers() {

    const list =
        document.getElementById("customer-list");

    if (!list) return;


    const customers =
        getData("shop_customers");


    list.innerHTML = "";


    if (customers.length === 0) {

        list.innerHTML = `
            <tr>
                <td colspan="3">
                    Abhi koi customer nahi hai.
                </td>
            </tr>
        `;

        return;
    }


    customers.forEach(function(customer) {

        list.innerHTML += `
            <tr>

                <td>${customer.name}</td>

                <td>${customer.phone}</td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteCustomer(${customer.id})">
                        🗑️ Delete
                    </button>
                </td>

            </tr>
        `;

    });

}


function deleteCustomer(id) {

    const confirmDelete =
        confirm("Kya customer delete karna hai?");

    if (!confirmDelete) return;


    let customers =
        getData("shop_customers");


    customers =
        customers.filter(function(customer) {

            return customer.id !== id;

        });


    saveData("shop_customers", customers);

    renderCustomers();
}


// ==========================================
// UDHAAR
// ==========================================

function addUdhaar() {

    const customer =
        prompt("Customer ka naam:");

    if (!customer) return;


    const amount =
        Number(prompt("Udhaar amount:"));


    if (!amount || amount <= 0) {

        alert("Amount sahi enter karo.");

        return;
    }


    const udhaar =
        getData("shop_udhaar");


    udhaar.push({

        id: Date.now(),

        date: getToday(),

        customer: customer,

        amount: amount

    });


    saveData("shop_udhaar", udhaar);


    renderUdhaar();
    updateDashboard();
    updateHistory();


    alert("Udhaar save ho gaya 📒");
}


function renderUdhaar() {

    const list =
        document.getElementById("udhaar-list");

    if (!list) return;


    const udhaar =
        getData("shop_udhaar");

    const today =
        getToday();


    const todayUdhaar =
        udhaar.filter(function(item) {

            return item.date === today;

        });


    list.innerHTML = "";


    if (todayUdhaar.length === 0) {

        list.innerHTML = `
            <tr>
                <td colspan="3">
                    Aaj koi udhaar nahi hai.
                </td>
            </tr>
        `;

        return;
    }


    todayUdhaar.forEach(function(item) {

        list.innerHTML += `
            <tr>

                <td>${item.customer}</td>

                <td>Rs. ${item.amount}</td>

                <td>${item.date}</td>

            </tr>
        `;

    });

}


// ==========================================
// PRODUCTS / STOCK
// ==========================================

function addProduct() {

    const product =
        prompt("Product ka naam:");

    if (!product) return;


    const quantity =
        Number(prompt("Quantity:"));


    if (!quantity || quantity <= 0) {

        alert("Quantity sahi enter karo.");

        return;
    }


    const stock =
        getData("shop_stock");


    stock.push({

        id: Date.now(),

        product: product,

        quantity: quantity,

        date: getToday()

    });


    saveData("shop_stock", stock);


    renderStock();
    updateDashboard();


    alert("Product stock mein add ho gaya 📦");
}


// ==========================================
// STOCK LIST
// ==========================================

function renderStock() {

    const list =
        document.getElementById("stock-list");

    if (!list) return;


    const stock =
        getData("shop_stock");


    list.innerHTML = "";


    if (stock.length === 0) {

        list.innerHTML = `
            <tr>
                <td colspan="3">
                    Abhi stock mein koi product nahi hai.
                </td>
            </tr>
        `;

        return;
    }


    stock.forEach(function(item) {

        list.innerHTML += `
            <tr>

                <td>${item.product}</td>

                <td>${item.quantity}</td>

                <td>${item.date || "Old Record"}</td>

            </tr>
        `;

    });

}


// ==========================================
// PURCHASES
// ==========================================

function addPurchase() {

    const product =
        prompt("Purchase kiya hua product:");

    if (!product) return;


    const amount =
        Number(prompt("Purchase amount:"));


    if (!amount || amount <= 0) {

        alert("Amount sahi enter karo.");

        return;
    }


    const purchases =
        getData("shop_purchases");


    purchases.push({

        id: Date.now(),

        date: getToday(),

        product: product,

        amount: amount

    });


    saveData("shop_purchases", purchases);


    updatePurchaseTotal();
    updateHistory();


    alert("Purchase save ho gayi 🛒");
}


function updatePurchaseTotal() {

    const element =
        document.getElementById("purchase-total");

    if (!element) return;


    const purchases =
        getData("shop_purchases");

    const today =
        getToday();


    const todayPurchases =
        purchases.filter(function(item) {

            return item.date === today;

        });


    let total = 0;


    todayPurchases.forEach(function(item) {

        total += Number(item.amount);

    });


    element.innerText =
        "Rs. " + total;
}


// ==========================================
// EXPENSES
// ==========================================

function addExpense() {

    const title =
        prompt("Expense kis cheez ka hai?");

    if (!title) return;


    const amount =
        Number(prompt("Expense amount:"));


    if (!amount || amount <= 0) {

        alert("Amount sahi enter karo.");

        return;
    }


    const expenses =
        getData("shop_expenses");


    expenses.push({

        id: Date.now(),

        date: getToday(),

        title: title,

        amount: amount

    });


    saveData("shop_expenses", expenses);


    updateExpenseTotal();
    updateHistory();


    alert("Expense save ho gaya 💸");
}


function updateExpenseTotal() {

    const element =
        document.getElementById("expense-total");

    if (!element) return;


    const expenses =
        getData("shop_expenses");

    const today =
        getToday();


    const todayExpenses =
        expenses.filter(function(item) {

            return item.date === today;

        });


    let total = 0;


    todayExpenses.forEach(function(item) {

        total += Number(item.amount);

    });


    element.innerText =
        "Rs. " + total;
}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const today =
        getToday();


    // SALES
    const sales =
        getData("shop_sales");


    const todaySales =
        sales.filter(function(item) {

            return item.date === today;

        });


    let salesTotal = 0;

    let profitTotal = 0;


    todaySales.forEach(function(item) {

        salesTotal += Number(item.total);

        profitTotal += Number(item.profit);

    });


    const salesElement =
        document.getElementById("dashboard-sales");


    const profitElement =
        document.getElementById("dashboard-profit");


    if (salesElement) {

        salesElement.innerText =
            "Rs. " + salesTotal;

    }


    if (profitElement) {

        profitElement.innerText =
            "Rs. " + profitTotal;

    }


    // UDHAAR
    const udhaar =
        getData("shop_udhaar");


    const todayUdhaar =
        udhaar.filter(function(item) {

            return item.date === today;

        });


    let udhaarTotal = 0;


    todayUdhaar.forEach(function(item) {

        udhaarTotal += Number(item.amount);

    });


    const udhaarElement =
        document.getElementById("dashboard-udhaar");


    if (udhaarElement) {

        udhaarElement.innerText =
            "Rs. " + udhaarTotal;

    }


    // PRODUCTS
    const stock =
        getData("shop_stock");


    const productsElement =
        document.getElementById("dashboard-products");


    if (productsElement) {

        productsElement.innerText =
            stock.length;

    }


    renderDashboardSales();
}


// ==========================================
// DASHBOARD SALES
// ==========================================

function renderDashboardSales() {

    const list =
        document.getElementById("dashboard-sales-list");

    if (!list) return;


    const sales =
        getData("shop_sales");

    const today =
        getToday();


    const todaySales =
        sales.filter(function(item) {

            return item.date === today;

        });


    list.innerHTML = "";


    if (todaySales.length === 0) {

        list.innerHTML = `
            <tr>
                <td colspan="5">
                    Aaj abhi koi sale nahi hui.
                </td>
            </tr>
        `;

        return;
    }


    todaySales.forEach(function(item) {

        list.innerHTML += `
            <tr>

                <td>${item.time}</td>

                <td>${item.customer}</td>

                <td>${item.product}</td>

                <td>${item.quantity}</td>

                <td>Rs. ${item.total}</td>

            </tr>
        `;

    });

}


// ==========================================
// CLEAR TODAY'S HISAB
// ==========================================

function clearToday() {

    const confirmDelete = confirm(

        "⚠️ AAJ KA HISAB CLEAR KARNA HAI?\n\n" +

        "✓ Sales\n" +
        "✓ Purchases\n" +
        "✓ Udhaar\n" +
        "✓ Expenses\n" +
        "✓ Products / Stock\n\n" +

        "Sab clear ho jayega."

    );


    if (!confirmDelete) {
        return;
    }


    // SALES CLEAR
    localStorage.removeItem("shop_sales");


    // PURCHASES CLEAR
    localStorage.removeItem("shop_purchases");


    // UDHAAR CLEAR
    localStorage.removeItem("shop_udhaar");


    // EXPENSES CLEAR
    localStorage.removeItem("shop_expenses");


    // PRODUCTS / STOCK CLEAR
    localStorage.removeItem("shop_stock");


    // SCREEN REFRESH
    renderSales();

    renderUdhaar();

    renderStock();

    updatePurchaseTotal();

    updateExpenseTotal();

    updateDashboard();

    updateHistory();


    alert(
        "Sales, Purchases, Udhaar, Expenses aur Products sab clear ho gaye ✅"
    );
}


// ==========================================
// DAILY HISTORY
// ==========================================

function updateHistory() {

    const list =
        document.getElementById("history-list");

    if (!list) return;


    const sales =
        getData("shop_sales");

    const purchases =
        getData("shop_purchases");

    const udhaar =
        getData("shop_udhaar");

    const expenses =
        getData("shop_expenses");


    const dates = [];


    sales.forEach(function(item) {

        if (!dates.includes(item.date)) {

            dates.push(item.date);

        }

    });


    purchases.forEach(function(item) {

        if (!dates.includes(item.date)) {

            dates.push(item.date);

        }

    });


    udhaar.forEach(function(item) {

        if (!dates.includes(item.date)) {

            dates.push(item.date);

        }

    });


    expenses.forEach(function(item) {

        if (!dates.includes(item.date)) {

            dates.push(item.date);

        }

    });


    dates.sort().reverse();


    list.innerHTML = "";


    if (dates.length === 0) {

        list.innerHTML = `
            <div class="history-item">
                Abhi koi history nahi hai.
            </div>
        `;

        return;
    }


    dates.forEach(function(date) {

        const dateSales =
            sales.filter(function(item) {

                return item.date === date;

            });


        let salesTotal = 0;

        let profitTotal = 0;


        dateSales.forEach(function(item) {

            salesTotal += Number(item.total);

            profitTotal += Number(item.profit);

        });


        const datePurchases =
            purchases.filter(function(item) {

                return item.date === date;

            });


        let purchaseTotal = 0;


        datePurchases.forEach(function(item) {

            purchaseTotal += Number(item.amount);

        });


        const dateUdhaar =
            udhaar.filter(function(item) {

                return item.date === date;

            });


        let udhaarTotal = 0;


        dateUdhaar.forEach(function(item) {

            udhaarTotal += Number(item.amount);

        });


        const dateExpenses =
            expenses.filter(function(item) {

                return item.date === date;

            });


        let expenseTotal = 0;


        dateExpenses.forEach(function(item) {

            expenseTotal += Number(item.amount);

        });


        list.innerHTML += `

            <div class="history-item">

                <h3>📅 ${date}</h3>

                <p>
                    💰 Sales:
                    <strong>Rs. ${salesTotal}</strong>
                </p>

                <p>
                    📈 Profit:
                    <strong>Rs. ${profitTotal}</strong>
                </p>

                <p>
                    🛒 Purchases:
                    <strong>Rs. ${purchaseTotal}</strong>
                </p>

                <p>
                    📒 Udhaar:
                    <strong>Rs. ${udhaarTotal}</strong>
                </p>

                <p>
                    💸 Expenses:
                    <strong>Rs. ${expenseTotal}</strong>
                </p>

            </div>

        `;

    });

}


// ==========================================
// START
// ==========================================

showDate();

renderSales();

renderCustomers();

renderUdhaar();

renderStock();

updatePurchaseTotal();

updateExpenseTotal();

updateDashboard();

updateHistory();    