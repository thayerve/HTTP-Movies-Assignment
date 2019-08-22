import React from 'react';
import axios from 'axios';

export default function UpdateForm (props) {
    console.log('props to UpdateForm: ', props);
    
    return (
        <form>
        <input type='text' placeholder='input field'/>
        <button>Submit</button>
        </form>
    );
}