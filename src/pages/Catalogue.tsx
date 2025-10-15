import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import products from '../json/product.json';
import { faCartPlus, faMinus, faPlus, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Catalogue = () => {
    // State qty sekarang disimpan dalam array untuk setiap produk
    const [quantities, setQuantities] = useState<number[]>(products.map(() => 1));

    const [selectedOptions, setSelectedOptions] = useState(
        products.map(product => ({
            size: product.options[0].size,
            price: product.options[0].price,
        }))
    );

    const handleSizeChange = (index: number, selectedSize: number, options: { size: number; price: number; }[]) => {
        const selectedOption = options.find(option => option.size === selectedSize);
        if (selectedOption) {
            const updatedOptions = [...selectedOptions];
            updatedOptions[index] = {
                size: selectedOption.size,
                price: selectedOption.price,
            };
            setSelectedOptions(updatedOptions);
        }
    };

    const handleQtyChange = (index: number, increment: boolean) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = increment
            ? updatedQuantities[index] + 1
            : Math.max(1, updatedQuantities[index] - 1);
        setQuantities(updatedQuantities);
    };

    const handleCart = (index: number) => {
        const productToAdd = {
            name: products[index].name,
            size: selectedOptions[index].size,
            price: selectedOptions[index].price,
            qty: quantities[index], // Tambahkan qty ke dalam objek yang akan disimpan di keranjang
        };

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        const updatedCart = [...existingCart, productToAdd];

        localStorage.setItem('cart', JSON.stringify(updatedCart));

        toast.success("Berhasil menambahkan ke keranjang!", {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            closeButton: false,
            style: {
                backgroundColor: '#263E52',
                color: '#ffffff',
            },
            progressStyle: {
                backgroundColor: '#22c55e',
            },
        });
    };

    return (
        <div className='w-full min-h-screen flex flex-col gap-8 pt-24 p-8'>
            <div className="w-full container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
                    {products.map((data, index) => (
                        <div key={index} className="rounded-xl shadow-xl bg-white">
                            <img
                                src="https://res.cloudinary.com/dbzdxsmvy/image/upload/v1726147247/Kopi-Kuy-Assets/biji-kopi.jpg"
                                alt={data.name}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />

                            <div className="flex flex-col justify-center items-center gap-4 p-4 text-black">
                                <h1 className="text-xl font-bold text-center">{data.name}</h1>

                                <div className="w-full flex justify-between items-center">
                                    <div>
                                        <FontAwesomeIcon icon={faWeightHanging} />
                                        <div className="dropdown">
                                            <div tabIndex={0} role="button" className="btn btn-sm border-none hover:bg-transparent bg-transparent shadow-none text-black">
                                                {selectedOptions[index].size} gram
                                            </div>
                                            <ul tabIndex={0} className="w-32 dropdown-content menu bg-success rounded-box z-[1] p-2 shadow">
                                                {data.options.map((value, i) => (
                                                    <li key={i} className="text-white font-bold">
                                                        <a onClick={() => handleSizeChange(index, value.size, data.options)}>{value.size} gram</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <span>Rp{selectedOptions[index].price.toLocaleString("id-ID")}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Catalogue;
