// dynamically gets current date 

let currentDate = new Date(); // create a var to hold the date object 
let currentYear = currentDate.getFullYear();  // used get full year methon the date object 




function checkDay(day){
    
    const dayError = document.getElementById('day-error'); // get the html element 

    if(day <= 0 || day > 31 ){

        dayError.classList.remove("hide");// removes hide class from element reveals error on UI

        console.log("WRONG INPUT ")

        return false; // returns must be valid day in UI    
        
    }else{

        dayError.classList.add("hide");
        console.log("CORRECT INPUT")

        return true;
    }


}


function checkMonth(month){

    const monthError = document.getElementById('month-error'); // grabs month element from DOM 

    if(month < 1 || month > 12 ){
        monthError.classList.remove("hide"); // remove the hide class to display the month error 
        return false; // returns must be valid month in UI 
    }else{
        monthError.classList.add("hide");
        return true; 
    }

}




function checkYear(year) {

    const yearError = document.getElementById("year-error"); // holds the year element in variable 

    if(year > currentYear){
        yearError.classList.remove("hide");
        return false; // Must be in the past to UI 
    }else{
        yearError.classList.add("hide");
        return true;
    }

}



// this function takes the user day month and year as parameters and changes the UI

// 5 , 12 , 1994 

function calculateAge(day, month, year){

    // user DOB
    const birthDate = year + "-" + month + "-" + day; // creates string for date object 
    const birth = new Date(birthDate); // creates new date object with user date 

    // Current Date 
    const today = new Date(); // create new date object with current date 

    console.log(birthDate)


    // Find the Year 

    // Minus the current year with past year  i.e 2024 - 1994 = 30 
    let years = today.getFullYear() - birth.getFullYear(); 
    console.log("Years is")
    console.log(years)

    // Find the Month
    // Minus the current month by birth month
    // Feb - Dec = -10
    let months = today.getMonth() - birth.getMonth();
    console.log("Months is ")
    console.log(months)

    // Find Days 
    // takes the day of date and minuse from birth date 
    // Minus 18 - 5 = 13 days (feb 18 - dec 5)

    let days = today.getDate() - birth.getDate(); 

    console.log("Days is ")
    console.log(days);

    // if months is less than 0, means birthday has not occured 
    // Feb - Dec = 1 - 11 = -10 (negative value means it has not occured)
    // Feb - Jan = 1 - 0 = 1 (postive value means it has occured)
    // Feb - Feb = 0 (means we are in the birthday months so 0 months)

    // second part of if is 
    // or if the current month is the same as birth month (months === 0 )
    // and the days is less than 0 negative 


    // example -
    // if month is Feb ( months === 0 TRUE) 
    // && if days is negative example --> Feb 19 - 23 = -4 
    // if we are in the same months lets check days 
    // check if days is less than 0 
    // why check if days is negative value?
    // If the we determie we are located in the same month
    // we check days next -> Feb 19 - Feb 18 = 1

    //grab the year element from html 

    const yearText = document.getElementById("years"); 
    const monthText = document.getElementById("months"); 
    const dayText = document.getElementById("days");




    if(months < 0 || (months === 0 && days < 0)){  // checks if in same month and day has passed
        years--; 
        months = (months+12) // adds 12 months to make mpsotive value  
        console.log(yearText)
    }


    // Adjust days if it is negative 


    // check if days is negative example Feb 20 - Aug 31 = 20 - 31 = -11 days

    // Check if the calculated days are negative, indicating the day of the month for the current date 
    // is earlier than the day of the month for the birth date.
    if (days < 0) {
        // Create a new Date object representing the last day of the previous month relative to 'today'.
        // This is done by setting the day parameter to 0 in the new Date constructor, which automatically
        // rolls back the date to the last day of the previous month.
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // 0 puts at the last day of previous month ( Jan 31)
        console.log("lastmonth is " + lastMonth)

        // Add the number of days in the last month to the 'days' variable to adjust the negative value.
        // This effectively calculates how many days have passed since the day of the birth date in the
        // previous month.
        days += lastMonth.getDate(); // -11 + 31 = 20 days 


        // Since we've had to roll back to the previous month to correct the day count, decrease the month count by 1.
        months--;

        // If adjusting the month count results in a negative value, this indicates that we've crossed over
        // to the previous year, necessitating adjustments to both the year and month counts.
        if (months < 0) {
            // Decrement the year count by 1 because we've identified that the calculation has spanned into the previous year.
            years--;

            // Adjust the month count to reflect the correct position within the year.
            // Adding 12 converts the negative month value into its positive equivalent, keeping
            // the months within the 0-11 range that JavaScript's Date object uses (where 0 is January
            // and 11 is December).
            months += 12;
        }
    }
    
    yearText.innerHTML = years; 
    monthText.innerHTML = months;     
    dayText.innerHTML = days;
    
    console.log("Years is " + years) 


    









}




document.addEventListener('DOMContentLoaded',function(){ // listen if the website loads first

    const day = document.getElementById("day"); // grabs the day value from front end 
    const month = document.getElementById("month"); // grab the month from front end 
    const year = document.getElementById("year"); // grab year from the front end 
    
    var dayFlag = false; 

    var monthFlag = false; 

    var yearFlag = false;

    // We use three event listener to 
    // 1. Listen for the blur event on their respective elements day, month, year 
    // 2. We fure the funciton when the event occurs 
    // 3. The functions checks validation of data input 

    day.addEventListener('blur',function(e){ // used the day element to listen to when the text is out of focus
        dayFlag = checkDay(day.value);
    });

    month.addEventListener('blur', function(e){
        monthFlag = checkMonth(month.value); 

    });

    year.addEventListener('blur',function(e){
        yearFlag = checkYear(year.value);

            console.log(dayFlag); 
            console.log(monthFlag); 
            console.log(yearFlag); 


    });





    const form = document.getElementById("myForm"); // hold the form element in html 
    form.addEventListener('submit', function(e){ // listen for submit on form 
        e.preventDefault();
        if(dayFlag && monthFlag && yearFlag){
            calculateAge(day.value,month.value,year.value)
        }else{
            console.log("ALL FALSE")
        }



})

    if(dayFlag && monthFlag && yearFlag){
        calculateAge(day.value,month.value,year.value)
    }else{
    }




})


