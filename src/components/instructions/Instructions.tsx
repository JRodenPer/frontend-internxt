import React from 'react';
import './Instructions.styles.css';
import logo from '../../assets/logo.svg';
export const Instructions = () => {
    return <div className="instructions-wrapper">
        <img src={logo} alt="Internxt logo" className='logo' />
        <h2>Technical test instructions</h2>
        <p>You can find the test instructions in the README located at the root of the project</p>
        <h3 className='signature'>Good luck - Internxt Team</h3>
    </div>
}