$(function () {

    // Slider
    $("#priceSlider").slider({
        range: "max",
        min: 500000,
        max: 3000000,
        value: 3000000,
        slide: function (event, ui) {
            $("#priceLabel").text("Rp " + ui.value.toLocaleString());
            filterProducts(ui.value);
        }
    });

    $("#priceLabel").text("Rp " + $("#priceSlider").slider("value").toLocaleString());

    // filter produk
    function filterProducts(maxPrice) {
        $(".product-card").each(function () {
            let price = $(this).data("price").toString().replace(/\./g, "");
            price = parseInt(price);
            if (price <= maxPrice) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }


    // CART SYSTEM
    let cart = [];

    $(".addToCart").click(function () {
        let name = $(this).siblings("h4").text();
        let price = $(this).siblings(".price").text().replace(/[^\d]/g, "");
        price = parseInt(price);

        cart.push({ name, price });
        updateCart();
    });

    function updateCart() {
        $("#cartItems").empty();
        let total = 0;

        cart.forEach(item => {
            $("#cartItems").append(`<li>${item.name} - Rp ${item.price.toLocaleString()}</li>`);
            total += item.price;
        });

        $("#cartTotal").text(total.toLocaleString());
    }

    $("#cartDialog").dialog({
        autoOpen: false,
        width: 400
    });

    $("#openCart").click(function () {
        $("#cartDialog").dialog("open");
    });

});
