"use client"

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

useState

const ElementCard = ({ element, handleAddClick, handleEdit, handleDelete }) => {
    return (
        <div className="element_card">
            <div className="flex justify-between items-start gap-5">
                <div className='flex-1 flex justify-start items-center gap-3'>
                    <Image
                        src={element.media_url}
                        alt={element.headline_en}
                        width={40}
                        height={40}
                        className="rounded-[5px] object-contain"
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {element.headline_en}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {element.start_year} 
                        </p>
                    </div>
                </div>
            </div>

            <p className='line-clamp-3 my-4 font-satoshi text-sm text-gray-700'>{element.text_en}</p>

            <div className='mt-5 flex-center gap-4 border-t border-gray-300 pt-3'>
                <p
                    className='font-inter text-sm outline_btn cursor-pointer'
                    onClick={handleEdit}
                >
                    Edit
                </p>
                <p
                    className='font-inter text-sm text-red-500 cursor-pointer'
                    onClick={handleDelete}
                >
                    Delete
                </p>
            </div>
        </div>
    )
}

export default ElementCard;