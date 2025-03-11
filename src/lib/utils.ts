import clsx, { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...className: ClassArray) => twMerge(clsx(className))

export const slugify = (text: string) => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}


export const formatNRC = (nrc: NRC) => {
    return Object.values(nrc).join('')
}

export const formatNumber = (number: string | number) => {
    return new Intl.NumberFormat().format(Number(number))
}

export const getRandomColor = (key: string | number) => {
    // Convert the number into a hash
    let hash = 0;
    const str = key.toString();
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to an RGB color
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ("00" + value.toString(16)).slice(-2);
    }

    return `bg-[${color}]`;
}