const PhoneBox = (searchText, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(allphone => displayAllPhone(allphone.data, datalimit))
};

const displayAllPhone = (displayPhone, datalimit) => {

//function for show all button box
  const showAllButtonBox = document.getElementById('showAllButtonBox')
    if(datalimit && displayPhone.length >10){
      displayPhone = displayPhone.slice(0, 10)
      showAllButtonBox.classList.remove('d-none')
    }
    else{
      showAllButtonBox.classList.add('d-none')
    }
  const PhoneBoxContainer = document.getElementById("phoneContainerBox");
  PhoneBoxContainer.innerHTML ='';




// showing a messeage for not matchig with data
    const searchMessage = document.getElementById('findOutPut');
    if(displayPhone.length ==0){
      searchMessage.classList.remove('d-none')
    }
    else{
      searchMessage.classList.add('d-none');
    }

    displayPhone.forEach(element => {
        const PhoneDiv = document.createElement('div');
        PhoneDiv.classList.add("col");
        PhoneDiv.innerHTML = `
        <div class="card p-5">
        <img src="${element.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

          <button onclick="showPhoneDetails('${element.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Launch static backdrop modal</button>

        </div>
        </div>
        `;
        PhoneBoxContainer.appendChild(PhoneDiv);
      });;
        // start loader 
        toggoleSpinner(false)
    
};

// function for search Button
document.getElementById('SeacrhBtn').addEventListener('click', function(){
   processOfSearch(10)
})

document.getElementById('inputField').addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    processOfSearch(10)
  }
})

// function for show all button only
document.getElementById('showALL').addEventListener('click', function(){
  processOfSearch()
})

// common function for search
const processOfSearch = (datalimit) =>{
  toggoleSpinner(true)
  const searchInput = document.getElementById('inputField');
  const searchValue = searchInput.value;
  searchValue.value = '';

  PhoneBox(searchValue , datalimit);
}
PhoneBox('a')

// function for loader spinner 
const  toggoleSpinner = isloading=> {
  const isloadingBox = document.getElementById('loader');
  if(isloading){
    isloadingBox.classList.remove('d-none');
  }
  else{
    isloadingBox.classList.add('d-none')
  }
}


// function for showing Phone details:

const showPhoneDetails = async id => {
  const idLink = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(idLink);
  const viewDetails = await res.json();
  showPhoneDetailsInModal(viewDetails.data)
}
// show more phone details in modal Body
const showPhoneDetailsInModal = modal =>{
  console.log(modal)
  const phoneTitle = document.getElementById('staticBackdropLabel');
  phoneTitle.innerText = modal.name;

  const moreDetailsAboutPhone = document.getElementById('ModalBody');
   moreDetailsAboutPhone.innerHTML= '';
 const modalDiv = document.createElement('div');
 modalDiv.innerHTML = `
 <p>Brand Name : ${modal.brand}</p>
 <p>Phone Name : ${modal.name}</p>
 <p>Display Size:${modal.mainFeatures.displaySize}</p>
 <p>Sensonr :${modal.mainFeatures.sensors}</p>
 `;
 moreDetailsAboutPhone.appendChild(modalDiv)
}

