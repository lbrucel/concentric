function getData() {
  const dataArray = []
  for (let h = -12; h <= 12; h++) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s++) {
        for (let x = -3; x <= 3; x++) {
          let y = h * Math.pow(x, 2)
          y += m * x
          y += s
          console.log(`${x},${h},${m},${s},${x},${y},[${x},${y}]`)
          dataArray.push([x, y])
        }
      }
    }
  }
  // console.log(dataArray)
  return dataArray
}

getData()

var fn = function(x, h, m, s) {
  let y = h * Math.pow(x, 2)
  y += m * x
  y += s
  return y
}
//console.log(fn(-3, 12, 59, 59))
