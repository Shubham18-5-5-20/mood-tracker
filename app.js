// // --MAKING CALENDAR--

// // Accessing different items
// const prevBtn = document.getElementById("prev");
// const nextBtn = document.getElementById("next");
// const monthYear = document.getElementById("monthYear");
// const calendarDays = document.getElementById("calendarDays");

// // Defining Date
// let today = new Date();
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();

// // RENDER CALENDAR
// function renderCalendar(month, year)  {
//     calendarDays.innerHTML = '';
//     const monthName = new Date(year, month).toLocaleString('default', {month:'long'});
//     monthYear.textContent =`${monthName} ${year}`;
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month+1, 0).getDate();

//     for (let i =0; i<firstDay; i++){
//         calendarDays.innerHTML += `<div></div>`;
//     }
//     for (let day=1; day<= daysInMonth; day++){  
    //     calendarDays.innerHTML += `
    // <div class="cursor-pointer rounded-full py-2
    //   ${today ? 'bg-blue-500 text-white font-bold' : 'hover:bg-blue-100'}
    // ">
    //   ${day}
    // </div>`;
      
//     }
// }

// renderCalendar(currentMonth, currentYear);

// // navigating on months and year
// prevBtn.addEventListener('click', ()=>{
//     currentMonth--;
//     if (currentMonth<0){
//         currentMonth=12;
//         currentMonth--
//         currentYear--;
//     }
//     renderCalendar(currentMonth, currentYear);
// });

// nextBtn.addEventListener('click', ()=>{
//     currentMonth++;
//     if(currentMonth>11){
//         currentMonth=-1;
//         currentMonth++;
//         currentYear++
//     }
//     renderCalendar(currentMonth, currentYear);
// })




// --MAKING CALENDAR--

// Accessing essentials
const prevBtn= document.getElementById("prev");
const nextBtn= document.getElementById("next");
const monthYear= document.getElementById("monthYear");
const calendarDays= document.getElementById("calendarDays");


// Defining date
let today = new Date;
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


// Rendering Calendar
function renderCalendar(month,year){
    calendarDays.innerHTML= '';
    const monthName= new Date(year, month).toLocaleString('default',{month:'long'});
    monthYear.textContent=`${monthName} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    
    for(let i=0; i<firstDay; i++){
        calendarDays.innerHTML+= '<div></div>';
    }

    for(let day=1; day<=daysInMonth; day++){
        const isToday
    = day === today.getDate() && 
    month === today.getMonth() && 
    year === today.getFullYear();
 calendarDays.innerHTML += `
    <div class="cursor-pointer rounded-full py-2
      ${isToday ? 'bg-blue-500 text-white font-bold' : 'hover:bg-blue-100'}
    ">
      ${day}
    </div>`;    }
}

renderCalendar(currentMonth, currentYear);

// navigating months
prevBtn.addEventListener('click', ()=>{
    currentMonth--;
    if (currentMonth<0){
        currentMonth=12;
        currentMonth--;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
})

nextBtn.addEventListener('click', ()=>{
    currentMonth++;
    if (currentMonth>11){
        currentMonth=0;
        currentMonth++;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
})




