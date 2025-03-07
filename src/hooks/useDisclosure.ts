import React from 'react'

export function useDisclosure() {

    const [isOpen, setIsOpen] = React.useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen(prev => !prev)

    return [isOpen, { open, close, toggle }] as const
}
