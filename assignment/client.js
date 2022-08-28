const employees = [];

//On page load the below code adds a click handler to the 
//submit and delete buttons

$(document).ready(readyNow);
function readyNow() {
    $('#submitButton').on('click', emptyCheck);
    $(document).on('click', '.delete', deleteEmployee);
  }

//the below codes makes all fields required.  If any
//are left blank, the user cannot submit data

  function emptyCheck(){
    if($('#first-name').val() == '' || $('#last-name').val() == '' || $('#id-number').val() == '' || $('#job-title').val() == '' || $('#annual-salary').val() == ''){
      // return false;
      displayErrorMessage(); 
    } else
    {
      collectEmployeeData();
    }
  }

 //code for error message if fields are left empty
  
  function displayErrorMessage(){
    $('#error-message').append(`<p id="error-message">`+ `All Fields Required` + `</p>`);
    }
  
//the below code block collects employee data and creates 
//a new object.  It also calculates their monthly salary
//it also clears the error message if one is on the DOM

function collectEmployeeData (){
    let monthlySalary = Math.round(($('#annual-salary').val()/12) * 100) / 100
    let newEmployee = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        idNumber: $('#id-number').val(),
        jobTitle: $('#job-title').val(),
        annualSalary: $('#annual-salary').val(),
        monthlySalary: Number(monthlySalary),
    }   
    employees.push(newEmployee); //pushes to employee array
    emptyEmployeeInputs(); //clears inputs
    addEmployeeToDom(); //apends employee to table
    addEmployeeMonthlyCost(); //function to calculate total monthly costs
    $('#error-message').empty(); //clears error message from DOM
}
function emptyEmployeeInputs(){
    $('#first-name').val('');
    $('#last-name').val('');
    $('#id-number').val('');
    $('#job-title').val('');
    $('#annual-salary').val('');
}

//the below code block adds the employee to the table
function addEmployeeToDom(){
    $('#tableBody').empty();
    for (let employee of employees){
        $('#tableBody').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
                <td><button id="delete-button" class="delete ${employee.idNumber}">Delete</button></td>
            </tr>
        `)
        $('.employee:last').on('click', deleteEmployee);
        //is the above code still needed (:last)?
    }
    // $('#tfoot-below:last').append(`
    //     <td id="tfoot" colspan="6"></td>
    // `)

    //This code adds a table footer multiple times. 
    //I wanted it to only happen once
}


//this calculates the total employee costs and appends
//to DOM
function addEmployeeMonthlyCost(){
    let monthlyTotalExpenses = 0;
    for (let employee of employees){
        monthlyTotalExpenses += employee.monthlySalary;
    }
    $('#total-monthly').empty();
    $('#total-monthly').append(monthlyTotalExpenses);
    checkIfOverBudget(monthlyTotalExpenses);

}


//to calculate if over budget.
//Yes-turns CSS red
//back under? CSS turns back to original color
function checkIfOverBudget (monthlyTotalExpenses){
    if(monthlyTotalExpenses >= 20000){
        $('footer').css("background-color", "#8b0000");
    } else{
        $('footer').css("background-color", "#325ed5");
    }
}

//this code below captures the class of the unique employee
//by only storing the class after general class
//then it uses that info to find the index of that employee
//in the employee array
//then it splices the array, deleting only that employee
//It then re-runs the several code blocks to update DOM
function deleteEmployee (){
    let employeeClicked = $(this).attr('class').split(' ')[1];
    const index = employees.findIndex(employee => {
        return employee.idNumber === employeeClicked;
      });
    employees.splice(index, 1);
    $(this).parent().parent().remove();
    addEmployeeMonthlyCost();
    checkIfOverBudget();
    $('#error-message').empty();
    return employees;
}

//Notes: would like to add code to incldue a comma in money


//below were employees used in early stages
//of testing.  Moved down to be out of the way

// const employeeOne = {
//     firstName: 'Sam', 
//     lastName: 'Freeman', 
//     idNumber: '9462', 
//     jobTitle: 'Cool Guy', 
//     annualSalary: '50000',
// };
// const employeeTwo = {
//     firstName: 'Sascha', 
//     lastName: 'Kala', 
//     idNumber: '2124', 
//     jobTitle: 'Software Engineer', 
//     annualSalary: '100000'
// };

// const employeeThree = {
//     firstName: 'Ro', 
//     lastName: 'McDonald', 
//     idNumber: '6666', 
//     jobTitle: 'Pet Wrangler', 
//     annualSalary: '75000'
// };


// const employees = [employeeOne, employeeTwo, employeeThree];