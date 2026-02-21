import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode
}

const ServerError: FC<Props> = ({ children }) => {
    return (
        <>
        <p className="server-error">
            { children }
        </p>
        </>
    )
}

export default ServerError