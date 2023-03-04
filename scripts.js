const button = document.querySelector('button')
const select = document.querySelector('#currency-select')

let valueDolar = 0
let euro = 0
let bitcoin = 0

const api = async () => {
  apiUrl = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'

  const data = await fetch(apiUrl).then(response => response.json())

  valueDolar = data.USDBRL.high
  euro = data.EURBRL.high
  bitcoin = data.BTCBRL.high

  console.log(data)
}

api()

const realRS = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dollarUS = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const euroEUR = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

const bitcoinXBT = Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'XBT',
})

const converterValues = () => {
  const inputReal = document.querySelector('#input-real').value
  const valueReal = document.querySelector('#real-value')
  const currencyValue = document.querySelector('#currency-value')

  valueReal.innerHTML = realRS.format(inputReal)
  currencyValue.innerHTML = dollarUS.format(inputReal / valueDolar)

  select.value === '€ Euro'
    ? (currencyValue.innerHTML = euroEUR.format(inputReal / euro))
    : ''

  select.value === '₿ Bitcoin'
    ? (currencyValue.innerHTML = bitcoinXBT.format(inputReal / bitcoin))
    : ''

  inputReal = document.querySelector('#input-real').value = ''
}

const changeCurrency = () => {
  const currencyName = document.querySelector('#currency-name')
  const currencyImg = document.querySelector('#currency-img')
  if (select.value === '€ Euro') {
    currencyName.innerHTML = 'Euro'
  } else if (select.value === 'US$ Dólar americano') {
    currencyName.innerHTML = 'Dólar americano'
  } else if (select.value === '₿ Bitcoin') {
    currencyName.innerHTML = 'Bitcoin'
  }

  if (select.value === '€ Euro') {
    currencyImg.src = 'assets/euro.svg'
  } else if (select.value === 'Dólar americano') {
    currencyImg.src = './assets/estados-unidos (1) 1.svg'
  } else if (select.value === '₿ Bitcoin') {
    currencyImg.src = './assets/bitCoin.svg'
  }
  converterValues()
}

button.addEventListener('click', converterValues)
select.addEventListener('change', changeCurrency)
