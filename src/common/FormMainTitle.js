import React from "react";
import { Link } from "react-router-dom";


const FormMainTitle = ({
    title = "Title",
    btnName = "",
    btnSecond = "",
    btnIcon,
    onClick,
    btnSecondlink,
    btnLink,
    btnSecondIcon
}) => {
    const button = () => {
        return (
            <>
                <Link to={btnLink} className="btn btn-outline btn-info fa-pull-right addButton" onClick={onClick}>
                    <i className={btnIcon}></i> {btnName}
                </Link>
            </>)
    }

    const buttonSecond = () => {
        return (
            <Link to={btnSecondlink} className="btn btn-rounded-min btn-primary fa-pull-right m-r-10" onClick={onClick}>
                <i className={btnSecondIcon}></i> {btnSecond}
            </Link>
        )
    }

    return (
        <div className="main-heading" >
            <h4 className="font-bold"> {title}
                {!btnName ? "" : button()}
                {!btnSecond ? "" : buttonSecond()}
            </h4>
        </div>
    )
}

export default FormMainTitle;

