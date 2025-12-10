const container = document.querySelector(".services-modal");

export function defineBmr(sex, weight, height, age) {
    let basalCalories;

    if (sex === "female") {
            basalCalories = (10*parseFloat(weight))+(6.25*parseFloat(height)*100)-(5*parseInt(age))-161
            return basalCalories;
        }

    else {
        basalCalories = (10*parseFloat(weight))+(6.25*parseFloat(height)*100)-(5*parseInt(age))+5
        return basalCalories;
    }
}

export function defineTdee(activity, bmr) {
    let totalEnergy;

    if (activity === "sedentary") {
        totalEnergy = bmr*1.2
        return totalEnergy;
    }

    else if (activity === "lightly active") {
        totalEnergy = bmr*1.375
        return totalEnergy;
    }

    else if (activity === "moderately active") {
        totalEnergy = bmr*1.55
        return totalEnergy;
    }

    else if (activity === "very active") {
        totalEnergy = bmr*1.725
        return totalEnergy;
    }

    else {
        totalEnergy = bmr*1.9
        return totalEnergy;
    }
}

export function createServiceModal(bmr, tdee, minCal, maxCal) {
    let modal = document.createElement("dialog");
    let modalTitle = document.createElement("div");
    modalTitle.className = "modal-title";
    let modalMessage = document.createElement("h2");
    modalMessage.textContent = `Data successfully sent!`;
    let modalClose = document.createElement("button");
    modalClose.textContent = "X";
    modalTitle.appendChild(modalMessage);
    modalTitle.appendChild(modalClose);
    let modalData = document.createElement("div");
    modalData.className = "modal-data";
    let bmrResult = document.createElement("p");
    bmrResult.innerHTML = `Your BMR (Basal Metabolic Rate) is <strong>${bmr} calories.</strong>`;
    let tdeeResult = document.createElement("p");
    tdeeResult.innerHTML = `And your TDEE (Total Daily Energy Expenditure) is <strong>${tdee} calories.</strong>`;
    let minMax = document.createElement("p");
    minMax.innerHTML = `<strong>You must consume between ${minCal} and ${maxCal} calories daily!</strong>`
    modalData.appendChild(bmrResult);
    modalData.appendChild(tdeeResult);
    modalData.appendChild(minMax);
    let modalOptions = document.createElement("h2");
    modalOptions.className = "options-h2";
    modalOptions.textContent = `What do you want to do now?`;
    modal.appendChild(modalTitle);
    modal.appendChild(modalData);
    modal.appendChild(modalOptions);

    let servicesTemplate = document.createElement("div");
    servicesTemplate.className = "services"
    servicesTemplate.innerHTML = `<figure>
                    <a href="" id="generate-meal"><img src="./finalproject/images/generate-meal.jpg" alt="generate-meal" loading="lazy"></a>
                    <figcaption><strong>Generate Meal</strong></figcaption>
                </figure>
                <figure>
                    <a href="" id="generate-routine"><img src="./finalproject/images/generate-routine.jpg" alt="generate routine" loading="lazy"></a>
                    <figcaption><strong>Generate Routine</strong></figcaption>
                </figure>`

    modal.appendChild(servicesTemplate);

    container.appendChild(modal);

    modal.showModal();

    modalClose.addEventListener("click", function() {
        modal.close();
        document.getElementById("insert-data").reset();
    })

    let mealForm = document.createElement("div");
    mealForm.className = "mealForm";
    mealForm.innerHTML =`<form action="recipes.html" id="meal-form">
            <h2>Select Meal</h2>
                <select id="mealType">
                <option value="breakfast">Breakfast</option>
                <option value="main course">Lunch or Dinner</option>
                <option value="snack">Snack</option>
            </select>
            <button type="submit" id="search-meal">Search Meal</button>
        </form>`

    let routineForm = document.createElement("div");
    routineForm.className = "routineForm";
    routineForm.innerHTML =`<form id="routine-form">
            <h2>Select Routine</h2>
                <select id="routineType">
                <option value="stretching">Stretching</option>
                <option value="plyometrics">Plyometrics</option>
                <option value="strength">Strength</option>
            </select>
            <button type="submit" id="search-routine">Search Routine</button>
        </form>`

    modal.appendChild(mealForm);
    modal.appendChild(routineForm);

    const displayMealForm = modal.querySelector("#generate-meal");
    const displayRoutineForm = modal.querySelector("#generate-routine");
    const mealFormEl = modal.querySelector("#meal-form");
    const routineFormEl = modal.querySelector("#routine-form");

    displayMealForm.addEventListener("click", (e) => {
    e.preventDefault();
    mealFormEl.classList.toggle("show");
    routineFormEl.classList.remove("show");
    });

    displayRoutineForm.addEventListener("click", (e) => {
    e.preventDefault();
    routineFormEl.classList.toggle("show");
    mealFormEl.classList.remove("show");
});

    modal.querySelector("#meal-form").addEventListener("submit", function(f) {
        f.preventDefault();

        const mealType = modal.querySelector("#mealType").value;

        const data = {
            mealType
        }

        localStorage.setItem("mealType", JSON.stringify(data));

        window.location.href = "recipes.html";

        document.getElementById("insert-data").reset();
    
    });

    modal.querySelector("#routine-form").addEventListener("submit", function(f) {
        f.preventDefault();

        const routineType = modal.querySelector("#routineType").value;

        const data = {
            routineType
        }

        localStorage.setItem("routineType", JSON.stringify(data));

        window.location.href = "routines.html";

        document.getElementById("insert-data").reset();
    
    });
}