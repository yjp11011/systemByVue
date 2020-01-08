const filter = {
  'formatMoney':function (val) {
    if (val||val===0) {
      return parseFloat(val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
  },
}
export default filter
