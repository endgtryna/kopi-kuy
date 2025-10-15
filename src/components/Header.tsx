import { useEffect, useRef } from "react";
import Typed from "typed.js";

const Header = () => {
    const typedElement = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedElement.current, {
            strings: ["Kopi Kuy", "Gak Ngopi Gak Kuy!"],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
            backDelay: 2000,
            showCursor: false
        });

        return (() => {
            typed.destroy();
        });
    }, []);

    return (
        <div className='flex items-center justify-between p-8 pt-24'>
            <div className='w-[50%] flex flex-col gap-4'>
                <div className='flex items-center gap-[4px]'>
                    <h1 ref={typedElement} className='text-4xl text-black font-bold'></h1>
                    <span className="text-black text-4xl font-bold">|</span>
                    <img
                        src='/cup.svg'
                        width={"100%"}
                        className='w-12 border'
                    />
                </div>

                <p className='text-black text-xl'>
                    Menyajikan kopi berkualitas tinggi yang bisa dinikmati siapa saja, kapan saja. Dengan biji pilihan dan racikan yang presisi, kami menghadirkan pengalaman kopi yang jujur, hangat, dan penuh energi.
                </p>

                <div className='flex flex-col gap-4 mt-12'>
                    <span className='text-black text-lg'>Dapat dibeli melalui</span>
                    <div className='flex items-center gap-2'>
                        <img
                            src='/gojek.svg'
                            width={"100%"}
                            className='w-40 cursor-pointer animate__animated animate__pulse animate__slow animate__infinite'
                        />
                    </div>
                </div>
            </div>

            <div className='w-[50%] flex justify-end items-center'>
                <img
                    src='/hero.png'
                    width={"100%"}
                    className='w-[90%]'
                />
            </div>
        </div>
    );
};

export default Header;