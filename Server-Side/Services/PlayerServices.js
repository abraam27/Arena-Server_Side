const Player = require("../Models/PlayerModel");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const Game = require("../Models/GameModel");
const nodemailer = require("../Configiration/nodeMailer.config");

class PlayerServices{
    constructor(fullName,phone,birthDate,location,email,userName,password,image,role,status){
        this.fullName = fullName;
        this.phone = phone;
        this.birthDate = birthDate;
        this.location = location;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.image = image;
        this.role = role;
        this.status=status;
    }
    static async GetAllPlayers(){
        return await Player.find({});
    }
    static async GetPlayerByID(id){
        return await Player.findById(id);
    }
    async AddPlayer(){
        var newPlayer = new Player({ fullName: this.fullName, phone: this.phone, birthDate: this.birthDate, location: this.location, email: this.email, userName: this.userName, password: this.password, image: this.image, role:this.role,status :this.status});
        let foundPlayer = await Player.find({$or:[{userName:newPlayer.userName},{email:newPlayer.email}]}).exec();//null
        if(foundPlayer.length==0){
            await newPlayer.save();
            nodemailer.sendConfirmationEmail(this.fullName,this.email,this.userName)
            return true;
        }else{
            return false;
           
        }
    }
    async UpdatePlayer(id){
        if(await Player.updateOne({_id:id}, {fullName: this.fullName, phone: this.phone, birthDate: this.birthDate, location: this.location, email: this.email, userName: this.userName, password: this.password, image: this.image, role:this.role})){
            return true;
        }else{
            return false;
        }
    }
    async UpdateImage(id){
        if(await Player.updateOne({_id:id}, {fullName: this.fullName, phone: this.phone, birthDate: this.birthDate, location: this.location, email: this.email, userName: this.userName, password: this.password, image: this.image, role:this.role})){
            return true;
        }else{
            return false;
        }
    }
    static async DeletePlayer(id){
        return await Player.deleteOne({_id:id});
    }

    static async GetAllGamesByPlayerID (pid){
      let allGames = await Game.find({}).exec();//null
    //   console.log(allGames);
         
        let foundGames =allGames.filter((p) =>{
            return (
                p.playerId == pid
                );        
        });
        // console.log(foundGames);
        return  foundGames;
    }

    static async ChangeStatus(userName){
        if(await Player.updateOne({userName:userName}, {status: 'Active'})){
            return true;
        }else{
            return false;
        }
    }

    static async ResetPassword(userName, password){
        if(await Player.updateOne({userName:userName}, {password:password})){
            return true;
        }else{
            return false;
        }
    }
    static SendEmailPw (email){
         nodemailer.sendResetEmail(email);
         return true
    }
    static async GetAllNextGamesByPlayerID (playerID){
        var date = new Date();
        var month = (date.getMonth() + 1)<10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        let games = await Game.find({playerId:"1", $or:[{date :{$gt: currentDate}}, {$and:[{date:currentDate},{hour :{$gt:(date.getHours+1)}}]}]}).exec();//null
        return games;
      }
      static async GetAllPreviousGamesByPlayerID (playerID){
        var date = new Date();
        var month = (date.getMonth() + 1)<10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        let games = await Game.find({playerId:"1", $or:[{date :{$lt: currentDate}}, {$and:[{date:currentDate},{hour:{$lt:(date.getHours+1)}}]}]}).exec();//null
        return games;
      }

}
module.exports = PlayerServices;