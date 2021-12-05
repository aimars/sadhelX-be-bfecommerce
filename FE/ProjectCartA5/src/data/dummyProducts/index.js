//Hanya contoh data untuk product

import {
    RockbrosBike,
    RockbrosWT08,
    RockbrosWT09,
    RockbrosMT500
} from '../../assets'

export const dummyProducts = [
    {
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
    {
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
    {
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
    {
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
    }
]