
export const currencyFormat = (num) => {
  if (num) {
    return (
      'R$' +
      parseFloat(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  }
}

export const capitalizeFirst = (str) => {
  var subst = str.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  return subst;
}

export const formatMoney = (value) => {
  value = value?.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result =
    new Intl.NumberFormat("pt-BR", options).format(parseFloat(value) / 100) ||
    0;
  if (result === 0 || result === "NaN") return "R$ 0,00";

  if (result) {
    return "R$ " + result;
  } else {
    return "R$ 0,00";
  }
};


export const unmaskMoney = (string, zero) => {

  let unmask = string?.replace(/[^\d]/g, "");

  if (unmask === '' && !zero) return null
  if (unmask === undefined && zero) return 0

  //unmask = unmask?.replace(/([0-9]{2})$/g, ".$1");
 //unmask = unmask?.replace(/(^0+(?=\d))|(,?0+$)/g, '');

  return parseFloat(unmask)
}