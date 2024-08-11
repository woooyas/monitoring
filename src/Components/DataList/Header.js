import "./Header.css"

export default function Header({title, subtitle}) {
    return (
        <>
            <p className="sensor-list-title">{title}</p>
            <p className="sensor-list-subtitle">{subtitle}</p>
        </>
    );
};
