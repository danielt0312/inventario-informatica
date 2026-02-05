import * as React from "react"

function Logo({ ...props }: React.ComponentProps<"img">) {
    return (
        <>
            <img
                src="/ASE2025.png"
                alt="ASE Logo"
                {...props}
            />
        </>
    )
}

export default Logo;
