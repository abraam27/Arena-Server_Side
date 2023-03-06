const DB_Connection = require("../DB_Connection");
var FieldOwnerSchema = {
    fullName:{type:String,pattern:"^[a-zA-Z\s\.]*$"},
    phone:{type:String,pattern:"^01[0125][0-9]{8}$"},
    email:{
        type:String,pattern:"^[a-zA-Z0-9]+\@[a-zA-Z0-9]+(.com)|(.eg)|(.net)|(.org){1}$"
    },
    userName:{type:String,pattern:"^[a-zA-Z0-9]+$", required:true},
    password:{type:String,minlength:5, required:true},
    role:{type:String}
}
var FieldOwner = DB_Connection.model("FieldOwners",FieldOwnerSchema);
module.exports = FieldOwner;
