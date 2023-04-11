import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"

const Landing = () =>{
    return (
            <div className={styles.entrance}>
                <h2 className={styles.buttonlanding}>Foods</h2>
                <Link to='/Home'>
                    <button className={styles.button1}>Home Page</button>
                </Link>
            </div>
            )
}

export default Landing