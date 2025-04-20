// quick hash script
const bcrypt = require('bcrypt');
bcrypt.hash('FuckOff', 11).then(hash => console.log(hash));
