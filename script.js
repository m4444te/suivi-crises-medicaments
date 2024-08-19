document.addEventListener('DOMContentLoaded', function () {
    const criseForm = document.getElementById('criseForm');
    const medicamentForm = document.getElementById('medicamentForm');

    let editMode = false;
    let currentEditRow = null;

    // Load data from local storage
    loadCrises();
    loadMedicaments();

    criseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const criseDate = document.getElementById('criseDate').value;
        const criseNote = document.getElementById('criseNote').value;

        if (criseDate && criseNote) {
            const criseData = { date: criseDate, note: criseNote };

            if (editMode) {
                updateCriseInLocalStorage(criseData);
                updateCriseInTable(currentEditRow, criseData);
                editMode = false;
                currentEditRow = null;
            } else {
                addCriseToTable(criseData);
                saveCriseToLocalStorage(criseData);
            }

            criseForm.reset();
        } else {
            alert("Veuillez remplir tous les champs pour enregistrer une crise d'angoisse.");
        }
    });

    medicamentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const medicamentDate = document.getElementById('medicamentDate').value;
        const medicamentName = document.getElementById('medicamentName').value;

        if (medicamentDate && medicamentName) {
            const medicamentData = { date: medicamentDate, name: medicamentName };

            if (editMode) {
                updateMedicamentInLocalStorage(medicamentData);
                updateMedicamentInTable(currentEditRow, medicamentData);
                editMode = false;
                currentEditRow = null;
            } else {
                addMedicamentToTable(medicamentData);
                saveMedicamentToLocalStorage(medicamentData);
            }

            medicamentForm.reset();
        } else {
            alert("Veuillez remplir tous les champs pour enregistrer la prise de médicaments.");
        }
    });

    function loadCrises() {
        const crises = JSON.parse(localStorage.getItem('crises')) || [];
        crises.forEach(criseData => addCriseToTable(criseData));
    }

    function loadMedicaments() {
        const medicaments = JSON.parse(localStorage.getItem('medicaments')) || [];
        medicaments.forEach(medicamentData => addMedicamentToTable(medicamentData));
    }

    function addCriseToTable(criseData) {
        const criseRow = document.createElement('tr');
        criseRow.innerHTML = `
            <td>${criseData.date}</td>
            <td>${criseData.note}</td>
            <td>
                <button class="update-button" onclick="editCrise(this)">Modifier</button>
                <button class="delete-button" onclick="deleteCrise(this)">Supprimer</button>
            </td>
        `;
        document.querySelector('#criseTable tbody').appendChild(criseRow);
    }

    function addMedicamentToTable(medicamentData) {
        const medicamentRow = document.createElement('tr');
        medicamentRow.innerHTML = `
            <td>${medicamentData.date}</td>
            <td>${medicamentData.name}</td>
            <td>
                <button class="update-button" onclick="editMedicament(this)">Modifier</button>
                <button class="delete-button" onclick="deleteMedicament(this)">Supprimer</button>
            </td>
        `;
        document.querySelector('#medicamentTable tbody').appendChild(medicamentRow);
    }

    function saveCriseToLocalStorage(criseData) {
        const crises = JSON.parse(localStorage.getItem('crises')) || [];
        crises.push(criseData);
        localStorage.setItem('crises', JSON.stringify(crises));
    }

    function saveMedicamentToLocalStorage(medicamentData) {
        const medicaments = JSON.parse(localStorage.getItem('medicaments')) || [];
        medicaments.push(medicamentData);
        localStorage.setItem('medicaments', JSON.stringify(medicaments));
    }

    function updateCriseInLocalStorage(updatedCriseData) {
        const crises = JSON.parse(localStorage.getItem('crises')) || [];
        const updatedCrises = crises.map(crise => 
            crise.date === currentEditRow.cells[0].textContent &&
            crise.note === currentEditRow.cells[1].textContent
            ? updatedCriseData 
            : crise
        );
        localStorage.setItem('crises', JSON.stringify(updatedCrises));
    }

    function updateMedicamentInLocalStorage(updatedMedicamentData) {
        const medicaments = JSON.parse(localStorage.getItem('medicaments')) || [];
        const updatedMedicaments = medicaments.map(medicament => 
            medicament.date === currentEditRow.cells[0].textContent &&
            medicament.name === currentEditRow.cells[1].textContent
            ? updatedMedicamentData 
            : medicament
        );
        localStorage.setItem('medicaments', JSON.stringify(updatedMedicaments));
    }

    function updateCriseInTable(row, criseData) {
        row.cells[0].textContent = criseData.date;
        row.cells[1].textContent = criseData.note;
    }

    function updateMedicamentInTable(row, medicamentData) {
        row.cells[0].textContent = medicamentData.date;
        row.cells[1].textContent = medicamentData.name;
    }

    window.editCrise = function (button) {
        const row = button.closest('tr');
        const criseDate = row.cells[0].textContent;
        const criseNote = row.cells[1].textContent;

        document.getElementById('criseDate').value = criseDate;
        document.getElementById('criseNote').value = criseNote;

        editMode = true;
        currentEditRow = row;
    };

    window.editMedicament = function (button) {
        const row = button.closest('tr');
        const medicamentDate = row.cells[0].textContent;
        const medicamentName = row.cells[1].textContent;

        document.getElementById('medicamentDate').value = medicamentDate;
        document.getElementById('medicamentName').value = medicamentName;

        editMode = true;
        currentEditRow = row;
    };

    window.deleteCrise = function (button) {
        const row = button.closest('tr');
        row.remove();
        deleteCriseFromLocalStorage(row);
    };

    window.deleteMedicament = function (button) {
        const row = button.closest('tr');
        row.remove();
        deleteMedicamentFromLocalStorage(row);
    };

    function deleteCriseFromLocalStorage(criseRow) {
        const date = criseRow.cells[0].textContent;
        const note = criseRow.cells[1].textContent;
        const crises = JSON.parse(localStorage.getItem('crises')) || [];
        const updatedCrises = crises.filter(crise => !(crise.date === date && crise.note === note));
        localStorage.setItem('crises', JSON.stringify(updatedCrises));
    }

    function deleteMedicamentFromLocalStorage(medicamentRow) {
        const date = medicamentRow.cells[0].textContent;
        const name = medicamentRow.cells[1].textContent;
        const medicaments = JSON.parse(localStorage.getItem('medicaments')) || [];
        const updatedMedicaments = medicaments.filter(medicament => !(medicament.date === date && medicament.name === name));
        localStorage.setItem('medicaments', JSON.stringify(updatedMedicaments));
    }
});
