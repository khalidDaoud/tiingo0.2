function parseObject(obj) {
  const keys = Object.keys(obj);

  if (keys.includes("service")) {
   // console.log('Parse SERVICE', obj)
    return obj.data; // IEX data present Return 'data' if object has 'service' key
  } else if (keys.includes("response")) {
    //console.log('Parse RESPONSE', obj)
    return null; // Heartbeat message
  }

  return null; // Return null if 'data' is not found or if object starts with neither 'service' nor 'response'
}

module.exports = parseObject;
