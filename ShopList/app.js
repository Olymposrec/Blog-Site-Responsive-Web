const dolar = prompt('Current Dollar Rate: ');
console.log(dolar);
//** Storage Controller
const StorageController = (function () {

    return{
        storeProduct:function(product){
            let products;
            if(localStorage.getItem('products')===null){
                products = [];
                products.push(product);
               
            }else{
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products',JSON.stringify(products));
        },
        getProducts:function(){
            let products;
            if(localStorage.getItem('products')===null){
                products = [];
               
            }else{
                products = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProducts:function(product){
            let products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function(prd,index){
                if(products.id == prd.id){
                    products.splice(index,1,product);
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        },
        deleteProduct:function(id){
            let products = JSON.parse(localStorage.getItem('products'));

            products.forEach(function(prd,index){
                if(id == prd.id){
                    products.splice(index,1);
                }
            });
            localStorage.setItem('products',JSON.stringify(products));
        }
    }

})();

//** Product Controller
const ProductController = (function () {
	// Private Members
	const Product = function (id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
	};

	const data = {
		products: StorageController.getProducts(),
		selectedProduct: null,
		totalPrice: 0,
	};

	// Public Members
	return {
		getProducts: function () {
			return data.products;
		},
		getData: function () {
			return data;
		},
		addProduct: function (name, price) {
			let id;

			if (data.products.length > 0) {
				id = data.products[data.products.length - 1].id + 1;
			} else {
				id = 0;
			}

			const newProduct = new Product(id, name, parseFloat(price));
			data.products.push(newProduct);
			return newProduct;
		},
		updateProduct: function (name, price) {
			let product = null;

			data.products.forEach(function (item) {
				if (item.id == data.selectedProduct.id) {
					item.name = name;
					item.price = parseFloat(price);
					product = item;
				}
			});

			return product;
		},
		deleteProduct: function (product) {
			data.products.forEach(function (prd, index) {
				if (prd.id == product.id) {
					data.products.splice(index, 1);
				}
			});
		},
		getTotal: function () {
			let total = 0;

			data.products.forEach(function (item) {
				total += item.price;
			});

			data.totalPrice = total;
			return data.totalPrice;
		},
		getProductById: function (id) {
			let product = null;

			data.products.forEach(function (prd) {
				if (prd.id == id) {
					product = prd;
				}
			});

			return product;
		},
		setCurrentProduct: function (prd) {
			data.selectedProduct = prd;
		},
		getCurrentProduct: function () {
			return data.selectedProduct;
		},
	};
})();

//** UI Controller
const UIController = (function () {
	const Selectors = {
		prodctsList: "#item-list",
		productListItems: "#item-list tr",
		addButton: ".addBtn",
		editBtn: ".editBtn",
		deleteBtn: ".deleteBtn",
		cancelBtn: ".cancelBtn",
		productName: "#productName",
		productPrice: "#productPrice",
		productCard: "#productCard",
		totalTl: "#total-tl",
		totalDl: "#total-dolar",
	};

	return {
		createProductList: function (products) {
			let html = "";

			products.forEach((item) => {
				html += `
                <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${(item.price).toFixed(2)} ₺</td>
                        <td class="text-right">     <i class="far fa-edit edit-product"></i>
                        </td>
                </tr>
                `;
			});

			document.querySelector(Selectors.prodctsList).innerHTML = html;
		},
		getSelectors: function () {
			return Selectors;
		},
		addProduct: function (prd) {
			document.querySelector(Selectors.productCard).style.display =
				"block";
			var item = `
            <tr>
                  <td>${prd.id}</td>
                  <td>${prd.name}</td>
                  <td>${(prd.price).toFixed(2)} ₺</td>
                  <td class="text-right">     <i class="far fa-edit edit-product"></i> 
                  </td>
              </tr>
            `;
			document.querySelector(Selectors.prodctsList).innerHTML += item;
		},
		clearInputs: function () {
			document.querySelector(Selectors.productName).value = "";
			document.querySelector(Selectors.productPrice).value = "";
		},
		clearWarnings: function () {
			const items = document.querySelectorAll(Selectors.productListItems);
			items.forEach(function (item) {
				if (item.classList.contains("bg-warning")) {
					item.classList.remove("bg-warning");
				}
			});
		},
		hideCard: function () {
			document.querySelector(Selectors.productCard).style.display =
				"none";
		},
		showTotal: function (total) {
			document.querySelector(Selectors.totalTl).textContent =
				total.toFixed(2);
			document.querySelector(Selectors.totalDl).textContent = (
				total / dolar
			).toFixed(2);
		},
		addProductToForm: function () {
			const selectedProduct = ProductController.getCurrentProduct();
			document.querySelector(Selectors.productName).value =
				selectedProduct.name;
			document.querySelector(Selectors.productPrice).value =
				selectedProduct.price;
		},
		deleteProduct: function () {
			let items = document.querySelectorAll(Selectors.productListItems);

			items.forEach(function (item) {
				if (item.classList.contains("bg-warning")) {
					item.remove();
				}
			});
		},
		updateProduct: function (prd) {
			let updatedItem = null;

			let items = document.querySelectorAll(Selectors.productListItems);

			items.forEach(function (item) {
				if (item.classList.contains("bg-warning")) {
					item.children[1].textContent = prd.name;
					console.log(item.children[1].textContent);
					item.children[2].textContent = prd.price + " $";
					updatedItem = item;
				}
			});

			return updatedItem;
		},
		addingState: function (item) {
			UIController.clearWarnings();
			UIController.clearInputs();
			document.querySelector(Selectors.addButton).style.display =
				"inline";
			document.querySelector(Selectors.deleteBtn).style.display = "none";
			document.querySelector(Selectors.cancelBtn).style.display = "none";
			document.querySelector(Selectors.editBtn).style.display = "none";
		},
		editState: function (tr) {
			tr.classList.add("bg-warning");
			document.querySelector(Selectors.addButton).style.display = "none";
			document.querySelector(Selectors.deleteBtn).style.display =
				"inline";
			document.querySelector(Selectors.cancelBtn).style.display =
				"inline";
			document.querySelector(Selectors.editBtn).style.display = "inline";
		},
	};
})();

//**App Controller
const APPController = (function (ProductCtrl, UICtrl, StorageCtrl) {
	const UISelectors = UIController.getSelectors();

	// Load Event Listeners
	const loadEvetnListeners = function () {
		// Add product event
		document
			.querySelector(UISelectors.addButton)
			.addEventListener("click", productAddSubmit);

		// EDIT PRODUCT CLICK
		document
			.querySelector(UISelectors.prodctsList)
			.addEventListener("click", productEditClick);

		// EDIT PRODUCT SUBMIT
		document
			.querySelector(UISelectors.editBtn)
			.addEventListener("click", productUpdateSubmit);

		// CANCEL BUTTON CLICK
		document
			.querySelector(UISelectors.cancelBtn)
			.addEventListener("click", cancelUpdate);

		// DELETE PRODUCT SUBMIT
		document
			.querySelector(UISelectors.deleteBtn)
			.addEventListener("click", deleteProductSubmit);
	};
	const productAddSubmit = function (e) {
		const productName = document.querySelector(
			UISelectors.productName
		).value;
		const productPrice = document.querySelector(
			UISelectors.productPrice
		).value;

		if (productName !== "" && productPrice !== "") {
			// Add Product
			const newProduct = ProductCtrl.addProduct(
				productName,
				productPrice
			);

			// ADD ITEM TO LIST
			UICtrl.addProduct(newProduct);

            // ADD PRODUCT TO LS
            StorageCtrl.storeProduct(newProduct);

			// GET TOTAL
			const total = ProductController.getTotal();

			// SHOW TOTAL
			UICtrl.showTotal(total);

			// CLEAR INPUTS
			UICtrl.clearInputs();
		}

		console.log(productName, productPrice);
		e.preventDefault();
	};
	const productEditClick = function (e) {
		if (e.target.classList.contains("edit-product")) {
			const id = parseFloat(
				e.target.parentNode.previousElementSibling
					.previousElementSibling.previousElementSibling.textContent
			);

			// GET SELECTED PRODUCT
			const product = ProductCtrl.getProductById(id);

			// SET CURRENT PRODUCT
			ProductCtrl.setCurrentProduct(product);

			// UI CLEAR WARN
			UICtrl.clearWarnings();

			// ADD PRODUCT TO UI
			UICtrl.addProductToForm();

			UIController.editState(e.target.parentNode.parentNode);
		}
		e.preventDefault();
	};
	const productUpdateSubmit = function (e) {
		const productName = document.querySelector(
			UISelectors.productName
		).value;
		const productPrice = document.querySelector(
			UISelectors.productPrice
		).value;

		if (productName !== "" && productPrice !== "") {
			//Update Product
			const updatedProduct = ProductCtrl.updateProduct(
				productName,
				productPrice
			);

			// Update UI
			let item = UIController.updateProduct(updatedProduct);

            // UPDATE STORAGE
            StorageCtrl.updateProducts(updatedProduct);

            // GET TOTAL
			const total = ProductController.getTotal();

			// SHOW TOTAL
			UICtrl.showTotal(total);

			UICtrl.addingState();
		}

		e.preventDefault();
	};
	const cancelUpdate = function (e) {
		UIController.addingState();
		UIController.clearWarnings();
		e.preventDefault();
	};
	const deleteProductSubmit = function (e) {
		// GET SELECTED PRODUCT
		const selectedProduct = ProductCtrl.getCurrentProduct();

		// DELETE PRODUCT
		ProductCtrl.deleteProduct(selectedProduct);

		// DELETE UI
		UIController.deleteProduct();
		// GET TOTAL
		const total = ProductController.getTotal();

		// SHOW TOTAL
		UICtrl.showTotal(total);

        // DELETE FROM STORAGE
        StorageCtrl.deleteProduct(selectedProduct.id);

		UICtrl.addingState();

        if(total==0){
            UICtrl.hideCard();
        }


		e.preventDefault();
	};
	return {
		init: function () {
			console.log("app is starting...");
			UIController.addingState();
			const products = ProductCtrl.getProducts();
			if (products.length == 0) {
				UICtrl.hideCard();
			} else {
				UICtrl.createProductList(products);
			}

			// Load Event Listeners
			loadEvetnListeners();
		},
	};
})(ProductController, UIController, StorageController);

APPController.init();
