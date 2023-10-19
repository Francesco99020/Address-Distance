function addAddressField() {
    const addressFields = document.getElementById("addressFields");
    const newField = document.createElement("div");
    newField.classList.add("addressField");
    newField.innerHTML = `
        <label for="address2">Compare Address:</label>
        <input type="text" class="addressInput" name="address2" placeholder="Enter Compare Address" required>
        <button type="button" onclick="removeAddressField(this)">Remove</button>
    `;
    addressFields.appendChild(newField);
}

function removeAddressField(button) {
    const addressFields = document.getElementById("addressFields");
    addressFields.removeChild(button.parentElement);
}

async function sendMessageToServer() {
    const targetAddress = document.getElementById("target-address").value;
    const addressInputs = document.getElementsByClassName("addressInput");

    // Create an array to store the addresses from the input fields
    const addressesArray = Array.from(addressInputs).map(input => input.value.trim());

    // Add your JavaScript code here to calculate and display the distances
    const message = {
        targetAddress: targetAddress,
        compareAddresses: addressesArray
    };
    try{
        const response = await fetch('http://localhost:3000/api/address/closest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        if(response.ok){
            const data = await response.json();

            //Display Distance
            console.log(data.message);
            DisplayResults(data.message);
        }else{
            console.error('Failed to receive a valid response from the server.');
        }

    }catch (error) {
        console.error('Error sending message to the server:', error);
      }
}


function DisplayResults(response){
    const distanceResultsDiv = document.getElementById("distanceResults");
    distanceResultsDiv.innerHTML = '';

    let closest = Number.MAX_VALUE;
    let closestAddress = '';
    let farthest = 0;
    let farthestAddress = '';

    for (const item of response) {
        const { address, distanceFromTarget } = item;

        if (distanceFromTarget < closest) {
            closest = distanceFromTarget;
            closestAddress = address;
        }

        if (distanceFromTarget > farthest) {
            farthest = distanceFromTarget;
            farthestAddress = address;
        }

        const resultText = `${address} is ${distanceFromTarget.toFixed(2)} miles away from the target address.<br>`;
        distanceResultsDiv.innerHTML += resultText;
    }

    const closestFarthestText = `${closestAddress} is the closest to the target address, and ${farthestAddress} is the farthest away from the target address.`;
    document.getElementById("closestFarthest").textContent = closestFarthestText;
}