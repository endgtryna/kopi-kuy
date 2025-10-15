import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface ICart {
    name: string;
    size: number;
    price: number;
    qty: number;
}

const Cart = () => {
    const [cart, setCart] = useState<ICart[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const modal = useRef<HTMLDialogElement>(null);
    const [payment, setPayment] = useState<string>("");
    const [recipient, setRecipient] = useState({
        name: "",
        whatsapp: "",
        address: "",
    });

    const handleOrder = () => {
        const cartItems = cart
            .map(item => `${item.name} (${item.size} gram) x${item.qty}`)
            .join(", ");

        const message = `Halo, saya ingin memesan:\n\n- Item: ${cartItems}\n\n- Subtotal: Rp${subtotal.toLocaleString("id-ID")}\n- Ongkos kirim: Rp10.000\n- Pajak (10%): Rp${((10 / 100) * subtotal).toLocaleString("id-ID")}\n- Total bayar: Rp${total.toLocaleString("id-ID")}\n\nDetail Penerima:\n- Nama: ${recipient.name}\n- WhatsApp: ${recipient.whatsapp}\n- Alamat: ${recipient.address}\n\nMetode Pembayaran: ${payment}\n`;

        const whatsappUrl = `https://wa.me/6281385153193?text=${encodeURI(message)}`;
        window.open(whatsappUrl, "_blank");

        setTimeout(() => {
            localStorage.removeItem("cart");
        }, 10000);
    };

    const handleRemoveItem = (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index); // Hapus item berdasarkan index
        setCart(updatedCart);
        const updatedSubtotal = updatedCart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
        setSubtotal(updatedSubtotal);
        setTotal(updatedSubtotal + 10000 + ((10 / 100) * updatedSubtotal));
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Simpan pembaruan di localStorage
    };

    useEffect(() => {
        const getCart = setInterval(() => {
            const dataCart = localStorage.getItem("cart");
            const parsedCart: ICart[] = dataCart ? JSON.parse(dataCart) : [];

            const totalPrice = parsedCart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

            setCart(parsedCart);
            setSubtotal(totalPrice);
            setTotal(totalPrice + 10000 + ((10 / 100) * totalPrice));
        }, 500);

        return () => clearInterval(getCart);
    }, []);

    const isFormValid = recipient.name && recipient.whatsapp && recipient.address && payment;

    return (
        <div className="w-full min-h-screen flex gap-4 bg-white pt-24 p-8">
            <div className="w-[70%]">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-black font-bold">
                                <th></th>
                                <th>Produk</th>
                                <th>Varian</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((data, index) => (
                                <tr key={index} className="text-black">
                                    <th>{index + 1}</th>
                                    <td>{data.name}</td>
                                    <td>{data.size} gram</td>
                                    <td>Rp{data.price.toLocaleString("id-ID")}</td>
                                    <td>{data.qty}</td>
                                    <td className="flex justify-center items-center">
                                        <a
                                            className="btn bg-transparent border-none shadow-none hover:bg-transparent cursor-pointer"
                                            onClick={() => handleRemoveItem(index)} // Panggil fungsi hapus item
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="xl" className="text-red-500" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="text-black font-bold text-lg">
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center">
                                    Rp{subtotal.toLocaleString("id-ID")}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Rincian Pembelian */}
            <div className="w-[30%] flex flex-col justify-between bg-success p-8 rounded-xl">
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl text-black font-bold">Rincian Pembelian</h1>

                    <div className="flex flex-col">
                        {cart.map((data, index) => (
                            <div key={index} className="flex items-center gap-4 text-sm text-black">
                                <span>{data.name} ({data.size} gram)</span>
                                <span>X{data.qty}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col text-black font-bold italic">
                        <span>Ongkos kirim Rp10.000</span>
                        <span>Pajak(10%) Rp{((10 / 100) * subtotal).toLocaleString("id-ID")}</span>
                    </div>

                    <div className="w-full flex justify-between items-center text-black font-bold italic">
                        <span>Total</span>
                        <span>Rp{total.toLocaleString("id-ID")}</span>
                    </div>
                </div>

                <button
                    className="w-full btn btn-neutral text-white"
                    onClick={() => modal.current ? modal.current.showModal() : modal.current}
                    disabled={cart.length > 0 ? false : true}
                >
                    Checkout
                </button>
            </div>

            <dialog ref={modal} className="modal">
                <div className="modal-box text-white p-8">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </form>
                    <h3 className="text-2xl">Checkout</h3>

                    {/* Total bayar */}
                    <div className="w-full flex justify-between items-center mt-8">
                        <span className="text-md">Total Bayar</span>
                        <span className="text-lg font-bold">Rp{total.toLocaleString("id-ID")}</span>
                    </div>

                    {/* Detail penerima */}
                    <div className="flex flex-col gap-2 mt-4">
                        <h1 className="text-md">Detail Penerima</h1>

                        <div className="w-full flex justify-between items-center gap-2">
                            <div className="w-full">
                                <span className="text-sm font-bold">Nama <span className="text-red-500">*</span></span>
                                <label className="input input-sm input-bordered flex items-center gap-2">
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="e.g, Jhon"
                                        required
                                        value={recipient.name}
                                        onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                                    />
                                </label>
                            </div>

                            <div className="w-full">
                                <span className="text-sm font-bold">WhatsApp <span className="text-red-500">*</span></span>
                                <label className="input input-sm input-bordered flex items-center gap-2">
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="e.g, 08xx xxxx xxxx"
                                        required
                                        value={recipient.whatsapp}
                                        onChange={(e) => setRecipient({ ...recipient, whatsapp: e.target.value })}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-bold">Alamat Lengkap <span className="text-red-500">*</span></span>
                            <textarea
                                className="w-full textarea textarea-bordered resize-none"
                                placeholder="e.g, Jl. Elang VI, Sawah Lama, Ciputat, Tangerang Selatan, 15413"
                                required
                                value={recipient.address}
                                onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="flex flex-col gap-4 mt-4">
                        <h1 className="text-md">Metode Pembayaran</h1>

                        {/* Payment method buttons */}
                        <div className="w-full flex justify-between gap-4">
                            <div className={`${payment === "ovo" ? "border-2 border-amber-400" : ''} rounded-lg`} onClick={() => setPayment("ovo")}>
                                <img
                                    src="https://res.cloudinary.com/dbzdxsmvy/image/upload/v1726304415/Kopi-Kuy-Assets/ovo.png"
                                    width={"100%"}
                                    className="w-32 rounded-md"
                                />
                            </div>

                            <div className={`flex justify-center items-center px-2 bg-blue-500 rounded-md ${payment === "dana" ? "border-2 border-amber-400" : ''}`} onClick={() => setPayment("dana")}>
                                <img
                                    src="https://res.cloudinary.com/dbzdxsmvy/image/upload/v1726304298/Kopi-Kuy-Assets/dana.svg"
                                    width={"100%"}
                                    className="w-36"
                                />
                            </div>

                            <div className={`flex justify-center items-center px-2 bg-blue-400 rounded-md ${payment === "gopay" ? "border-2 border-amber-400" : ''}`} onClick={() => setPayment("gopay")}>
                                <img
                                    src="https://res.cloudinary.com/dbzdxsmvy/image/upload/v1726304134/Kopi-Kuy-Assets/gopay.png"
                                    width={"100%"}
                                    className="w-36 filter invert brightness-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pesan button */}
                    <button
                        className="w-full btn btn-success mt-8 text-white"
                        onClick={handleOrder}
                        disabled={!isFormValid}
                    >
                        Pesan
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export default Cart;
