export default function convertTime(time) {
    var splitTime = time.split(":");
    var hour = splitTime[0];
    var minute = splitTime[1];
    var xm;
    var h;

    if (hour >= 12){
        h = hour - 12;
        xm = "pm";    
    } else if (h == 0) {
        h = 12;
        xm = "m"
    } else {
        h = hour;
        xm = "am"
    }
  
    var replacement = h + ":" + minute;
    replacement += " " + xm;
  
    return replacement;
  }