let productName = document.getElementById("pn");
let productPrice = document.getElementById("pp");
let productDescription = document.getElementById("pd");
let addProduct = document.getElementById("addProduct");
let btnUpdate = document.getElementById("update");
let search = document.getElementById("search")
let temp;

let allProduct = []

function getData(){
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(json => {
    allProduct = json.user
    showData()
    console.log(allProduct)
})
}
getData()

function showData(){

    let outProduct = ""
    for (let i=0 ; i<allProduct.length ; i++){
        outProduct += `<tr>
          <td>${i+1}</td>
          <td>${allProduct[i].name}</td>
          <td>${allProduct[i].price}</td>
          <td>${allProduct[i].description}</td>
          
          <td>
            <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
          </td>
          <td>
            <button onclick="deleteProduct(${allProduct[i].id})" class="btn btn-danger">Delete</button>
          </td>
        </tr>`
  }

  document.getElementById("data").innerHTML = outProduct;
}

function getInput(){

  if(reduxName() && reduxPrice() && reduxDescription()){
    let data = {
      name :productName.value,
      price : productPrice.value,
      description: productDescription.value 
      }
  crudProduct('addProduct' , 'POST' , data)
    productName.classList.remove('valid')
    productPrice.classList.remove('valid')
    productDescription.classList.remove('valid')
  
  clearForm()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Added in successfully'
  })
  }else{
    productName.classList.add('not-valid')
    productPrice.classList.add('not-valid')
    productDescription.classList.add('not-valid')

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Please Fill All Firlds'
    })

  }
    

}
let test

async function crudProduct(endPoint , method , data  ){
    // main.js

// POST request using fetch()
 test = await fetch(`http://localhost:3001/${endPoint}`, {
	
	// Adding method type
	method: method,
	
	// Adding body or contents to send
	body: JSON.stringify(data),
	
	// Adding headers to the request
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
})

// Converting to JSON
.then(response => response.json())
// Displaying results to console
.then(json => {
  
    if(json.message == 'success'){
        allProduct = json.user
        getData()
    }
    else{
      allProduct = json.user
      showData()
      console.log(allProduct)
    }
});

}



function deleteProduct(id){
  let data = {id}
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
        
        Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
        
        crudProduct('delete' , 'DELETE' , data)
        getData()
    }
  })
}

function updateProduct(index){

  productName.value = allProduct[index].name;
  productPrice.value = allProduct[index].price;
  productDescription.value = allProduct[index].description;
  btnUpdate.classList.replace('d-none' , 'd-block')
  addProduct.classList.add("d-none")
  temp = allProduct[index].id
  document.documentElement.scrollTop = 0;
}



function getUpdate(){

  if(reduxName() && reduxPrice() && reduxDescription()){
    let data = {
      id: temp,
      name: productName.value,
      price: productPrice.value,
      description: productDescription.value
    }
    crudProduct('update' , 'PUT' , data)
    clearForm()
    addProduct.classList.replace('d-none' , 'd-block')
    btnUpdate.classList.replace("d-block" , "d-none")
  
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Update in successfully'
    })

  }else{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Please Fill All Firlds'
    })
  }

}

function clearForm(){
  productName.value = ""
  productPrice.value = ""
  productDescription.value = ""
}

search.addEventListener("keyup" , function(e){
  let data = {name : e.target.value}
  crudProduct('searchName' , 'POST' , data)
  
  
})

//*****************Name***********************/
productName.addEventListener("keyup" , function(e){
    if(reduxName()){
        productName.classList.add('valid')
        productName.classList.remove('not-valid')
    }else{
      productName.classList.remove('valid')
      productName.classList.add('not-valid')
    }
})
  

//*****************Price***********************/
  
productPrice.addEventListener("keyup" , function(e){

  if(reduxName()){
    productPrice.classList.add('valid')
    productPrice.classList.remove('not-valid')
  }else{
  productPrice.classList.remove('valid')
    productPrice.classList.add('not-valid')
  }
})


//*****************Description***********************/
  
productDescription.addEventListener("keyup" , function(e){

  if(reduxName()){
    productDescription.classList.add('valid')
    productDescription.classList.remove('not-valid')
  }else{
    productDescription.classList.remove('valid')
    productDescription.classList.add('not-valid')
  }
})


function reduxName(){
  let ralglarName = /^[A-Z-a-z]{3,}$/m;
  return ralglarName.test(productName.value)
}
function reduxPrice(){
  let ralglarPrice = /^\S[0-9]{1,6}$/;
  return ralglarPrice.test(productPrice.value)
}
function reduxDescription(){
  let ralglarDescription = /^(.[a-z]{2,300})$/m;
  return ralglarDescription.test(productDescription.value)
}

