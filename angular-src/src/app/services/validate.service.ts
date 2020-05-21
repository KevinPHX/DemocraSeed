import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
validateRegister(user){
  if (user.role == undefined || user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.affiliation == undefined){
    return false;
  } else {
    return true;
  }
}
validateUpdate(user){
  if (user.role == undefined || user.firstname == undefined || user.lastname == undefined || user.email == undefined || user.username == undefined || user.affiliation == undefined || user.affiliation == ""){
    return false;
  } else {
    return true;
  }
}
validateEmail(email){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


validateTournament(tournament){
  if (tournament.name == undefined || tournament.startdate == undefined || tournament.enddate == undefined || tournament.screws == undefined  || tournament.link == undefined || tournament.address == undefined){
    return false;
  } else {
    return true;
  }
}


}
