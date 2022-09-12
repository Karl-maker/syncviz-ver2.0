function ArrayRandomize(list) {
 const min = 0,
  max = list.length;
 const selection = list[Math.floor(Math.random() * (max - min)) + min];

 return selection;
}

module.exports = { ArrayRandomize };
