// array to store current data
var currentData = [];
var callOnce = true;
var goBack = false;

if (callOnce) {
  $(document).ready(function () {
    readJSONData("");
    callOnce = false;
  });
}

function readJSONData(applyFor) {
  // convert the string to lower case
  applyFor = applyFor.toLowerCase();
  // read the ../data/Data.json file
  var people = [];
  $.getJSON("../data/Data.json", function (data) {
    $.each(data.resume, function (i, f) {
      var person = {};
      person.basics = f.basics;
      person.id = f.id;
      person.name = f.basics.name;
      person.AppliedFor = f.basics.AppliedFor;
      person.email = f.basics.email;
      person.phone = f.basics.phone;
      person.location = f.basics.location;
      person.skills = f.skills;
      person.work = f.work;
      person.internship = f.Internship;
      person.projects = f.projects;
      person.education = f.education;
      person.achievements = f.achievements;
      person.interests = f.interests;
      people.push(person);
    });
    // console.log(people);

    // filter the people array based on the AppliedFor field
    var filteredPeople = people.filter(function (person) {
      // convert the string to lower case
      var personAppliedFor = person.AppliedFor.toLowerCase();
      return personAppliedFor.indexOf(applyFor) > -1;
    });
    // console.log(filteredPeople);

    // if number of people is 0, then show the tag "error" and hide the tag "mainDiv" and return NULL
    if (filteredPeople.length == 0) {
      document.getElementById("error").style.display = "block";
      document.getElementById("mainDiv").style.display = "none";
    }
    // else show the tag "mainDiv" and hide the tag "error"
    else {
      document.getElementById("mainDiv").style.display = "block";
      document.getElementById("error").style.display = "none";
    }

    //array to hold the id's of the filtered people
    var filteredPeopleId = [];
    for (var i = 0; i < filteredPeople.length; i++) {
      filteredPeopleId.push(filteredPeople[i].id);
    }

    // store in global variable currentData
    currentData = filteredPeople;

    // call the function readJSONDataID to read the data of the first person in the filteredPeople array
    readJSONDataID(filteredPeopleId[0]);
  });
}

function readJSONDataID(id) {
  // read the ../data/Data.json file
  var people = [];
  $.getJSON("../data/Data.json", function (data) {
    $.each(data.resume, function (i, f) {
      var person = {};
      person.basics = f.basics;
      person.id = f.id;
      person.name = f.basics.name;
      person.AppliedFor = f.basics.AppliedFor;
      person.email = f.basics.email;
      person.phone = f.basics.phone;
      person.location = f.basics.location;
      person.skills = f.skills;
      person.work = f.work;
      person.internship = f.Internship;
      person.projects = f.projects;
      person.education = f.education;
      person.achievements = f.achievements;
      person.interests = f.interests;
      people.push(person);
    });
    // console.log(people);

    // filter the people array based on the id field
    var filteredPeople = people.filter(function (person) {
      //convert the id to string
      var personId = id.toString();
      return person.id == personId;
    });

    // call the function to display the data of the person
    displayData(id);
  });
}

