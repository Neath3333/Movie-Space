'use client';

import{ SessionProvider } from "next-auth/react";
import React from "react";
import PropTypes from "prop-types";

export default function Providers({ children }) {
    return(
        <SessionProvider >
            {children}
        </SessionProvider>
    )
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
}
