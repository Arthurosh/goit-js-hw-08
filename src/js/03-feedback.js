const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
populateFormData();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function populateFormData() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseData = JSON.parse(savedMessage);
  if (savedMessage) {
    if (parseData.email) {
      refs.input.value = parseData.email;
      formData[refs.input.name] = parseData.email;
    }
    if (parseData.message) {
      refs.textarea.value = parseData.message;
      formData[refs.textarea.name] = parseData.message;
    }
  }
}
