import React from "react";
import "./Main.scss";

export default function Main (props: React.PropsWithChildren) {
    return <main className="Main">
        { props.children }
    </main>
}