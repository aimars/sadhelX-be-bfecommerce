export const heightMobileUI = 896;
export const widthMobileUI = 414;

//untuk ongkir
export const API_KEY = "9bb92b4ae616a7243d881e3582d2cb8e" 
export const API_RAJAONGKIR = "https://api.rajaongkir.com/starter/"
export const API_HEADER_RAJAONGKIR = {
    "key" : API_KEY
}
export const API_TIMEOUT = 120000
export const API_HEADER_RAJAONGKIR_COST = {
    key: API_KEY,
    'content-type': 'application/x-www-form-urlencoded'
}
export const ORIGIN_CITY = '24' //alamat pengirim

//MIDTRANS
export const URL_MIDTRANS = "https://app.sandbox.midtrans.com/snap/v1/"
export const URL_MIDTRANS_STATUS = "https://api.sandbox.midtrans.com/v2/"
export const HEADER_MIDTRANS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization :'Basic U0ItTWlkLXNlcnZlci03a3g5YmF3bGxiUzJ3bWZiM2FXUkJkakk=',
}