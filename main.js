const toDoList = [];

document.addEventListener("DOMContentLoaded", function() {
    const myButton = document.getElementById("add");
    const listElement = document.getElementById("toDoList");
    const saveButton = document.getElementById("save");
    const editButton = document.getElementById("edit"); 
    const deleteButton = document.getElementById("delete"); // Get the "Delete" button by ID

    myButton.addEventListener("click", function() {
        const toDoItem = prompt("Enter your to-do task.");

        if (toDoItem !== null && toDoItem.trim() !== "") {
            toDoList.push(toDoItem);
            displayToDoList(listElement);
        } else {
            alert("No to-do item added!");
        }
    });

    saveButton.addEventListener("click", function() {
        saveToDoListToFile();
    });

    editButton.addEventListener("click", function() {
        editToDoList();
    });

    deleteButton.addEventListener("click", function() {
        deleteToDoList();
    });
});

function displayToDoList(listElement) {
    listElement.innerHTML = "";
    let itemNumber = 1;

    toDoList.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = `${itemNumber}. ${item}`;
        listElement.appendChild(li);
        itemNumber++;
    });
}

function editToDoList() {
    const indexToEdit = prompt("Enter the number of the item you want to edit:");

    if (indexToEdit !== null && indexToEdit.trim() !== "") {
        const itemIndex = parseInt(indexToEdit) - 1;

        if (itemIndex >= 0 && itemIndex < toDoList.length) {
            const editedItem = prompt(`Edit to-do item number ${itemIndex + 1}:`, toDoList[itemIndex]);

            if (editedItem !== null && editedItem.trim() !== "") {
                toDoList[itemIndex] = editedItem;
                displayToDoList(document.getElementById("toDoList"));
            } else {
                alert("No changes made.");
            }
        } else {
            alert("Invalid item number. Please enter a valid item number.");
        }
    }
}

function deleteToDoList() {
    const indexToDelete = prompt("Enter the number of the item you want to delete:");

    if (indexToDelete !== null && indexToDelete.trim() !== "") {
        const itemIndex = parseInt(indexToDelete) - 1;

        if (itemIndex >= 0 && itemIndex < toDoList.length) {
            if (confirm(`Are you sure you want to delete to-do item number ${itemIndex + 1}?`)) {
                toDoList.splice(itemIndex, 1); // Remove the item at the given index
                displayToDoList(document.getElementById("toDoList")); // Refresh the list after deleting
            }
        } else {
            alert("Invalid item number. Please enter a valid item number.");
        }
    }
}

function saveToDoListToFile() {
    const content = toDoList.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "to_do_list.txt";
    a.click();
    URL.revokeObjectURL(url);
}