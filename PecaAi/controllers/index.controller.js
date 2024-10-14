const path = require('path');

//Get html plataforma
function plataforma(req,res){
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

module.exports={
    plataforma: plataforma
}