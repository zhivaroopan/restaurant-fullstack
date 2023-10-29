const bookingRoutes = require('./bookings')
const Table = require('../model/table')

const newData = {
    username: "Zhiva",
    timeSlot: "3:00 PM",
    peopleCount: 10,
    dateOfBooking: "1698054423229",
    price: 20
}

const usernames = ["Zhiva", "Roopan", "Abirami", "Gokul", "Naveen", "Keerthana"];
const timeSlots = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];
const peopleCounts = [2, 4, 6, 8, 10, 25];
const prices = [100, 200, 300, 150, 250, 350];

function getRandomValue(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
function getRandomDate() {
    const year = 2022 + Math.floor(Math.random() * 2); // Random year between 2022 and 2023
    const month = 1 + Math.floor(Math.random() * 12); // Random month between 1 and 12
    const day = 1 + Math.floor(Math.random() * 28); // Random day between 1 and 28
  
    const date = new Date(year, month - 1, day); // Month is 0-based, so subtract 1
    return date.getTime().toString();
  }
function generateRandomObject() {
  const username = getRandomValue(usernames);
  const timeSlot = getRandomValue(timeSlots);
  const peopleCount = getRandomValue(peopleCounts);
  const dateOfBooking = getRandomDate()
  const price = getRandomValue(prices);

  return {
    username,
    timeSlot,
    peopleCount,
    dateOfBooking,
    price,
  };
}

const generatedData = [];

for (let i = 0; i < 200; i++) {
  generatedData.push(generateRandomObject());
}

// console.log(generatedData);

exports.insertData = async () => {
    try {
        for (const data of generatedData) {
            await Table.create(data)
        }
    } catch (err) {
        console.log(err)
    }
}