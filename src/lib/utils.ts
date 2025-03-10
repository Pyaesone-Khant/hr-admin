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