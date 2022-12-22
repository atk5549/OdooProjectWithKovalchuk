let surenameClient = document.querySelector('.input__surename');
let firstnameClient = document.querySelector('.input__firstname');

let total = document.querySelector('.total');
let btn = document.querySelector('.submit');

/* получаем данные с модальных окон*/
let modal = document.querySelector('.modal');
let modalClose = document.querySelector('.modal__close');
let modalConfirm = document.querySelector('.modal__confirm');

let modalTitle = document.querySelector('.modal___callback__title');
let modalText = document.querySelector('.modal___callback__text');

let modalgoodsItems = "";


let checkBoxButtons = document.querySelectorAll('[name="cofeename"]');
let checkBoxNumberInputs = document.querySelectorAll('[type="number"]');
let inputs = document.querySelectorAll('input');
let item_checkbox = document.querySelectorAll('.item_checkbox');
let checkBoxLabels = document.querySelectorAll('[class="checkbox__label"]');


/* декларирую переменные*/
let tag_BR = ""
let tag_UL = ""
let tag_LI = ""
let finalPrice = 0;
let data = {};
let finalDATA = [];



/* для перехода на новую строку*/
newLine = document.createElement("br")
newLine.className = "new__line";


for (let [checkBoxButtonIndex, checkBoxButtonItem] of Object.entries(checkBoxButtons)) {
  
  /* на каждой итерации отлавливаю изменения в */
  checkBoxButtonItem.onchange = () => {

    let currentsItems = +checkBoxNumberInputs[checkBoxButtonIndex].value;
    let currentValue = currentsItems * checkBoxButtonItem.value;

    if(checkBoxButtonItem.checked) {

      if(!currentsItems) {
        checkBoxNumberInputs[checkBoxButtonIndex].value = 1;
        finalPrice += +checkBoxButtonItem.value;

      } else {
        finalPrice += currentValue;

      }
    } else {
      checkBoxNumberInputs[checkBoxButtonIndex].value = 0;
      finalPrice -= currentValue;

    }

    total.textContent = `Итого: ${finalPrice} р.`
  }

}



for (let [numberInputIndex, numberInputItem] of Object.entries(checkBoxNumberInputs)) {
    numberInputItem.onfocus = () => {
        let currentValue = +numberInputItem.value * checkBoxButtons[numberInputIndex].value;

        numberInputItem.onblur = () => {
            
            if (checkBoxButtons[numberInputIndex].checked) {
                let nextValue = numberInputItem.value * checkBoxButtons[numberInputIndex].value;
                finalPrice += nextValue - currentValue;
                total.textContent = `Итого: ${finalPrice} р.`
            }
        }
    }
    
}



/* ========= событие для кнопки ОФОРМИТЬ ЗАКАЗ ================ */
function handleClickOnBtnOrder() {
  if (surenameClient.value === "") {alert("Введите Фамилию");} 
  else if (firstnameClient.value === "") {alert("Введите Имя");}
  else if (surenameClient.value === "") {alert("Введите Фамилию");}
  else if (finalPrice === 0) {alert("Укажите название и количество выбранного кофе");}
  else {
    let orderClient = `Заказчик: ${surenameClient.value} ${firstnameClient.value} \nИтого: ${finalPrice} р.`;
    alert(orderClient); 
    openModalWindow();
  }
  makeTotalCheck();
}
btn.addEventListener('click', handleClickOnBtnOrder);

// /* ===================================================*/

// /* начало цикла */

// активируем модальное окно добавляя класс _active
function openModalWindow() {
  modal.classList.add("_active");
}  

