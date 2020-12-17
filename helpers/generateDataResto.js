const zomato = require('zomato-api');
const fs = require('fs');

const client = zomato({userKey: '04760ed46ec0f477a7f63ee99f171907'});

client.search({
    lat:"-6.179794", //latitude
    lon:"106.631882" //longitude  
})
.then(res => {
  let arr = [];
  res.restaurants.forEach(element => {
    let opening_hours = Number(element.restaurant.timings.split('').slice(0,2).join(''));
    let closing_hours = Number(element.restaurant.timings.split('').slice(6,8).join(''));
    if(isNaN(opening_hours)) opening_hours = 0;
    if(isNaN(closing_hours)) closing_hours = 0;
    let obj = {
      name: element.restaurant.name,
      address: element.restaurant.location.address,
      phone: element.restaurant.phone_numbers,
      city: element.restaurant.location.city,
      opening_hours,
      closing_hours,
      createdAt: new Date(),
      updatedAt: new Date()      
    }
    arr.push(obj);
  });
  fs.writeFileSync('./restaurants.json', JSON.stringify(arr, null, 2), 'utf-8');
  console.log(`Success..`);
})
.catch(err => console.log(err));

console.log(`Loading...`);

