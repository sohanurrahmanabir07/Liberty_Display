import React from 'react'

export const DateTime = ({ item }) => {

    return (
        new Date().toLocaleDateString('en-GB') !== new Date(item || item).toLocaleDateString('en-GB')
            ? `${new Date(item || item).toLocaleDateString('en-GB')} ${new Date(item || item).toLocaleTimeString('en-US')}`
            : new Date(item || item).toLocaleTimeString('en-US')
    )
}
