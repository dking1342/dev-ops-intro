import './style.css'

// DOM elements lookup
let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let interestsInput = document.querySelector("#interests");
const submitBtn = document.querySelector("#submit");
const selectForm = document.querySelector("#form_select");
const userProfile = document.querySelector(".user_profile");
const userSelect = document.querySelector("#user_select");
let usernameText = document.querySelector("#user_name");
let useremailText = document.querySelector("#user_email");
let userinterestsText = document.querySelector("#user_interests");
const userContainer = document.querySelector("#user_container");
const deleteBtn = document.querySelector("#delete_user");

// state
let hasUserInfo = false;
let formType = null;
const formState = {
  id:null,
  name:"",
  email:"",
  interests:""
}


// helper functions
const populateUsersList = (users) => {
  if(users.length){
    users.forEach(user => {
      const optionElement = document.createElement("option");
      optionElement.value = user._id;
      optionElement.textContent = user.name;
      userSelect.append(optionElement);
    })
  } else {
    userContainer.style.display="none";
  }
};

const populateFormTypeList = (hasUserInfo) => {
  const optionElement = document.createElement("option");
  if(!hasUserInfo){
    if(selectForm.childElementCount > 1){
      selectForm.removeChild(selectForm.lastElementChild);      
    }
    optionElement.value = "create";
    optionElement.textContent = "Create";
    submitBtn.value = "Save"
  } else {
    if(selectForm.childElementCount > 1){
      selectForm.removeChild(selectForm.lastElementChild);      
    }
    optionElement.value = "update";
    optionElement.textContent = "Update";
    submitBtn.value = "Update"
  }
  selectForm.append(optionElement);
}

const toggleDisplay = (hasUserInfo, data=null) => {
  if(!hasUserInfo){
    userProfile.style.display="none";
  } else {
    userProfile.style.display="block";
    usernameText.textContent = data.name;
    useremailText.textContent = data.email;
    userinterestsText.textContent = data.interests.join(", ");
    nameInput.value = data.name;
    nameInput.textContent = data.name;
    emailInput.value = data.email;
    emailInput.textContent = data.email;
    interestsInput.value = data.interests.join(", ");
    interestsInput.textContent = data.interests.join(", ");
    formState.id = data._id;
  }
}

// fetch requests
// template
const fetchRequest = async (url,method="GET",body=null) => {
  let options = {
    method, 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body
  }

  try {
    const response = await fetch(url,options);
    if(response.ok){
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

// get all users
const getUsers = async() => {
  hasUserInfo = false;
  const data = await fetchRequest("http://localhost:5001/");
  if(data){
    populateUsersList(data);
    populateFormTypeList(hasUserInfo);
    toggleDisplay(hasUserInfo)
  } else {
    console.error("invalid fetch");
  }
}

// get single user
const getUser = async (id) => {
  hasUserInfo = true;
  const url = `http://localhost:5001/users/${id}`;
  const data = await fetchRequest(url);
  if(data){
    populateUsersList([]);
    populateFormTypeList(hasUserInfo);
    toggleDisplay(hasUserInfo,data[0]);
  } else {
    console.error("invalid fetch");
  }
}

// events
document.addEventListener("DOMContentLoaded",async (e)=> {
  await getUsers()
});

// ui events
userSelect.addEventListener("change", (e)=>{
  getUser(e.target.value);
})

selectForm.addEventListener("change",(e) => {
  formType = e.target.value;
});

nameInput.addEventListener("keyup",(e)=>{
  nameInput.value = e.target.value;
});
emailInput.addEventListener("keyup",(e)=>{
  emailInput.value = e.target.value;
});
interestsInput.addEventListener("keyup",(e) => {
  interestsInput.value = e.target.value;
})

submitBtn.addEventListener("click",async (e) => {
  e.preventDefault();
  if(!formType){
    alert("Please choose form type");
  } else {
    formState.name = nameInput.value;
    formState.email = emailInput.value;
    formState.interests = interestsInput.value.split(", ");

    let id = null;
    if(formType === "create"){
      const data = await fetchRequest(`http://localhost:5001/user/create`,"POST",JSON.stringify(formState));
      data ? getUser(data) : console.error("invalid fetch");
    } else {
      const data = await fetchRequest(`http://localhost:5001/user/update/${formState.id}`,"PUT",JSON.stringify(formState));
      data ? getUser(data[0]._id) : console.error("invalid fetch");
    } 
  }
});

deleteBtn.addEventListener("click",async (e)=>{
  if(confirm("Are you sure you want to delete?")){
    const data = await fetchRequest(`http://localhost:5001/user/delete/${formState.id}`,"DELETE");
    data ? location.reload() : console.error("invalid fetch");
  }
})