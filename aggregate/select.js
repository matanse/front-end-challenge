function minTime(inputList, requestTime){
  let output = [];
  for (item of inputList) {
    if (item.playTime >= requestTime) {
      output.push(item);
    }
  }
  return output;
}

function select(inputList, request = null) {
  if (request != null) {
    let output = [];
    // Request options are specified, filter the inputList according to the given
    // options.
    if (request.id && Number.isInteger(request.id)) {
      // 1. Filter by id
      for (item of inputList) {
        if (item.id == request.id) {
          output.push(item);
        }
      }
    } else if (request.minPlayTime && Number.isInteger(request.minPlayTime)) {
      // 2. Filter by minPlayTime
      output = minTime(inputList, request.minPlayTime)
    }

    if (request.merge && request.merge == true) {
      // 3. Merge items in inputList
      const newMergedList = [];
      for (let i = 0; i < inputList.length; i++) {
        let isItemIdNew = true;
        for (let j = 0; j < newMergedList.length; j++) {
          if (inputList[i].id == newMergedList[j].id) {
            isItemIdNew = false;
            // Merge two objects
            removedItem = newMergedList.splice(j,1)
            const newTime = removedItem[0].playTime + inputList[i].playTime;
            const newMergedItem = {id: removedItem[0].id, playTime: newTime};
            if (removedItem[0].auto && inputList[i].auto) {
              newMergedItem.auto = true;
            }else{
              newMergedItem.auto = false;
            }
            newMergedList.push(newMergedItem)
            break
          }
        }
        if (isItemIdNew) {
          newMergedList.push(inputList[i])
        }
      } 
      if (request.minPlayTime && Number.isInteger(request.minPlayTime)){
        output = minTime(newMergedList, request.minPlayTime)
      } else {
        output = newMergedList
      }
    }
    return output
  } else {
    // Request options are not specified, return inputList as is
    return inputList;
  }
}
module.exports = select;