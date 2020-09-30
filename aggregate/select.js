function mergeItems(removedItem, newItem){
  const newTime = removedItem.playTime + newItem.playTime;
  return {id: removedItem.id, playTime: newTime, auto: removedItem.auto && newItem.auto};
}

function select(inputList, request = null) {
  if (request != null) {
    let output = [];
    // Request options are specified, filter the inputList according to the given
    // options.
    if (request.id && Number.isInteger(request.id)) {
      // 1. Filter by id
      output = inputList.filter(item => item.id == request.id)
    } else if (request.minPlayTime && Number.isInteger(request.minPlayTime)) {
      // 2. Filter by minPlayTime
      output = inputList.filter(item => item.playTime >= request.minPlayTime)
    }
    // to be continued as an exercise to replace the above.
    // item.playTime >= request.minPlayTime 
    // output = inputList.filter(item => item.playTime >= request.minPlayTime)

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
            newMergedList.push(mergeItems(removedItem[0], inputList[i]))
            break
          }
        }
        if (isItemIdNew) {
          newMergedList.push(inputList[i])
        }
      } 
      if (request.minPlayTime && Number.isInteger(request.minPlayTime)){
        output = newMergedList.filter(item => item.playTime >= request.minPlayTime)
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