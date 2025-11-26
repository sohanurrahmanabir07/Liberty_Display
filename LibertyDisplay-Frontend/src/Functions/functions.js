export const urlConverter = (value) => {
    if (value != null) {
        const arr = value.split(" ")
        let url = ""
        for (let index = 0; index < arr.length; index++) {
            if (!(index == (arr.length - 1))) {
                url += arr[index] + '_'
            } else {
                url += arr[index]
            }


        }
        return url
    }
    return value
   
}
export const urlReverter = (value) => {
    if (value != null) {
        const arr = value.split("_")
        let url = ""
        for (let index = 0; index < arr.length; index++) {
            if (!(index == (arr.length - 1))) {
                url += arr[index] + ' '
            } else {
                url += arr[index]
            }



        }
        return url
    }
    return value
   
}
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

export const capitalizeWords=(sentence)=>{
    if(sentence==null){
        return
    }
    return sentence.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  }

export const formatDateToDayMonth=(dateStr)=> {
    const date = new Date(dateStr);
    // Array of month names, adjust as needed for localization
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  }