function displayData(id) {
  // read the ../data/Data.json file
  var people = [];
  $.getJSON("../data/Data.json", function (data) {
    $.each(data.resume, function (i, f) {
      var person = {};
      person.basics = f.basics;
      person.id = f.id;
      person.name = f.basics.name;
      person.AppliedFor = f.basics.AppliedFor;
      person.email = f.basics.email;
      person.phone = f.basics.phone;
      person.location = f.basics.location;
      person.skills = f.skills;
      person.work = f.work;
      person.internship = f.Internship;
      person.projects = f.projects;
      person.education = f.education;
      person.achievements = f.achievements;
      person.interests = f.interests;
      people.push(person);
    });
    // console.log(people);

    // filter the people array based on the id field
    var filteredPeople = people.filter(function (person) {
      //convert the id to string
      var personId = id.toString();
      return person.id == personId;
    });

    // get previous and next id from the currentData array
    var previousId = 0;
    var nextId = 0;
    var isFirstApp = false;
    var isLastApp = false;
    
    for (var i = 0; i < currentData.length; i++) {
      if (currentData[i].id === id) {
        if (i === 0) {
          previousId = currentData[currentData.length - 1].id;
          isFirstApp = true;
        } else {
          previousId = currentData[i - 1].id;
        }
        if (i == currentData.length - 1) {
          nextId = currentData[0].id;
          isLastApp = true;
        } else {
          nextId = currentData[i + 1].id;
        }
      }
    }
    

    // innerhtml of previous and next buttons
    document.getElementById("previous").innerHTML =
      "<button class='btn btn-primary' onclick='readJSONDataID(" +
      previousId +
      ")'>Previous</button>";
    document.getElementById("next").innerHTML =
      "<button class='btn btn-primary' onclick='readJSONDataID(" +
      nextId +
      ")'>Next</button>";
      

    // if length of currentData is 1, then hide the previous and next buttons
    if (currentData.length === 1) {
      document.getElementById("previous").style.visibility = "hidden";
      document.getElementById("next").style.visibility = "hidden";
    } else {
      document.getElementById("previous").style.visibility = "visible";
      document.getElementById("next").style.visibility = "visible";
    }
    // Check if the shown application is the first application and hide the previous button accordingly.
    if (isFirstApp) {
        document.getElementById("previous").style.visibility = "hidden";
      } else {
        document.getElementById("previous").style.visibility= "visible";
      }
      
      // Hide the next button if the shown app is the last app
      if (isLastApp) {
        document.getElementById("next").style.visibility = "hidden";
      } else {
        document.getElementById("next").style.visibility = "visible";
      }

    
    // div tag personName to display the name of the person
    var personName = document.getElementById("personName");
    personName.innerHTML = filteredPeople[0].name;

    // div tag personAppliedFor to display the AppliedFor field of the person
    var personAppliedFor = document.getElementById("personAppliedFor");
    personAppliedFor.innerHTML = filteredPeople[0].AppliedFor;

    // div tag personalInfo to display the personal information of the person , Phone , Email , url
    var personalInfo = document.getElementById("personalInfo");
    var urlText = filteredPeople[0].basics.profiles.network;
    var url = filteredPeople[0].basics.profiles.url;
    personalInfo.innerHTML =
      "Phone : " +
      filteredPeople[0].phone +
      "<br>" +
      "Email : " +
      filteredPeople[0].email +
      "<br>" +
      "URL : " +
      "<a href=" +
      url +
      ">" +
      urlText +
      "</a>";

    // div tag personSkills to display the skills of the person
    // the keywords are in the skills.keywords array
    var personSkills = document.getElementById("personalSkills");
    var skills = filteredPeople[0].skills.keywords;
    var skillsString = "";
    for (var i = 0; i < skills.length; i++) {
      skillsString += skills[i] + "<br>";
    }
    personSkills.innerHTML = skillsString;

    // div tag personalHobbies to display the hobbies of the person
    // the hobbies are in the interests.hobbies array
    var personalHobbies = document.getElementById("personalHobbies");
    var hobbies = filteredPeople[0].interests.hobbies;
    var hobbiesString = "";
    for (var i = 0; i < hobbies.length; i++) {
      hobbiesString += hobbies[i] + "<br>";
    }
    personalHobbies.innerHTML = hobbiesString;

    // tag name: experince, filled with
    // headers = Company Name, Position, Start Date, End Date, Summary, headers are in the work array
    var workExperience = document.getElementById("experience");
    var workExperienceString = "";
    var work = filteredPeople[0].work;
    workExperienceString +=
      "<div><p style='font-size:18' ><b>Company Name: </b>" +
      work["Company Name"] +
      "</p></div>";
    workExperienceString +=
      "<div><p style='font-size:18' ><b>Position: </b>" +
      work["Position"] +
      "</p></div>";
    workExperienceString +=
      "<div><p style='font-size:18' ><b>Start Date: </b>" +
      work["Start Date"] +
      "</p></div>";
    workExperienceString +=
      "<div><p style='font-size:18' ><b>End Date: </b>" +
      work["End Date"] +
      "</p></div>";
    workExperienceString +=
      "<div  style='text-align: justify;'><p style='font-size:18' ><b>Summary: </b>" +
      work["Summary"] +
      "</p></div>";
    workExperience.innerHTML = workExperienceString;

    //tag name: projects, filled with
    // headers = name, description, keywords, headers are in the projects array
    var projects = document.getElementById("projects");
    var projectsString = "";
    var projectsArray = filteredPeople[0].projects;
    projectsString +=
      "<div style='text-align: justify;'><p style='font-size:18' ><b>" +
      projectsArray.name +
      " : </b>";
    projectsString += projectsArray.description + "</p></div>";
    projects.innerHTML = projectsString;

    //tag name: education, filled with
    // headers = "UG","Senior Secondary","High School", headers are in the education array
    var education = document.getElementById("education");
    var educationString = "";
    var educationArray = filteredPeople[0].education;
    // join all the values of the "UG" with a comma
    var ug = educationArray["UG"];
    //for all key,value pairs in the "UG" array
    var ugString = "";
    for (var key in ug) {
      if (ug.hasOwnProperty(key)) {
        ugString += ug[key] + ", ";
      }
    }
    // remove the last comma
    ugString = ugString.substring(0, ugString.length - 2);
    educationString +=
      "<div><p style='font-size:18' ><b>&#x2022 UG: </b>" +
      ugString +
      "</p></div>";

    // join all the values of the "Senior Secondary" with a comma
    var seniorSecondary = educationArray["Senior Secondary"];
    //for all key,value pairs in the "Senior Secondary" array
    var seniorSecondaryString = "";
    for (var key in seniorSecondary) {
      if (seniorSecondary.hasOwnProperty(key)) {
        seniorSecondaryString += seniorSecondary[key] + ", ";
      }
    }
    // remove the last comma
    seniorSecondaryString = seniorSecondaryString.substring(
      0,
      seniorSecondaryString.length - 2
    );
    educationString +=
      "<div><p style='font-size:18' ><b>&#x2022 PU: </b>" +
      seniorSecondaryString +
      "</p></div>";

    // join all the values of the "High School" with a comma
    var highSchool = educationArray["High School"];
    //for all key,value pairs in the "High School" array
    var highSchoolString = "";
    for (var key in highSchool) {
      if (highSchool.hasOwnProperty(key)) {
        highSchoolString += highSchool[key] + ", ";
      }
    }
    // remove the last comma
    highSchoolString = highSchoolString.substring(
      0,
      highSchoolString.length - 2
    );
    educationString +=
      "<div><p style='font-size:18' ><b>&#x2022 High School: </b>" +
      highSchoolString +
      "</p></div>";

    education.innerHTML = educationString;

    // tag name: internship,
    // just iterate over all key,values and display them ij bullet points
    var internship = document.getElementById("internship");
    var internshipString = "";
    var internshipArray = filteredPeople[0].internship;
    for (var key in internshipArray) {
      if (internshipArray.hasOwnProperty(key)) {
        internshipString +=
          "<div><p style='font-size:18' ><b>&#x2022 " +
          key +
          ": </b>" +
          internshipArray[key] +
          "</p></div>";
      }
    }
    internship.innerHTML = internshipString;

    // tag name: achievements,
    // achievemnts are in the achievements array
    // achievements.summary is a list of achievements
    // display all the achievements in bullet points
    var achievements = document.getElementById("achievements");
    var achievementsString = "";
    var achievementsArray = filteredPeople[0].achievements;
    var achievementsSummary = achievementsArray.Summary;
    for (var i = 0; i < achievementsSummary.length; i++) {
      achievementsString +=
        "<div><p style='font-size:18' >&#x2022 " +
        achievementsSummary[i] +
        "</p></div>";
    }
    achievements.innerHTML = achievementsString;

    return filteredPeople;
  });
}
