function select(inputList, request = null) {
  let output = [];
  if (request != null) {
    // Request options are specified, filter the inputList according to the given
    // options.
    if (request.id && Number.isInteger(request.id)) {
      // 1. Filter by id
      for (item of inputList) {
        if (item.id == request.id) {
          output.push(item);
        }
      }
      return output;
    } else if (request.minPlayTime && Number.isInteger(request.minPlayTime)) {
      // 2. Filter by minPlayTime
      for (item of inputList) {
        if (item.playTime > request.minPlayTime) {
          output.push(item);
        }
      }
      return output;
    }
    /**
     * [
          { id: 8, playTime: 500, auto: false },
          { id: 7, playTime: 1500, auto: true },
          { id: 1, playTime: 100, auto: true },
          { id: 7, playTime: 1000, auto: false },
          { id: 7, playTime: 2000, auto: false },
          { id: 2, playTime: 2000, auto: true },
          { id: 2, playTime: 2000, auto: true },
        ];
     */
    /**
     * i = 0; inputList[0] = { id: 8, playTime: 500, auto: false }
     *
     *  => check if newMergedList has duplicates
     *  => NO duplicates
     *  => push item to newMergedList
     *    newMergedList = [{ id: 8, playTime: 500, auto: false }]
     *
     * i = 1 => inputList[1] = { id: 7, playTime: 1500, auto: true }
     *
     *  => check if newMergedList has duplicates
     *  => NO duplicates
     *  => push item to newMergedList
     *
     *    newMergedList = [
     *      { id: 8, playTime: 500, auto: false },
     *      { id: 7, playTime: 1500, auto: true }
     *    ]
     *
     * i = 2 => inputList[2] = { id: 1, playTime: 100, auto: true }
     *
     *  => check if newMergedList has duplicates
     *  => NO duplicates
     *  => push item to newMergedList
     *
     *    newMergedList = [
     *      { id: 8, playTime: 500, auto: false },
            { id: 7, playTime: 1500, auto: true },
     *      { id: 1, playTime: 100, auto: true }
     *    ]
     *
     * i = 3 => inputList[3] = { id: 7, playTime: 1000, auto: false }
     *
     *  => check if newMergedList has duplicates
     *  => YES, duplicates exist
     *  => take duplicate out of newMergedList
     *  => merge both items together
     *  => push result back to newMergedList
     *
     *    newMergedList = [
     *      { id: 8, playTime: 500, auto: false },
     *      { id: 1, playTime: 100, auto: true },
     *      { id: 7, playTime: 2500, auto: false },
     *    ]
     *
     * i = 4 => inputList[4] = { id: 7, playTime: 2000, auto: false }
     *
     *  => check if newMergedList has duplicates
     *  => YES, duplicates exist
     *  => take duplicate out of newMergedList
     *  => merge both items together
     *  => push result back to newMergedList
     *
     *    newMergedList = [
     *      { id: 8, playTime: 500, auto: false },
     *      { id: 1, playTime: 100, auto: true },
     *      { id: 7, playTime: 4500, auto: false },
     *    ]
     *
     * i = 5 => inputList[5] = { id: 2, playTime: 2000, auto: true }
     *
     *  => check if newMergedList has duplicates
     *  => NO duplicates
     *  => push item to newMergedList
     *
     *    newMergedList = [
     *      { id: 8, playTime: 500, auto: false },
     *      { id: 1, playTime: 100, auto: true },
     *      { id: 7, playTime: 4500, auto: false },
     *      { id: 2, playTime: 2000, auto: true }
     *    ]
     *
     * i = 6 => inputList[6] = { id: 2, playTime: 2000, auto: true }
     *
     *  => check if newMergedList has duplicates
     *  => YES, duplicates exist
     *  => take duplicate out of newMergedList
     *  => merge both items together
     *  => push result back to newMergedList
     *
     *    newMergedList = [
     *      { id: 8, playTime: 500, auto: false },
     *      { id: 1, playTime: 100, auto: true },
     *      { id: 7, playTime: 4500, auto: false },
     *      { id: 2, playTime: 4000, auto: true }
     *    ]
     *
     * i = 7 => exit for loop => return newMergedList
     */
    if (request.merge && request.merge == true) {
      // 3. Merge items in inputList
      const newMergedList = [];
      for (let i = 0; i < inputList.length; i++) {
        let isNewItem = true;
        for (let j = 0; j < newMergedList.length; j++) {
          if (inputList[i].id == newMergedList[j].id) {
            isNewItem = false;
            // Merge two objects
            removedItem = newMergedList.splice(j,1)
            const newMergedItem = {id: removedItem[0].id, playTime: removedItem[0].playTime + inputList[i].playTime};
            if (removedItem[0].auto == true && inputList[i].auto == true) {
              newMergedItem.auto = true;
            }else{
              newMergedItem.auto = false;
            }
            newMergedList.push(newMergedItem)
            break
          }
        }
        if (isNewItem) {
          newMergedList.push(inputList[i])
        }
      }
      return newMergedList
    }
  } else {
    // Request options are not specified, return inputList as is
    return inputList;
  }
}
module.exports = select;