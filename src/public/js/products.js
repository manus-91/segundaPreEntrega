function addToCart(id, product) {
  let carrito = "64d6c953ddbeb56bf9552e7e";
  postCart(id, carrito)
    .then((dato) => {
      alert("producto agregado al carrito", dato);
    })
    .catch((err) => console.log(err, "no se agrego el producto "));
}

async function postCart(id, carrito) {
  try {
    const response = await fetch(`/api/carts/${carrito}/product/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function increase(idCart, idProduct) {
  console.log(idCart, idProduct);
  let carrito = "64d6c953ddbeb56bf9552e7e";
  postCart(idProduct, carrito)
    .then((dato) => {
      alert("producto agregado al carrito", dato);
    })
    .catch((err) => console.log(err, "no se agrego el producto "));
}
