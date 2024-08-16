        document.addEventListener('DOMContentLoaded', function () {
            const criseForm = document.getElementById('criseForm');
            const medicamentForm = document.getElementById('medicamentForm');

            // Load data from local storage
            loadCrises();
            loadMedicaments();

            criseForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const criseDate = document.getElementById('criseDate').value;
                const criseNote = document.getElementById('criseNote').value;

                if (criseDate && criseNote) {
                    const criseData = { date: criseDate, note: criseNote };
                    addCriseToTable(criseData);
                    saveCriseToLocalStorage(criseData);
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
                    addMedicamentToTable(medicamentData);
                    saveMedicamentToLocalStorage(medicamentData);
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
                    <td><button class="delete-button" onclick="deleteCrise(this)">Supprimer</button></td>
                `;
                document.querySelector('#criseTable tbody').appendChild(criseRow);
            }

            function addMedicamentToTable(medicamentData) {
                const medicamentRow = document.createElement('tr');
                medicamentRow.innerHTML = `
                    <td>${medicamentData.date}</td>
                    <td>${medicamentData.name}</td>
                    <td><button class="delete-button" onclick="deleteMedicament(this)">Supprimer</button></td>
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
        });