import { createServiceModal, defineBmr, defineTdee } from "./serviceModal.js";

document.getElementById("insert-data").addEventListener("submit", function(f){
    f.preventDefault();

    const sex = document.querySelector('input[name="sex"]:checked').value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const activity = document.querySelector('input[name="activity"]:checked').value;
    const purpose = document.querySelector('input[name="purpose"]:checked').value;
    const bmr = Math.round(defineBmr(sex, weight, height, age));
    const tdee = Math.round(defineTdee(activity, bmr));

    function defineMinCal() {

        if (purpose === "lose fat") {
            return tdee-tdee*0.2;
        }

        else if (purpose === "gain muscle") {
            return tdee+tdee*0.05;
        }

        else {
            return tdee;
        }
    }

    function defineMaxCal() {

        if (purpose === "lose fat") {
            return tdee-tdee*0.1;
        }

        else if (purpose === "gain muscle") {
            return tdee+tdee*0.15;
        }

        else {
            return tdee;
        }
    }

    const minCal = Math.round(defineMinCal());
    const maxCal = Math.round(defineMaxCal());

    const data = {
        sex,
        age,
        height,
        weight,
        activity,
        purpose,
        bmr,
        tdee,
        minCal,
        maxCal
    };

    localStorage.setItem("formData", JSON.stringify(data));

    createServiceModal(bmr, tdee, minCal, maxCal);

});