function closeModalWindow() {
  modal.classList.remove("_active");
} 

  
/* ЛОГИКА ДЛЯ ОКОНЧАТЕЛЬНОГО ЧЕКА СОС СПИСКОМ ВЫБРАННОГО ПРОДУКТА */  
function makeTotalCheck() {
  
  
  /* если массив не пустой то очищаем его*/
  if (finalDATA.length != 0) {
    finalDATA.length = 0;
  }

  modalText.textContent = "";
   
  
  /* ШАПКА ЧЕКА */
  
  tag_UL = document.createElement("ul");
  tag_UL.className = "goods__items";
  modalText.append(tag_UL)
  
  modalgoodsItems = document.querySelector('.goods__items');
  console.log(modalgoodsItems)
  
  /* добавляю ПЕРВУЮ строчку в ЧЕКЕ*/
  tag_LI = document.createElement("li")
  tag_LI.className = "checkItem";
  tag_LI.textContent = "= = = = = = ЧЕК НА ОПЛАТУ = = = = =";
  modalgoodsItems.append(tag_LI)
  
  
  /* добавляю ВТОРУЮ строчку в ЧЕКЕ*/
  tag_LI = document.createElement("li")
  tag_LI.className = "checkItem";
  tag_LI.textContent = `Фамилия заказчика: ${surenameClient.value}`;
  modalgoodsItems.append(tag_LI)
  
  
  /* добавляю ТРЕТЬЮ строчку в ЧЕКЕ*/
  tag_LI = document.createElement("li")
  tag_LI.className = "checkItem";
  tag_LI.textContent = `Имя заказчика:     ${firstnameClient.value}`;
  modalgoodsItems.append(tag_LI)
  
  
  /* НАПОЛНЕНИЕ ЧЕКА ТОВАРАМИ */
  
  /* данной конструкцией цикла я считываю каждый блок item_checkbox
    определяю индекс*/
  for (let [totalCheckIndex, totalCheckItem] of Object.entries(item_checkbox)) {
    
    /* забираю данные в переменные чтобы мне потом не писать такие длинные конструкции */
    let curentCoffeeName = checkBoxLabels[totalCheckIndex].textContent;
    let currentCoffeePicies = +checkBoxNumberInputs[totalCheckIndex].value;
    let currentCoffeePrice = +checkBoxButtons[totalCheckIndex].value;
    
    
    /* проверяю если количество не указано то по умолчанию пускай будет равно 0(нуль)*/
    if (currentCoffeePicies === "") {
      currentCoffeePicies = 0;
    }
    
    
    /* после проверки на пустоту высчитываю окончательный 
      прайс на момент текущей итерации*/
    let currentCoffeeTotalPrice = checkBoxNumberInputs[totalCheckIndex].value * checkBoxButtons[totalCheckIndex].value;
    
    
    /* проверяю если выбрана хоть одна позиция товара и ее количесво
      равное больше или равно 1 тогда формирую чек*/
    if (currentCoffeePicies >= 1) {
      
      /* формирую информацию о товаре клиенту,
        будет формироваться на каждый товар */
      const RESULT = `☆${curentCoffeeName}☆  [${currentCoffeePrice} * ${currentCoffeePicies} = ${currentCoffeeTotalPrice} руб.]`
      
      /* добавляю словарь по каждому товару в массив finalDATA,
        мне так проще будет переприсвоить индексы на каждый заказаный товар,
        так же клиенту будет виден порядковый номер товара в чеке */
      data = {name: curentCoffeeName, price: parseFloat(currentCoffeePrice), picies: currentCoffeePicies}
      finalDATA.push(data)

    } 
    
   
  }
  

  for ([i, item] of Object.entries(finalDATA)) {
      let curentCoffeeName = finalDATA[i].name
      let currentCoffeePrice = finalDATA[i].price
      let currentCoffeePicies = finalDATA[i].picies
      let currentCoffeeTotalPrice = currentCoffeePrice*currentCoffeePicies
    
      
      let finalStroke =  `☕ ${+i+1}.  ${curentCoffeeName} - [${currentCoffeePrice} * ${currentCoffeePicies}] = ${currentCoffeeTotalPrice} руб.`
      
      
      /* наполняем структуру класса .modal___callback__text |
        т.е. создаю структуру чека и присваиваю классы чтобы
        данные в чеке можно было отстилизовать в CSS*/
      tag_LI = document.createElement("li")
      tag_LI.className = "checkItem";
      tag_LI.textContent = finalStroke;
      modalgoodsItems.append(tag_LI);
      
  };   
      
  
  
  
  tag_LI = document.createElement("li")
  tag_LI.className = "checkItem";
  tag_LI.textContent = "= = = = = = = = = = = = = = = = = =";
  modalgoodsItems.append(tag_LI);
  
  tag_LI = document.createElement("li")
  tag_LI.className = "checkItem";
  tag_LI.textContent = `ИТОГО К ОПЛАТЕ: ${finalPrice} руб.`;
  modalgoodsItems.append(tag_LI);
  
}

modalClose.addEventListener('click', () => {
  closeModalWindow();
  alert("Ваш заказ отменен");
  
})


modalConfirm.addEventListener('click', () => {
  closeModalWindow();
  alert("Ваш заказ принят в работу, спасибо что используете приложение COFFEE HOUSE");
  
})