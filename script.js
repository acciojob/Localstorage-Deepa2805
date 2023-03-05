// get the plates list from localStorage, or create an empty array
      const platesList = JSON.parse(localStorage.getItem('platesList')) || [];

      // reference to the input field and the plates list
      const form = document.querySelector('form');
      const plates = document.querySelector('#plates');

      // function to add a new plate to the list
      function addPlate(e) {
        // prevent the form from submitting and refreshing the page
        e.preventDefault();

        // get the plate text from the input field
        const text = (this.querySelector('[name=item]')).value;

        // create a new plate object with the text and "not done" status
        const plate = {
          text,
          done: false
        };

        // add the new plate to the plates list
        platesList.push(plate);

		    // update the plates list in localStorage
        localStorage.setItem('platesList', JSON.stringify(platesList));

        // reset the form input field
        this.reset();

        // refresh the plates list on the page
        populateList(platesList, plates);
      }

      // function to populate the plates list on the page
      function populateList(platesList = [], platesListElement) {
        platesListElement.innerHTML = platesList.map((plate, i) => {
          return `
            <li>
              <input type="checkbox" data-index=${i} id="item${i}" ${
            plate.done ? 'checked' : ''
          } />
              <label for="item${i}">${plate.text}</label>
            </li>
          `;
        }).join('');
      }
      // function to toggle the "done" status of a plate
      function toggleDone(e) {
        // check if the clicked element is an input checkbox
        if (!e.target.matches('input')) return;

        // get the data-index attribute value of the clicked checkbox
        const index = e.target.dataset.index;

        // toggle the "done" status of the corresponding plate object
        platesList[index].done = !platesList[index].done;

        // update the plates list in localStorage
        localStorage.setItem('platesList', JSON.stringify(platesList));

        // refresh the plates list on the page
        populateList(platesList, plates);
      }

      // add event listeners to the form and the plates list
      form.addEventListener('submit', addPlate);
      plates.addEventListener('click', toggleDone);
// populate the plates list on the page when the app loads
      populateList(platesList, plates);
