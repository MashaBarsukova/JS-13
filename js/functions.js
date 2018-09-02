const firstname = document.getElementById("first_name");
const lastname = document.getElementById("last_name");
const tel = document.getElementById("tel");
const submitBtn = document.getElementById("submit-btn");
const resultsList = document.querySelector(".results");

const firstNameReg = /^([a-z]|[а-яё]|[а-яґєії`´ʼ’ʼ’])+(\s[a-z]+|\s[а-яё]+|\s[а-яґєії`´ʼ’ʼ’]+){0,2}$/ig;
const lastNameReg = /^([a-z]|[а-яё]|[а-яґєії`´ʼ’ʼ’])+(([\s-]|(\s-\s))[a-z]+|([\s-]|(\s-\s))[а-яё]+|([\s-]|(\s-\s))[а-яґєії`´ʼ’ʼ’]+){0,1}$/ig;
const telReg = /^\+\d{1}(-?\s?\d){11}$/g;

submitBtn.addEventListener("click", validate);

function validate(evt) {
  //evt.preventDefault();

  const firstNameVal = firstname.value;
  const lastNameVal = lastname.value;
  let telNumVal = tel.value;

  // const validateResult = {
  //   firstNameRes: firstNameReg.test(firstNameVal),
  //   lastNameRes: lastNameReg.test(lastNameVal),
  //   telRes: telReg.test(telNumVal)
  // }

  const validateResult = {
    firstNameRes: firstNameVal.match(firstNameReg),
    lastNameRes: lastNameVal.match(lastNameReg),
    telRes: telNumVal.match(telReg)
  }



  if(!validateResult.firstNameRes) {
    firstname.classList.add('error');
    firstname.setCustomValidity('Введите корректно имя: до 3-х слов!');
  } else firstname.classList.remove('error');

  if(!validateResult.lastNameRes) {
    lastname.classList.add('error');
    lastname.setCustomValidity('Введите корректно фамилию: до 2-х слов, можно через дефис!');
  } else lastname.classList.remove('error');

  if (!validateResult.telRes) {
    tel.classList.add('error');
    tel.setCustomValidity('Введите корректный номер: \'+\' и 12 цифр!');
  } else {
    tel.value = telNumVal.replace(/(\d)(-?\s?)/g, '$1').replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 ');
    tel.classList.remove('error');
  }

  if(validateResult.firstNameRes && validateResult.lastNameRes && validateResult.telRes) {
    evt.preventDefault();
  }
  showResults(validateResult);
}

function showResults(results) {
  resultsList.innerHTML = '';
  for(key in results) {
    if (results[key]) {
      const item = document.createElement('li');
      item.classList.add('success');
      item.innerHTML = `SUCCESS: ${key} passed validation`;
      resultsList.append(item);
    }
    else {
      const item = document.createElement('li');
      item.classList.add('error');
      item.textContent = `ERROR: ${key} failed validation`;
      resultsList.append(item);
    }
  }
}
