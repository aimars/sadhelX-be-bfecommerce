import {
    RockbrosBike,
    RockbrosWT08,
    RockbrosWT09,
    RockbrosMT500
  } from '../../assets';
  
  export const dummyPesanans = [
    {
      id: 1,
      tanggalPemesanan: 'Jumat, 18 Oktober 2021',
      status: 'keranjang',
      totalHarga: 597000,
      pesanans: [
        {
          id: 1,
          product: {
            id: 1,
            nama: 'Rockbros WT-09',
            gambar: [RockbrosWT09],
            toko: {
              id: 1,
              nama: 'UTY Store',
            },
            harga: 199000,
            stok: 125,
            warna: ["Red", "Blue", "White", "Black"],
            ready: true
          },
          jumlahPesan: 2,
          totalHarga: 398000,
          warna: "Red"
        },
        {
          id: 2,
          product: {
            id: 4,
            nama: 'Rockbros MT-500',
            gambar: [RockbrosMT500],
            toko: {
              id: 2,
              nama: 'Miisoo Oficiall Shop',
            },
            harga: 199000,
            stok: 84,
            warna: ["Red", "Blue", "White", "Black"],
            ready: true
          },
          jumlahPesan: 1,
          totalHarga: 199000,
          warna: "Red"
        }
      ]
    },
    {
      id: 2,
      tanggalPemesanan: 'Jumat, 1 September 2021',
      status: 'lunas',
      totalHarga: 398000,
      pesanans: [
        {
          id: 1,
          product: {
            id: 2,
            nama: 'Rockbros Bike',
            gambar: [RockbrosBike],
            toko: {
              id: 1,
              nama: 'UTY Store',
            },
            harga: 199000,
            stok: 23,
            warna: ["Red", "Blue", "White", "Black"],
            ready: true
          },
          jumlahPesan: 1,
          totalHarga: 199000,
          warna: "White"
        },
        {
          id: 2,
          product: {
            id: 3,
            nama: 'Rockbros WT-08',
            gambar: [RockbrosWT08],
            toko: {
              id: 1,
              nama: 'UTY Store',
            },
            harga: 199000,
            stok: 530,
            warna: ["Black"],
            ready: true
          },
          jumlahPesan: 1,
          totalHarga: 199000,
          warna: "Black"
        }
      ]
    }
  ];
  